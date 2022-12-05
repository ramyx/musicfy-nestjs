import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateAlbumDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    author: string;
  
    @IsNotEmpty()
    year: number;
  
    @IsNotEmpty()
    image_url: string;
}