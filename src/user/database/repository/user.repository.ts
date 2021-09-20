import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryAbstract } from 'src/abstract/repository.abstract';
import { User } from '../entity/user.entity';
import { UserSchemaFactory } from '../factory/userSchema.factory';
import { UserSchema } from '../schema/user.schema';

export class UserRepository extends RepositoryAbstract<UserSchema, User> {
  constructor(
    @InjectModel(UserSchema.name)
    userModel: Model<UserSchema>,
    userSchemaFactory: UserSchemaFactory,
  ) {
    super(userModel, userSchemaFactory);
  }
}
