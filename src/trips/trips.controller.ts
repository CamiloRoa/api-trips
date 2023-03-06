import { Controller, Post, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/trip.dto';

import { MongoIdPipe } from '../common/mongo-id.pipe';

import { UsersService } from '../users/users.service';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripsService: TripsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('start')
  async createTrip(
    @Query('id_passenger', MongoIdPipe) id_passenger: string,
    @Body() createTrip: CreateTripDto,
  ) {
    const driver = await this.usersService.getDrivers();
    const { _id } = this.tripsService.findNearestObject(
      createTrip.latitud,
      createTrip.longitud,
      driver,
    );
    return this.tripsService.create(createTrip, id_passenger, _id);
  }

  @Post('end')
  async updateTrip(
    @Query('id_trip', MongoIdPipe) id_trip: string,
    @Query('time', ParseIntPipe) time: number,
    @Body() endTrip: CreateTripDto,
  ) {
    const infoTrip = await this.tripsService.getTrip(id_trip);
    infoTrip.lat_end = endTrip.latitud;
    infoTrip.lon_end = endTrip.longitud;
    const user = await this.usersService.findByUser(infoTrip.id_passenger);
    const distanceKM = this.tripsService.calculateDistance(
      infoTrip.lat,
      infoTrip.lon,
      endTrip.latitud,
      endTrip.longitud,
    );
    return this.tripsService.endTrip(distanceKM, time, user, id_trip, infoTrip);
  }
}
