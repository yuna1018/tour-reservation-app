import { Repository } from 'typeorm';
import { ReservationStatusEnum } from '../../../application/enum/reservation-status.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from '../entity/reservation.entity';

@Injectable()
export class ReservationOrmRepository extends Repository<ReservationEntity> {
  constructor(
    @InjectRepository(ReservationEntity)
    private repository: Repository<ReservationEntity>,
  ) {
    super(repository.target, repository.manager);
  }

  async add(reservation: ReservationEntity): Promise<ReservationEntity> {
    return this.repository.save(reservation);
  }

  async findReservations(status?: ReservationStatusEnum) {
    return this.repository.find({ where: { status: status } });
  }

  async findOneByToken(token: string): Promise<ReservationEntity> {
    return this.repository.findOneBy({ id: token });
  }

  async findByReservationItem(itemId: number): Promise<ReservationEntity[]> {
    return this.repository.findBy({
      itemId,
      status: ReservationStatusEnum.APPROVED,
    });
  }
}
