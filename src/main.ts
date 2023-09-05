import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Super cool url shortener')
    .setDescription(
      'There will be shown all of the API routes that are exist to this moment.',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      requestInterceptor: (req) => {
        req.credentials = 'include';
        return req;
      },
    },
  });

  await app.listen(3000);
}
bootstrap();
