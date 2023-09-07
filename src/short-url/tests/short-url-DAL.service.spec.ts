import { ShortUrlDALService } from '../services/short-url-DAL.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import Url from '../../db/entities/url.entity';

describe('ShortUrlDALService', () => {
  let shortUrlDALService: ShortUrlDALService;
  let save: jest.Mock;
  let findOneBy: jest.Mock;

  beforeEach(async () => {
    save = jest.fn();
    findOneBy = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        ShortUrlDALService,
        { provide: getRepositoryToken(Url), useValue: { save, findOneBy } },
      ],
    }).compile();
    shortUrlDALService = await module.get(ShortUrlDALService);
  });
  describe('createUrl', () => {
    let url: Url;
    beforeEach(() => {
      url = new Url();
      save.mockReturnValue(Promise.resolve(url));
    });
    it('should return short url', async () => {
      const shortUrl = await shortUrlDALService.createUrl(
        'http://example',
        'http://cool',
      );
      expect(shortUrl).toEqual(url.shortUrl);
    });
  });
  describe('getShortUrlByFullUrl', () => {
    let url: Url;
    beforeEach(() => {
      url = new Url();
      findOneBy.mockReturnValue(Promise.resolve(url));
    });
    it('should return short url', async () => {
      const existingUrl = await shortUrlDALService.getShortUrlByFullUrl(
        'http://example',
      );
      expect(existingUrl).toEqual(url);
    });
  });
  describe('getFullUrlByShortUrl', () => {
    let url: Url;
    beforeEach(() => {
      url = new Url();
      findOneBy.mockReturnValue(Promise.resolve(url));
    });
    it('should return full url', async () => {
      const existingUrl = await shortUrlDALService.getFullUrlByShortUrl(
        'http://cool',
      );
      expect(existingUrl).toEqual(url);
    });
  });
});
