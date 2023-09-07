import { RedisService } from '../redis.service';
import * as redisMock from 'redis-mock';
import { Test, TestingModule } from '@nestjs/testing';

describe('RedisService', () => {
  let redisService: RedisService;
  let redisClientMock: redisMock.RedisClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: 'REDIS_CLIENT',
          useValue: redisMock.createClient(),
        },
      ],
    }).compile();

    redisClientMock = module.get('REDIS_CLIENT');
    redisService = module.get(RedisService);
  });

  it('should be defined', () => {
    expect(redisService).toBeDefined();
  });
  describe('set Redis key/value cache', () => {
    it('key/value should be set', async () => {
      await expect(redisService.set('key', 'value')).resolves.not.toThrow();
    });
  });
  describe('get Redis cache value by key', () => {
    let value;
    beforeEach(() => {
      value = redisClientMock.get('key');
    });
    it('value should be return by key', async () => {
      const key = await redisService.get('key');
      expect(key).toEqual(value);
    });
  });
});
