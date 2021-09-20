import { EntitySchemaFactory } from 'src/interface/entitySchemaFactory.interface';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { User } from '../entity/user.entity';
import { UserSchema } from '../schema/user.schema';

@Injectable()
export class UserSchemaFactory
  implements EntitySchemaFactory<UserSchema, User>
{
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
