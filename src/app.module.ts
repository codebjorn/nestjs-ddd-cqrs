import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import config from 'config';
import { ApiLayer } from './api';
import { AppLayer } from './app';
import { DomainLayer } from './domain';
import { UserSchema } from './domain/schema/user.schema';
import { InfraLayer } from './infra';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({ load: config }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('dbUri'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
  ],
  controllers: [...ApiLayer.controllers],
  providers: [
    ...AppLayer.services,
    ...AppLayer.commandsHandlers,
    ...AppLayer.eventsHandlers,
    ...AppLayer.queryHandlers,
    ...DomainLayer.factories,
    ...DomainLayer.repositories,
  ],
})
export class AppModule {}
