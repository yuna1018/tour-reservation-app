import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationOrmRepository } from '../infrastructure/persistence/repository/reservation.orm-repository';
import { ReservationRepository } from '../domain/repository/reservation.repository';
import { ReservationService } from '../application/reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationRepositoryAdapter } from '../infrastructure/persistence/repository/reservation.repository-adapter';
import { ReservationEntity } from '../infrastructure/persistence/entity/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
  controllers: [ReservationController],
  providers: [
    {
      provide: ReservationRepository,
      useClass: ReservationRepositoryAdapter,
    },
    ReservationOrmRepository,
    ReservationService,
  ],
})
export class ReservationModule {}
