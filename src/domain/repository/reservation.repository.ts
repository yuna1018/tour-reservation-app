import { ReservationStatusEnum } from '../../application/enum/reservation-status.enum';
import { Reservation } from '../model/reservation';

export interface ReservationRepository {
  findReservations(status?: ReservationStatusEnum): Promise<Reservation[]>;
  findOneByToken(token: string): Promise<Reservation>;
  findByReservationItem(itemId: number): Promise<Reservation[]>;
  add(reservation: Reservation): Promise<Reservation>;
}
export const ReservationRepository = Symbol('ReservationRepository');
