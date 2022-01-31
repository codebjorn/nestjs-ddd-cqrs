import { UserFactory } from './factory/user.factory';
import { UserRepository } from './repository/user.repository';
import { UserSchema } from './schema/user.schema';

export const DomainLayer = {
  factories: [UserFactory],
  repositories: [UserRepository],
  schemas: [UserSchema],
};
