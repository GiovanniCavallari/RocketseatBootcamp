import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'provider_id' })
  provider: User;
}

export default Appointment;
