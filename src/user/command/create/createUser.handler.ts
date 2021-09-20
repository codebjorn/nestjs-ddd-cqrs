import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from './createUser.command';
import { User } from 'src/user/database/entity/user.entity';
import { UserService } from 'src/user/service/user.service';

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
