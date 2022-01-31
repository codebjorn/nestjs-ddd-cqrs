import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from 'src/app/service/user.service';

import { DeleteUserCommand } from './delete.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userService: UserService) {}

  public async execute({ id }: DeleteUserCommand): Promise<void> {
    await this.userService.delete(id);
  }
}
