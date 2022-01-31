import { CreateUserHandler } from './create/createUser.handler';
import { DeleteUserHandler } from './delete/delete.handle';
import { UpdateUserHandler } from './update/update.handle';

export const CommandsHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];
