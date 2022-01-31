import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UpdatedUserEvent } from './updatedUser.event';

@EventsHandler(UpdatedUserEvent)
export class UpdatedUserHandler implements IEventHandler<UpdatedUserEvent> {
  async handle({ userId, name }: UpdatedUserEvent): Promise<void> {
    console.log('User Updated:', userId, name);
  }
}
