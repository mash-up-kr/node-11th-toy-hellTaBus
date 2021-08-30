import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(3000);
  console.log('server listening on 3000');
}
bootstrap();
