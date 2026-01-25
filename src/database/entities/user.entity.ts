import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../../config/constants';
import { Booking } from './booking.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phone_number?: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash!: string;

  @Column({ type: 'varchar', length: 100 })
  first_name!: string;

  @Column({ type: 'varchar', length: 100 })
  last_name!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VISITOR,
  })
  role!: UserRole;

  @Column({ type: 'boolean', default: false })
  is_verified!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings?: Booking[];

  // Method to get full name
  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  // Method to check if user is admin
  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  // Method to check if user is staff
  isStaff(): boolean {
    return this.role === UserRole.STAFF || this.role === UserRole.ADMIN;
  }
}
