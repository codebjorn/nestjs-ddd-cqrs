import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntityFactory } from 'src/infra/interface/entityFactory.interface';
import { User } from '../aggregateRoot/user.aggregateRoot';
import { UserSchema } from '../schema/user.schema';

@Injectable()
export class UserFactory implements EntityFactory<UserSchema, User> {
  create(user: User): UserSchema {
    return {
      _id: new ObjectId(user.getId()),
      email: user.getEmail(),
      username: user.getUsername(),
      name: user.getName(),
      password: user.getPassword(),
      role: user.getRole(),
    };
  }

  createFromSchema(userSchema: UserSchema): User {
    return new User(
      userSchema._id.toHexString(),
      userSchema.email,
      userSchema.username,
      userSchema.name,
      userSchema.password,
      userSchema.role,
    );
  }
}
