import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface.js';
import { TYPES } from '../types.js';
import { User } from './user.entity.js';
import { IUsersRepository } from './users.repository.interface.js';
import { IUserService } from './users.service.interface.js';
import { UserService } from './users.service.js';

const configServiceMock: IConfigService = {
  get: jest.fn(),
};

const usersRepositoryMock: IUsersRepository = {
  create: jest.fn(),
  find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
  container.bind<IUserService>(TYPES.IUserService).to(UserService);
  container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(configServiceMock);
  container.bind<IUsersRepository>(TYPES.IUsersRepository).toConstantValue(usersRepositoryMock);

  configService = container.get<IConfigService>(TYPES.IConfigService);
  usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository);
  usersService = container.get<IUserService>(TYPES.IUserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
  it('createUser', async () => {
    configService.get = jest.fn().mockReturnValueOnce('1');
    usersRepository.create = jest.fn().mockImplementationOnce(
      (user: User): UserModel => ({
        name: user.name,
        email: user.email,
        password: user.password,
        id: 1,
      }),
    );
    createdUser = await usersService.createUser({
      email: 'a@a.ru',
      name: 'Петя',
      password: '1',
    });
    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.password).not.toEqual('1');
  });

  it('validateUser - success', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

    const res = await usersService.validateUser({
      email: 'a@a.ru',
      password: '1',
    });
    expect(res).toBeTruthy();
  });

  it('validateUser - wrong password', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

    const res = await usersService.validateUser({
      email: 'a@a.ru',
      password: '123',
    });
    expect(res).toBeFalsy();
  });

  it('validateUser - wrong user', async () => {
    usersRepository.find = jest.fn().mockReturnValueOnce(null);

    const res = await usersService.validateUser({
      email: 'a@a.ru',
      password: '1',
    });
    expect(res).toBeFalsy();
  });
});

// afterAll(() => {});
