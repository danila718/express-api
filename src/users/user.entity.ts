import bcrypt from 'bcryptjs';

export class User {
  private _password: string;

  constructor(
    private readonly _email: string,
    private readonly _name: string,
    password_hash?: string,
  ) {
    if (password_hash) {
      this._password = password_hash;
    }
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    if (!this._password) {
      return '';
    }
    return this._password;
  }

  public async setPassword(pass: string, sold: number): Promise<void> {
    this._password = await bcrypt.hash(pass, sold);
  }

  public async validatePassword(pass: string): Promise<boolean> {
    return bcrypt.compare(pass, this.password);
  }
}
