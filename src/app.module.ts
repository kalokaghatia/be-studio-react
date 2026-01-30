import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { envSchema } from './config/env.validation';
import { MongoModule } from './database/mongo.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
      validationSchema: envSchema,
      validationOptions: { allowUnknown: true, abortEarly: false },
    }),
    MongoModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
