import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MediaType } from '../../config/constants';
import { PointOfInterest } from './poi.entity';

@Entity('poi_media')
export class POIMedia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  poi_id!: number;

  @ManyToOne(() => PointOfInterest, (poi) => poi.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'poi_id' })
  poi?: PointOfInterest;

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
