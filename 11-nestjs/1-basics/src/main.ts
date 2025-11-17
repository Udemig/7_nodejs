import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import logger from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Tüm modul ve controller'lara etki eder
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Tüm route'lara logger middleware'i uygulanır
  app.use(logger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
