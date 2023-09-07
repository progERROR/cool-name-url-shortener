import { Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Url from '../db/entities/url.entity';
import { ConfigModule } from '@nestjs/config';
import { ShortUrlService } from './services/short-url.service';
import { ShortUrlDALService } from './services/short-url-DAL.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), ConfigModule, RedisModule],
  controllers: [ShortUrlController],
  providers: [ShortUrlService, ShortUrlDALService],
})
export class ShortUrlModule {}
