import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface.js';
import { TYPES } from '../types.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { User } from './user.entity.js';
import { IUsersRepository } from './users.repository.interface.js';
import { IUserService } from './users.service.interface.js';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IConfigService) private configService: IConfigService,
    @inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
  ) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
    const existingUser = await this.usersRepository.find(email);
    if (existingUser) {
      return null;
    }
    const newUser = new User(email, name);
    await newUser.setPassword(password, Number(this.configService.get('SALT')));
    return this.usersRepository.create(newUser);
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    const userModel = await this.usersRepository.find(email);
    if (!userModel) {
      return false;
    }
    const user = new User(userModel.email, userModel.name, userModel.password);
    return user.validatePassword(password);
  }
}
