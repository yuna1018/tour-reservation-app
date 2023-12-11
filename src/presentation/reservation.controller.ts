import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReservationService } from '../application/reservation.service';
import { CreateReservationRequestDto } from './dto/create-reservation-request.dto';
import { FindReservationsRequestDto } from './dto/find-reservations-request.dto';

@Controller('reservation')
@UsePipes(new ValidationPipe({ transform: true }))
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async createReservation(@Body() request: CreateReservationRequestDto) {
    return this.reservationService.createReservation(request);
  }

  @Get()
  async findReservations(@Query() query: FindReservationsRequestDto) {
    return this.reservationService.findReservations(query);
  }

  @Get(':token')
  async findReservation(@Param('token') token: string) {
    return this.reservationService.findReservation(token);
  }
}
