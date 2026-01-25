import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AnimalCategory, ConservationStatus, DietType } from '../../config/constants';
import { AnimalMedia } from './animal-media.entity';

@Entity('animals')
export class Animal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  common_name!: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  scientific_name?: string;

  @Column({
    type: 'enum',
    enum: AnimalCategory,
  })
  category!: AnimalCategory;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text', nullable: true })
  habitat?: string;

  @Column({
    type: 'enum',
    enum: DietType,
    nullable: true,
  })
  diet?: DietType;

  @Column({
    type: 'enum',
    enum: ConservationStatus,
    nullable: true,
  })
  conservation_status?: ConservationStatus;

  @Column({ type: 'text', array: true, nullable: true })
  interesting_facts?: string[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  average_lifespan?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  average_weight?: string;

  @Column({ type: 'boolean', default: false })
  is_featured!: boolean;

  @Column({ type: 'int', nullable: true })
  display_order?: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => AnimalMedia, (media) => media.animal)
  media?: AnimalMedia[];
}
