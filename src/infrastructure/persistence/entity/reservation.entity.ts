import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReservationStatusEnum } from '../../../application/enum/reservation-status.enum';

@Entity('reservation')
export class ReservationEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'int' })
  itemId: number;

  @Column({ type: 'datetime' })
  reservationDate: Date;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'enum', enum: ReservationStatusEnum })
  status: ReservationStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
