import { Entity, Column, PrimaryGeneratedColumn, 
    DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column()
  image_url: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date;
}