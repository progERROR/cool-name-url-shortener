import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from './redis.provider';

@Injectable()
export class RedisService {
  public constructor(
    @Inject('REDIS_CLIENT')
    private readonly client: RedisClient,
  ) {}

  async set(key: string, value: string) {
    await this.client.set(key, value, 'EX', 3600);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }
}
