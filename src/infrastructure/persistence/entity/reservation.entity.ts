import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('reservation')
export class ReservationEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'int' })
  itemId: number;

  @Column({ type: 'date' })
  reservationDate: Date;

  @Column({ type: 'int' })
  userId: number;
}
