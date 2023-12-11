import { ReservationStatusEnum } from '../../application/enum/reservation-status.enum';
import { User } from './user';
import { createHash } from 'crypto';
import { ReservationItem } from './reservation-item';

export type ReservationEssentialProperties = Readonly<
  Required<{
    reservationDate: Date;
    user: User;
    reservationItem: ReservationItem;
  }>
>;

export type ReservationOptionalProperties = Readonly<
  Partial<{
    id: string;
    status: ReservationStatusEnum;
    createdAt: Date;
    reservationCount: number;
  }>
>;

export type ReservationProperties = ReservationEssentialProperties &
  ReservationOptionalProperties;

export class Reservation {
  private id: string;

  private status: ReservationStatusEnum;

  private reservationDate: Date;

  private user: User;

  private reservationItem: ReservationItem;
  private reservationCount: number;
  private createdAt: Date;

  constructor(properties: ReservationProperties) {
    Object.assign(this, properties);
  }

  static create(
    userId: number,
    itemId: number,
    reservationDate: Date,
    reservationCount: number,
  ) {
    const newReservation = new Reservation({
      reservationItem: new ReservationItem(itemId),
      reservationDate,
      reservationCount,
      user: new User(userId),
    });
    newReservation.reservationInit();
    newReservation.checkStatus();
    return newReservation;
  }

  getReservation() {
    return { token: this.id, status: this.status };
  }

  reservationInit() {
    this.id = this.createToken();
    this.createdAt = new Date();
  }

  checkStatus() {
    this.status = ReservationStatusEnum.APPROVED;
    if (this.reservationCount >= 5) {
      this.status = ReservationStatusEnum.PENDING;
    }
  }

  private createToken() {
    const date = this.reservationDate.toISOString().split('T')[0];
    const string = `${this.reservationItem.id}-${this.user.id}-${date}`;
    return createHash('sha256').update(string).digest('base64');
  }
}
