import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MediaType } from '../../config/constants';
import { Animal } from './animal.entity';

@Entity('animal_media')
export class AnimalMedia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  animal_id!: number;

  @ManyToOne(() => Animal, (animal) => animal.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'animal_id' })
  animal?: Animal;

  @Column({
    type: 'enum',
    enum: MediaType,
  })
  media_type!: MediaType;

  @Column({ type: 'varchar', length: 500 })
  url!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnail_url?: string;

  @Column({ type: 'text', nullable: true })
  caption?: string;

  @Column({ type: 'boolean', default: false })
  is_primary!: boolean;

  @Column({ type: 'int', nullable: true })
  display_order?: number;

  @CreateDateColumn()
  created_at!: Date;
}
