import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/domain/aggregateRoot/user.aggregateRoot';

import { GetAllUsers } from './getAll.query';

@QueryHandler(GetAllUsers)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsers> {
  constructor(private userService: UserService) {}

  execute(): Promise<User[]> {
    return this.userService.getAll();
  }
}
