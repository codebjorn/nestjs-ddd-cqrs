import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { UserCommandsHandlers } from './command';
import { UserController } from './http/controller/user.controller';
import { UserEventsHandlers } from './event';
import { UserQueryHandlers } from './query';
import { UserRepository } from './database/repository/user.repository';
import { UserSchema } from './database/schema/user.schema';
import { UserSchemaFactory } from './database/factory/userSchema.factory';
import { UserService } from './service/user.service';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserSchemaFactory,
    UserRepository,
    UserService,
    ...UserCommandsHandlers,
    ...UserEventsHandlers,
    ...UserQueryHandlers,
  ],
})
export class UserModule {}
