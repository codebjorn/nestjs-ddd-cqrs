import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule as BaseMongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BaseMongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('dbUri'),
      }),
    }),
  ],
})
export class MongooseModule {}
