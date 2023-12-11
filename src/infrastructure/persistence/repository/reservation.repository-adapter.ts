import { ReservationRepository } from '../../../domain/repository/reservation.repository';
import {
  Reservation,
  ReservationProperties,
} from '../../../domain/model/reservation';
import { ReservationStatusEnum } from '../../../application/enum/reservation-status.enum';
import { ReservationOrmRepository } from './reservation.orm-repository';
import { ReservationEntity } from '../entity/reservation.entity';
import { User } from '../../../domain/model/user';
import { ReservationItem } from '../../../domain/model/reservation-item';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationRepositoryAdapter implements ReservationRepository {
  constructor(private readonly ormRepository: ReservationOrmRepository) {}
  async add(reservation: Reservation): Promise<Reservation> {
    const entity = this.modelToEntity(reservation);
    const result = await this.ormRepository.add(entity);
    return this.entityToModel(result);
  }

  async findByReservationItem(itemId: number): Promise<Reservation[]> {
    const entity = await this.ormRepository.findByReservationItem(itemId);
    return this.entitiesToModel(entity);
  }

  async findOneByToken(token: string): Promise<Reservation> {
    const entity = await this.ormRepository.findOneByToken(token);
    return this.entityToModel(entity);
  }

  async findReservations(
    status?: ReservationStatusEnum,
  ): Promise<Reservation[]> {
    const entity = await this.ormRepository.findReservations(status);
    return this.entitiesToModel(entity);
  }

  private modelToEntity(model: Reservation): ReservationEntity {
    const properties = JSON.parse(
      JSON.stringify(model),
    ) as ReservationProperties;

    return this.ormRepository.create({
      id: properties.id,
      userId: properties.user.id,
      itemId: properties.reservationItem.id,
      reservationDate: properties.reservationDate,
      createdAt: properties.createdAt,
    });
  }

  private entityToModel(entity: ReservationEntity): Reservation {
    return new Reservation({
      id: entity.id,
      user: new User(entity.userId),
      reservationItem: new ReservationItem(entity.itemId),
      reservationDate: entity.reservationDate,
      status: entity.status,
      createdAt: entity.createdAt,
    });
  }

  private entitiesToModel(entities: ReservationEntity[]): Reservation[] {
    const array = [];
    for (const entity of entities) {
      array.push(
        new Reservation({
          id: entity.id,
          user: new User(entity.userId),
          reservationItem: new ReservationItem(entity.itemId),
          reservationDate: entity.reservationDate,
          status: entity.status,
          createdAt: entity.createdAt,
        }),
      );
    }
    return array;
  }
}
