import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto } from './dtos/album.dto';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity) private albumsRepository: Repository<AlbumEntity>
    ) { }

    async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
        const items = await this.albumsRepository.count();
        
        if (items < Number(process.env.LIMIT_ALBUM)) {
            const newAlbum = await this.albumsRepository.save({ ...createAlbumDto });
            return newAlbum;
        } else {
            throw new ConflictException('album limit reached')
        }
    }

    async update(id: number, createAlbumDto: Partial<CreateAlbumDto>) {
        const albumExist = await this.albumsRepository.findOneBy({ id });
        if (!albumExist) throw new NotFoundException();
        const updatedAlbum = Object.assign(albumExist, createAlbumDto);

        return await this.albumsRepository.save(updatedAlbum);
    }

    findAll(): Promise<AlbumEntity[]> {
        return this.albumsRepository.find();
    }

    findOne(id: number): Promise<AlbumEntity> {
        return this.albumsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        const deleteResponse = await this.albumsRepository.softDelete(id);
        if (!deleteResponse.affected) {
            throw new UnprocessableEntityException();
        }
    }
}
