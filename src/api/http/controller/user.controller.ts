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
import { CreateUserCommand } from 'src/app/command/create/createUser.command';
import { DeleteUserCommand } from 'src/app/command/delete/delete.command';
import { UpdateUserCommand } from 'src/app/command/update/update.command';
import { GetUserQuery } from 'src/app/query/get/get.query';
import { GetAllUsers } from 'src/app/query/getAll/getAll.query';
import { User } from 'src/domain/aggregateRoot/user.aggregateRoot';
import { UpdateUserRequest } from '../request/updateUser.request';
import { UserResponse } from '../response/user.response';

@Controller({ path: 'users' })
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  public async index(): Promise<Record<string, unknown>> {
    const users = await this.queryBus.execute<GetAllUsers, User[]>(
      new GetAllUsers(),
    );

    return UserResponse.render(users);
  }

  @Get(':id')
  public async show(@Param('id') id: string): Promise<Record<string, unknown>> {
    const user = await this.queryBus.execute<GetUserQuery, User>(
      new GetUserQuery(id),
    );
    return UserResponse.render(user);
  }

  @Post()
  public async store(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<Record<string, unknown>> {
    const user = await this.commandBus.execute<CreateUserCommand, User>(
      new CreateUserCommand(createUserRequest),
    );

    return UserResponse.render(user);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserRequest: UpdateUserRequest,
  ): Promise<Record<string, unknown>> {
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
