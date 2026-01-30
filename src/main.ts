import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { MongoTransformInterceptor } from './common/interceptors/mongo-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  app.useGlobalInterceptors(new ResponseInterceptor(), new MongoTransformInterceptor());

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('server.port');
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server listening on port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Errore nel bootstrap:', err);
});
