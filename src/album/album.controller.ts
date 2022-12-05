import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dtos/album.dto';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) { }

    @Post()
    create(@Body() createAlbumDto: CreateAlbumDto) {
        return this.albumService.create(createAlbumDto);
    }

    @Get()
    findAll() {
        return this.albumService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.albumService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAlbumDto: Partial<CreateAlbumDto>) {
        return this.albumService.update(+id, updateAlbumDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.albumService.remove(+id);
    }
}
