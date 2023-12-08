import { ReservationDataDto } from './dto/reservation-data.dto';
import { ReservationRepository } from '../domain/repository/reservation.repository';
import { ReservationStatusEnum } from './enum/reservation-status.enum';
import { FindReservationsRequestDto } from '../presentation/dto/find-reservations-request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Reservation } from '../domain/model/reservation';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(ReservationRepository)
    private readonly reservationRepository: ReservationRepository,
  ) {}
  async createReservation(reservationData: ReservationDataDto) {
    const alreadyReservations =
      await this.reservationRepository.findByReservationItem(
        reservationData.itemId,
      );

    const reservation = Reservation.create(
      reservationData.userId,
      reservationData.itemId,
      reservationData.reservationDate,
      alreadyReservations.length,
    );
    const { token, status } = reservation.getReservation();

    await this.reservationRepository.add(reservation);

    if (status === ReservationStatusEnum.APPROVED) {
      return { token };
    }

    return { token: null };
  }
  async findReservations(query: FindReservationsRequestDto) {
    return this.reservationRepository.findReservations(query.status);
  }
  async findReservation(token: string) {
    return this.reservationRepository.findOneByToken(token);
  }
}
