import { injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { User } from './user.entity.js';
import { IUserService } from './users.service.interface.js';

@injectable()
export class UserService implements IUserService {
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    // проверка что он есть?
    // если есть - возвращаем null
    // если нет - создаем и возвращаем пользователя
    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
