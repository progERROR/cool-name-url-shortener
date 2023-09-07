import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { RedisModule } from './redis/redis.module';
import { ShortUrlModule } from './short-url/short-url.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        BASE_URL: Joi.string().required(),
      }),
    }),
    DbModule,
    RedisModule,
    ShortUrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
