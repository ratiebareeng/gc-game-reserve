import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { BookingStatus, BOOKING_REFERENCE_PREFIX } from '../../config/constants';
import { User } from './user.entity';
import { ActivityType } from './activity-type.entity';
import { Payment } from './payment.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: true })
  user_id?: string;

  @ManyToOne(() => User, (user) => user.bookings, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ type: 'varchar', length: 20, unique: true })
  booking_reference!: string;

  @Column({ type: 'date' })
  visit_date!: Date;

  @Column({ type: 'time', nullable: true })
  visit_time?: string;

  @Column({ type: 'int' })
  activity_type_id!: number;

  @ManyToOne(() => ActivityType, (activityType) => activityType.bookings)
  @JoinColumn({ name: 'activity_type_id' })
  activity_type?: ActivityType;

  @Column({ type: 'int' })
  number_of_visitors!: number;

  @Column({ type: 'int' })
  number_of_vehicles!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  visitor_fee!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  vehicle_fee!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount!: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status!: BookingStatus;

  @Column({ type: 'varchar', length: 200, nullable: true })
  contact_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact_email?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  contact_phone?: string;

  @Column({ type: 'text', nullable: true })
  special_requests?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments?: Payment[];

  @BeforeInsert()
  generateBookingReference() {
    // Generate booking reference: GGR20260125001
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.booking_reference = `${BOOKING_REFERENCE_PREFIX}${year}${month}${day}${random}`;
  }

  // Method to check if booking is confirmed
  isConfirmed(): boolean {
    return this.status === BookingStatus.CONFIRMED;
  }

  // Method to check if booking is cancellable
  isCancellable(): boolean {
    return this.status === BookingStatus.PENDING || this.status === BookingStatus.CONFIRMED;
  }

  // Method to check if booking date is in the future
  isFutureBooking(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const visitDate = new Date(this.visit_date);
    return visitDate >= today;
  }
}
