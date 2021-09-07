import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {setupSwagger} from './swagger';
import * as passport from 'passport';
import {ValidationPipe} from '@nestjs/common';
import {HttpExceptionFilter} from './httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app);

  app.use(passport.initialize());

  await app.listen(3000);
  console.log('server listening on 3000');
}

bootstrap();
