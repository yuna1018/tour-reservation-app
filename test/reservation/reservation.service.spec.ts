import { ReservationService } from '../../src/application/reservation.service';
import { ReservationRepository } from '../../src/domain/repository/reservation.repository';
import { instance, mock, when } from 'ts-mockito';
import { Reservation } from '../../src/domain/model/reservation';
import { ReservationRepositoryAdapter } from '../../src/infrastructure/persistence/repository/reservation.repository-adapter';

describe('Reservation Service', () => {
  const stubRepository: ReservationRepository = mock(
    ReservationRepositoryAdapter,
  );
  const reservationService: ReservationService = new ReservationService(
    instance(stubRepository),
  );

  test('예약에 성공한 고객은 token 값을 받을 수 있다.', async () => {
    //given
    const reservationDate = {
      userId: 1,
      itemId: 1,
      reservationDate: new Date('2023-12-08'),
    };
    const reservation: Reservation = Reservation.create(
      reservationDate.userId,
      reservationDate.itemId,
      reservationDate.reservationDate,
      1,
    );
    when(
      await stubRepository.findByReservationItem(reservationDate.itemId),
    ).thenReturn([]);
    when(await stubRepository.add(reservation)).thenReturn(reservation);

    //when
    const { token } =
      await reservationService.createReservation(reservationDate);

    //then
    expect(token).not.toBeNull();
  });
});
