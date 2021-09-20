import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from './update.command';
import { User } from 'src/user/database/entity/user.entity';
import { UserService } from 'src/user/service/user.service';

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
