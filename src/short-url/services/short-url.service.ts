import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ShortUrlDALService } from './short-url-DAL.service';
import { RedisService } from '../../redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { CreateUrlDto } from '../dto/createUrl.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';

@Injectable()
export class ShortUrlService {
  private logger = new Logger(ShortUrlService.name);

  constructor(
    private shortUrlDALService: ShortUrlDALService,
    private redisService: RedisService,
    private configService: ConfigService,
  ) {}

  public async createUrl(url: CreateUrlDto): Promise<string> {
    const { fullUrl } = url;
    const baseUrl = this.configService.get('BASE_URL');
    const urlCode = nanoid(10);

    if (!isURL(fullUrl)) {
      throw new BadRequestException('String Must be a Valid URL');
    }

    try {
      const getUrlFromCacheResult = await this.redisService.get(fullUrl);
      if (getUrlFromCacheResult) return getUrlFromCacheResult;

      const newShortUrl = `${baseUrl}/${urlCode}`;
      await this.redisService.set(fullUrl, newShortUrl);
      await this.redisService.set(newShortUrl, fullUrl);

      const getUrlFromDbResult =
        await this.shortUrlDALService.getShortUrlByFullUrl(fullUrl);
      if (getUrlFromDbResult) return getUrlFromDbResult.shortUrl;

      return this.shortUrlDALService.createUrl(fullUrl, newShortUrl);
    } catch (error) {
      this.logger.error('Server Error');
      throw new UnprocessableEntityException('Server Error');
    }
  }

  public async getFullUrlByShortUrl(shortUrl: string): Promise<string> {
    const getUrlFromCacheResult = await this.redisService.get(shortUrl);
    if (getUrlFromCacheResult) return getUrlFromCacheResult;

    const getUrlFromDbResult =
      await this.shortUrlDALService.getFullUrlByShortUrl(shortUrl);
    if (getUrlFromDbResult) return getUrlFromDbResult.fullUrl;
    else {
      this.logger.error('Such url was not found');
      throw new NotFoundException('Such url was not found');
    }
  }
}
