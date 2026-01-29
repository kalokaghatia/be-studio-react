import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { envSchema } from './config/env.validation';
import { MongoModule } from './database/mongo.module';

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

  ],
})
export class AppModule { }