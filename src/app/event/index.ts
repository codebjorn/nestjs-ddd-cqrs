import { CreatedUserHandler } from './created/createdUser.handler';
import { UpdatedUserHandler } from './updated/updatedUser.handler';

export const EventsHandlers = [CreatedUserHandler, UpdatedUserHandler];
