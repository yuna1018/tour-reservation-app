import { DataSource, Repository } from 'typeorm';
import { ReservationEntity } from '../../src/infrastructure/persistence/entity/reservation.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeormConfigModule } from '../../src/infrastructure/database/typeorm-config.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

describe('Reservation Repository', () => {
  let reservationRepository: Repository<ReservationEntity>;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath:
            process.env.NODE_ENV === 'development' ? '.env' : '.test.env',
          isGlobal: true,
        }),
        TypeormConfigModule,
        TypeOrmModule.forFeature([ReservationEntity]),
      ],
    }).compile();
    reservationRepository = module.get(getRepositoryToken(ReservationEntity));
    dataSource = module.get<DataSource>(DataSource);
  });

  beforeEach(async () => await reservationRepository.clear());

  afterAll(async () => await dataSource.destroy());

  test('투어 예약 등록', async () => {
    //given
    const reservationData = {
      id: 'tour-1-yuna-2023-12-06-01',
      itemId: 1,
      reservationDate: new Date('2023-12-08'),
      userId: 1,
    };
    const reservation = reservationRepository.create(reservationData);

    //when
    const result = await reservationRepository.save(reservation);

    //then
    expect(result.id).toEqual(reservationData.id);
    expect(result.itemId).toEqual(reservationData.itemId);
    expect(result.reservationDate).toEqual(reservationData.reservationDate);
    expect(result.userId).toEqual(reservationData.userId);
  });

  test('투어 예약 조회', async () => {
    //given
    const reservationData = {
      id: 'tour-1-yuna-2023-12-06-01',
      itemId: 1,
      reservationDate: new Date('2023-12-08'),
      userId: 1,
    };
    const getDate = { id: 'tour-1-yuna-2023-12-06-01' };
    const reservation = reservationRepository.create(reservationData);

    //when
    await reservationRepository.save(reservation);
    const findReservation = await reservationRepository.findOneBy({
      id: getDate.id,
    });

    //then
    expect(findReservation.id).toEqual(reservationData.id);
    expect(findReservation.itemId).toEqual(reservationData.itemId);
    expect(findReservation.reservationDate).toEqual(
      reservationData.reservationDate.toISOString().split('T')[0],
    );
    expect(findReservation.userId).toEqual(reservationData.userId);
  });
});
