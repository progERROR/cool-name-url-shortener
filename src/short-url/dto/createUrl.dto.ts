import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
  @ApiProperty({ example: 'https://google.com', description: 'Some url' })
  @IsString()
  @IsNotEmpty()
  fullUrl: string;
}
