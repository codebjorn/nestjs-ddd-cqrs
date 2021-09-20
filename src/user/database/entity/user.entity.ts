import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private email: string,
    private username: string,
    private name: string,
    private password: string,
    private role: any,
  ) {
    super();
  }

  public getId(): string {
    return this._id;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email?: string): this {
    this.email = email ?? this.email;

    return this;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username?: string): this {
    this.username = username ?? this.username;

    return this;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name?: string): this {
    this.name = name ?? this.name;

    return this;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password?: string): this {
    this.password = password ?? this.password;

    return this;
  }

  public getRole(): any {
    return this.role;
  }

  public setRole(role?: any): this {
    this.role = role ?? this.role;

    return this;
  }
}
