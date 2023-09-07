import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Url from '../../db/entities/url.entity';

@Injectable()
export class ShortUrlDALService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  public async createUrl(fullUrl: string, shortUrl: string): Promise<string> {
    const newUrl = await this.urlRepository.save({ fullUrl, shortUrl });
    return newUrl.shortUrl;
  }

  public async getShortUrlByFullUrl(fullUrl: string): Promise<Url> {
    return this.urlRepository.findOneBy({ fullUrl });
  }

  public async getFullUrlByShortUrl(shortUrl: string): Promise<Url> {
    return this.urlRepository.findOneBy({ shortUrl });
  }
}
