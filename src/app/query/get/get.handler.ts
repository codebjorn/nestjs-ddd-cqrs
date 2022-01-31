import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/domain/aggregateRoot/user.aggregateRoot';

import { GetUserQuery } from './get.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private userService: UserService) {}

  execute({ id }: GetUserQuery): Promise<User> {
    return this.userService.get(id);
  }
}
