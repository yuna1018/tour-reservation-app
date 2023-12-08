import { ReservationStatusEnum } from '../../application/enum/reservation-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class FindReservationsRequestDto {
  @IsEnum(ReservationStatusEnum)
  @IsOptional()
  status?: ReservationStatusEnum;
}
