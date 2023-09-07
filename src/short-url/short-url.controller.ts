import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ShortUrlService } from './services/short-url.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUrlDto } from './dto/createUrl.dto';

@ApiTags('ShortUrl')
@Controller('shortUrl')
export class ShortUrlController {
  private logger = new Logger(ShortUrlController.name);

  constructor(private shortUrlService: ShortUrlService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  public async createUrl(@Body() createUrlDto: CreateUrlDto): Promise<string> {
    this.logger.log('Creating short url by full url');
    return this.shortUrlService.createUrl(createUrlDto);
  }

  @Get('/:shortUrl')
  @HttpCode(HttpStatus.OK)
  public async getFullUrlByShortUrl(
    @Param('shortUrl') shortUrl: string,
  ): Promise<string> {
    this.logger.log('Getting full url by its short version');
    return this.shortUrlService.getFullUrlByShortUrl(shortUrl);
  }
}
