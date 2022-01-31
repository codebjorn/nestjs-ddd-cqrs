import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/domain/aggregateRoot/user.aggregateRoot';

import { CreateUserCommand } from './createUser.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async execute({ userData }: CreateUserCommand): Promise<User> {
    const user = this.eventPublisher.mergeObjectContext(
      await this.userService.create(userData),
    );
    user.commit();
    return user;
  }
}
