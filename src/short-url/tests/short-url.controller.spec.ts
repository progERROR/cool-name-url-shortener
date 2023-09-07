import { ShortUrlController } from '../short-url.controller';
import { Test } from '@nestjs/testing';
import { ShortUrlService } from '../services/short-url.service';

describe('ShortUrlController', () => {
  let shortUrlController: ShortUrlController;
  let createUrl: jest.Mock;
  let getFullUrlByShortUrl: jest.Mock;

  beforeEach(async () => {
    createUrl = jest.fn();
    getFullUrlByShortUrl = jest.fn();
    const module = await Test.createTestingModule({
      controllers: [ShortUrlController],
      providers: [
        {
          provide: ShortUrlService,
          useValue: {
            createUrl,
            getFullUrlByShortUrl,
          },
        },
      ],
    }).compile();
    shortUrlController = module.get(ShortUrlController);
  });
  describe('createUrl', () => {
    beforeEach(() => {
      createUrl.mockReturnValue(Promise.resolve('http://cool'));
    });
    it('should return short url', async () => {
      const shortUrl = await shortUrlController.createUrl({
        fullUrl: 'http://example.com',
      });
      expect(shortUrl).toEqual('http://cool');
    });
  });
  describe('getFullUrlByShortUrl', () => {
    beforeEach(() => {
      getFullUrlByShortUrl.mockReturnValue(
        Promise.resolve('http://example.com'),
      );
    });
    it('should return full url', async () => {
      const fullUrl = await shortUrlController.getFullUrlByShortUrl(
        'http://cool',
      );
      expect(fullUrl).toEqual('http://example.com');
    });
  });
});
