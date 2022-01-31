import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/domain/aggregateRoot/user.aggregateRoot';

import { UpdateUserCommand } from './update.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async execute({ id, userData }: UpdateUserCommand): Promise<User> {
    const user = this.eventPublisher.mergeObjectContext(
      await this.userService.update(id, userData),
    );
    user.commit();
    return user;
  }
}
