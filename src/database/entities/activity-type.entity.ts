import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Booking } from './booking.entity';

@Entity('activity_types')
export class ActivityType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_person!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_vehicle!: number;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Booking, (booking) => booking.activity_type)
  bookings?: Booking[];

  // Method to calculate total fee
  calculateFee(visitors: number, vehicles: number): number {
    const visitorFee = visitors * Number(this.price_per_person);
    const vehicleFee = vehicles * Number(this.price_per_vehicle);
    return visitorFee + vehicleFee;
  }
}
