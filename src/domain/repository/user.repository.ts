import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryAbstract } from 'src/infra/abstract/repository.abstract';
import { UserFactory } from '../factory/user.factory';
import { User } from '../aggregateRoot/user.aggregateRoot';
import { UserSchema } from '../schema/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends RepositoryAbstract<UserSchema, User> {
  constructor(
    @InjectModel(UserSchema.name)
    userModel: Model<UserSchema>,
    userFactory: UserFactory,
  ) {
    super(userModel, userFactory);
  }
}
