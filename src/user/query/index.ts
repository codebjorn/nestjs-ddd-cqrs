import { GetAllUsersHandler } from './getAll/getAll.handler';
import { GetUserHandler } from './get/get.handler';

export const UserQueryHandlers = [GetUserHandler, GetAllUsersHandler];
