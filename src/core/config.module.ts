import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import config from 'config';

@Module({
  imports: [BaseConfigModule.forRoot({ load: config })],
})
export class ConfigModule {}
