import { BadRequestException, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

import { CreatedUserEvent } from '../event/created/createdUser.event';
import { ObjectId } from 'mongodb';
import { UpdatedUserEvent } from '../event/updated/updatedUser.event';
import { User } from '../database/entity/user.entity';
import { UserData } from '../interface/userData.interface';
import { UserRepository } from '../database/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async get(id: string): Promise<User> {
    return await this.userRepository.findOne({ _id: id });
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async create(userData: UserData): Promise<User> {
    if (await this.userRepository.exists({ email: userData.email })) {
      throw new BadRequestException('User already exists.');
    }

    let user = await this.make(userData);
    user = await this.userRepository.save(user);
    user.apply(new CreatedUserEvent(user.getId(), user.getName()));
    return user;
  }

  public async update(
    id: string,
    { email, username, name, password, role }: UserData,
  ): Promise<User> {
    let user = await this.userRepository.findOne({ _id: id });
    user
      .setEmail(email)
      .setUsername(username)
      .setName(name)
      .setPassword(password)
      .setRole(role);

    user = await this.userRepository.save(user, false);
    user.apply(new UpdatedUserEvent(user.getId(), user.getName()));

    return user;
  }

  public async delete(id: string) {
    await this.userRepository.deleteOne({ _id: id });
  }

  private async make({
    email,
    username,
    name,
    password,
    role,
  }: UserData): Promise<User> {
    const pass = await this.createPassword(password);
    return new User(
      new ObjectId().toHexString(),
      email,
      username,
      name,
      pass,
      role,
    );
  }

  private async createPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }
}
