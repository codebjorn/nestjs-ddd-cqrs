import { CommandsHandlers } from './command';
import { EventsHandlers } from './event';
import { QueryHandlers } from './query';
import { UserService } from './service/user.service';

export const AppLayer = {
  services: [UserService],
  commandsHandlers: CommandsHandlers,
  eventsHandlers: EventsHandlers,
  queryHandlers: QueryHandlers,
};
