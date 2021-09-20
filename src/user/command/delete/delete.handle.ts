import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteUserCommand } from './delete.command';
import { UserService } from 'src/user/service/user.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userService: UserService) {}

  public async execute({ id }: DeleteUserCommand): Promise<void> {
    await this.userService.delete(id);
  }
}
