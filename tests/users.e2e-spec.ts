import { App } from '../src/app.js';
import { boot } from '../src/main.js';
import request from 'supertest';

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

describe('Users e2e', () => {
  it('Register - error', async () => {
    const res = await request(application.app)
      .post('/users/register')
      .send({ email: 'danila718@gmail.com', password: 'qwerty' });
    expect(res.statusCode).toBe(422);
  });

  it('Login - success', async () => {
    const res = await request(application.app)
      .post('/users/login')
      .send({ email: 'danila718@gmail.com', password: 'qwerty' });
    expect(res.body.token).not.toBeUndefined();
  });

  it('Login - error', async () => {
    const res = await request(application.app)
      .post('/users/login')
      .send({ email: 'danila718@gmail.com', password: '1' });
    expect(res.statusCode).toBe(401);
  });

  it('Info - success', async () => {
    const login = await request(application.app)
      .post('/users/login')
      .send({ email: 'danila718@gmail.com', password: 'qwerty' });
    const res = await request(application.app)
      .get('/users/info')
      .set('Authorization', `Bearer ${login.body.token}`);
    expect(res.body.email).toBe('danila718@gmail.com');
  });

  it('Info - error', async () => {
    const res = await request(application.app).get('/users/info').set('Authorization', `Bearer 1`);
    expect(res.statusCode).toBe(401);
  });
});

afterAll(() => {
  application.close();
});
