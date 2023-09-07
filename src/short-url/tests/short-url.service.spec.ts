import { ShortUrlService } from '../services/short-url.service';
import { ShortUrlDALService } from '../services/short-url-DAL.service';
import { RedisService } from '../../redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import Url from '../../db/entities/url.entity';

describe('ShortUrlService', () => {
  let shortUrlService: ShortUrlService;
  let getShortUrlByFullUrl: jest.Mock;
  let getFullUrlByShortUrl: jest.Mock;
  let createUrl: jest.Mock;
  let get: jest.Mock;
  let set: jest.Mock;

  beforeEach(async () => {
    getShortUrlByFullUrl = jest.fn();
    getFullUrlByShortUrl = jest.fn();
    createUrl = jest.fn();
    get = jest.fn();
    set = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        ShortUrlService,
        {
          provide: ShortUrlDALService,
          useValue: {
            getShortUrlByFullUrl,
            getFullUrlByShortUrl,
            createUrl,
          },
        },
        {
          provide: RedisService,
          useValue: {
            get,
            set,
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get(key: string) {
              switch (key) {
                case 'BASE_URL':
                  return 'http://coolName';
              }
            },
          },
        },
      ],
    }).compile();
    shortUrlService = module.get(ShortUrlService);
  });
  describe('createUrl', () => {
    describe('url exists in Redis cache', () => {
      beforeEach(() => {
        get.mockReturnValue(Promise.resolve('http://cool'));
      });
      it('should return existing value from Redis cache', async () => {
        const shortUrl = await shortUrlService.createUrl({
          fullUrl: 'http://example.com',
        });
        expect(shortUrl).toEqual('http://cool');
      });
    });
    describe('url exists in database', () => {
      let url: Url;
      beforeEach(() => {
        url = new Url();
        getShortUrlByFullUrl.mockReturnValue(Promise.resolve(url));
      });
      it('should return existing value from database', async () => {
        const shortUrl = await shortUrlService.createUrl({
          fullUrl: 'http://example.com',
        });
        expect(shortUrl).toEqual(url.shortUrl);
      });
    });
    describe('url does not exist neither in cache nor in database', () => {
      beforeEach(() => {
        createUrl.mockReturnValue(Promise.resolve('http://cool'));
      });
      it('should return short url of the new created row in db', async () => {
        const shortUrl = await shortUrlService.createUrl({
          fullUrl: 'http://example.com',
        });
        expect(shortUrl).toEqual('http://cool');
      });
    });
  });

  describe('getFullUrlByShortUrl', () => {
    describe('url exists in Redis cache', () => {
      beforeEach(() => {
        get.mockReturnValue(Promise.resolve('http://example.com'));
      });
      it('should return existing value from Redis cache', async () => {
        const fullUrl = await shortUrlService.getFullUrlByShortUrl(
          'http://cool',
        );
        expect(fullUrl).toEqual('http://example.com');
      });
    });
    describe('url exists in database', () => {
      let url: Url;
      beforeEach(() => {
        url = new Url();
        getFullUrlByShortUrl.mockReturnValue(Promise.resolve(url));
      });
      it('should return existing value from database', async () => {
        const fullUrl = await shortUrlService.getFullUrlByShortUrl(
          'http://cool',
        );
        expect(fullUrl).toEqual(url.fullUrl);
      });
    });
    describe('url does not exist neither in cache nor in database', () => {
      beforeEach(() => {
        getFullUrlByShortUrl.mockReturnValue(Promise.resolve(undefined));
      });
      it('should throw an error', async () => {
        await expect(
          shortUrlService.getFullUrlByShortUrl('http://cool'),
        ).rejects.toThrow();
      });
    });
  });
});
