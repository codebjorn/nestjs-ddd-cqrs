import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserQuery } from './get.query';
import { User } from 'src/user/database/entity/user.entity';
import { UserService } from 'src/user/service/user.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private userService: UserService) {}

  execute({ id }: GetUserQuery): Promise<User> {
    return this.userService.get(id);
  }
}
