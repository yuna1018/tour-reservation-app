import { Reservation } from '../../src/domain/model/reservation';
import { ReservationStatusEnum } from '../../src/application/enum/reservation-status.enum';

describe('Reservation', () => {
  test('투어 예약 시 예약된 사람이 5명 미만이면 자동 승인', () => {
    //given
    const reservationData = {
      userId: 1,
      itemId: 1,
      reservationDate: new Date('2023-12-09'),
    };
    const alreadyReservations = 3;

    //when
    const reservation = Reservation.create(
      reservationData.userId,
      reservationData.itemId,
      reservationData.reservationDate,
      alreadyReservations,
    );
    const { token, status } = reservation.getReservation();

    //then
    expect(token).toBeDefined();
    expect(status).toEqual(ReservationStatusEnum.APPROVED);
  });

  test('투어 예약 시 예약된 사람이 5명 이상이면 예약 대기', () => {
    //given
    const reservationData = {
      userId: 1,
      itemId: 1,
      reservationDate: new Date('2023-12-09'),
    };
    const alreadyReservations = 5;

    //when
    const reservation = Reservation.create(
      reservationData.userId,
      reservationData.itemId,
      reservationData.reservationDate,
      alreadyReservations,
    );
    const { token, status } = reservation.getReservation();

    //then
    expect(token).toBeDefined();
    expect(status).toEqual(ReservationStatusEnum.PENDING);
  });
});
