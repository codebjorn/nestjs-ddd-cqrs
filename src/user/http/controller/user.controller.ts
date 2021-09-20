import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserRequest } from '../request/createUser.request';
import { User } from 'src/user/database/entity/user.entity';
import { CreateUserCommand } from 'src/user/command/create/createUser.command';
import { UserResponse } from '../response/user.response';
import { UpdateUserRequest } from '../request/updateUser.request';
import { UpdateUserCommand } from 'src/user/command/update/update.command';
import { GetUserQuery } from 'src/user/query/get/get.query';
import { GetAllUsers } from 'src/user/query/getAll/getAll.query';
import { DeleteUserCommand } from 'src/user/command/delete/delete.command';

@Controller({ path: 'users' })
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  public async index(): Promise<object> {
    const users = await this.queryBus.execute<GetAllUsers, User[]>(
      new GetAllUsers(),
    );

    return UserResponse.render(users);
  }

  @Get(':id')
  public async show(@Param('id') id: string): Promise<object> {
    const user = await this.queryBus.execute<GetUserQuery, User>(
      new GetUserQuery(id),
    );
    return UserResponse.render(user);
  }

  @Post()
  public async store(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<object> {
    const user = await this.commandBus.execute<CreateUserCommand, User>(
      new CreateUserCommand(createUserRequest),
    );

    return UserResponse.render(user);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserRequest: UpdateUserRequest,
  ): Promise<object> {
    const user = await this.commandBus.execute<CreateUserCommand, User>(
      new UpdateUserCommand(id, updateUserRequest),
    );

    return UserResponse.render(user);
  }

  @Delete(':id')
  public destroy(@Param('id') id: string) {
    this.commandBus.execute<DeleteUserCommand, void>(new DeleteUserCommand(id));
  }
}
