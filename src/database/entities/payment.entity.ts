import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PaymentStatus, PaymentMethod, PaymentGateway, CURRENCY } from '../../config/constants';
import { Booking } from './booking.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  booking_id!: string;

  @ManyToOne(() => Booking, (booking) => booking.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'booking_id' })
  booking?: Booking;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  transaction_id?: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  payment_method?: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentGateway,
    nullable: true,
  })
  payment_gateway?: PaymentGateway;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: 'varchar', length: 3, default: CURRENCY })
  currency!: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column({ type: 'timestamp', nullable: true })
  payment_date?: Date;

  @Column({ type: 'jsonb', nullable: true })
  gateway_response?: Record<string, any>;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  // Method to check if payment is successful
  isSuccessful(): boolean {
    return this.status === PaymentStatus.COMPLETED;
  }

  // Method to check if payment is pending
  isPending(): boolean {
    return this.status === PaymentStatus.PENDING;
  }

  // Method to check if payment failed
  isFailed(): boolean {
    return this.status === PaymentStatus.FAILED;
  }
}
