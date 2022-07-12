import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface.js';
import { TYPES } from '../types.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { User } from './user.entity.js';
import { IUserService } from './users.service.interface.js';

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}

  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    const salt = this.configService.get('SALT');
    console.log(salt);
    await newUser.setPassword(password, Number(salt));
    // проверка что он есть?
    // если есть - возвращаем null
    // если нет - создаем и возвращаем пользователя
    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
