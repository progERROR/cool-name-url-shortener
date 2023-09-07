import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('ShortUrlController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const mockAppModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = mockAppModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('should save new url and return its short version', async () => {
    const response = await request(app.getHttpServer())
      .post('/shortUrl')
      .send({ fullUrl: 'http://expample.com' })
      .expect(201);

    const shortUrl = response.body;
    expect(shortUrl).not.toBeUndefined();
  });
});
