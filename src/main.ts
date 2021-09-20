import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ExceptionFilter } from './exception/exception.filter';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionFilter());
  
  const port = app.get(ConfigService).get('port');
  await app.listen(port);
}
bootstrap();
