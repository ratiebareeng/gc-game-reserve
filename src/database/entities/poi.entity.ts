import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { POIType } from '../../config/constants';
import { POIMedia } from './poi-media.entity';

@Entity('points_of_interest')
export class PointOfInterest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({
    type: 'enum',
    enum: POIType,
  })
  type!: POIType;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude!: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude!: number;

  @Column({ type: 'text', array: true, nullable: true })
  facilities?: string[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  best_time_to_visit?: string;

  @Column({ type: 'text', nullable: true })
  accessibility_notes?: string;

  @Column({ type: 'int', array: true, nullable: true })
  common_animals?: number[];

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ type: 'int', nullable: true })
  display_order?: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => POIMedia, (media) => media.poi)
  media?: POIMedia[];

  // Method to calculate distance from a given point (Haversine formula)
  calculateDistance(lat: number, lon: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat - Number(this.latitude));
    const dLon = this.toRad(lon - Number(this.longitude));
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(Number(this.latitude))) *
        Math.cos(this.toRad(lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
