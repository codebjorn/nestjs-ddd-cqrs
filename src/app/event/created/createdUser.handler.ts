import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CreatedUserEvent } from './createdUser.event';

@EventsHandler(CreatedUserEvent)
export class CreatedUserHandler implements IEventHandler<CreatedUserEvent> {
  async handle({ userId, name }: CreatedUserEvent): Promise<void> {
    console.log('User Created:', userId, name);
  }
}
