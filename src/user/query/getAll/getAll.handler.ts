import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllUsers } from './getAll.query';
import { User } from 'src/user/database/entity/user.entity';
import { UserService } from 'src/user/service/user.service';

@QueryHandler(GetAllUsers)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsers> {
  constructor(private userService: UserService) {}

  execute(): Promise<User[]> {
    return this.userService.getAll();
  }
}
