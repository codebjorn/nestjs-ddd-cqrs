import { ConfigModule } from './core/config.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from './core/mongoose.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule, MongooseModule, UserModule],
})
export class AppModule {}
