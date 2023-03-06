import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTripDto, UpdateTripDto } from './dto/trip.dto';
import { TripRepository } from '../repository/trip.repository';
import axios from 'axios';

@Injectable()
export class TripsService {
  constructor(
    private tripRepository: TripRepository,
    private configService: ConfigService,
  ) {}
  private readonly earthRadius = 6371; // Radio de la Tierra en km

  // Función para calcular la distancia entre dos puntos dadas sus latitudes y longitudes
  create(createTripDto: CreateTripDto, user: string, driver: string) {
    const data = {
      lat: createTripDto.latitud,
      lon: createTripDto.longitud,
      id_passenger: user,
      id_driver: driver,
    };
    return this.tripRepository.create(data);
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = this.earthRadius * c;
    return distance;
  }

  private toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  // Función para encontrar el objeto más cercano a una ubicación dada
  findNearestObject(latitude: number, longitude: number, objects) {
    let nearestObj = objects[0];
    let nearestDist = this.calculateDistance(
      latitude,
      longitude,
      objects[0].lat,
      objects[0].lon,
    );

    for (let i = 1; i < objects.length; i++) {
      const obj = objects[i];
      const dist = this.calculateDistance(
        latitude,
        longitude,
        obj.lat,
        obj.lon,
      );

      if (dist < nearestDist) {
        nearestObj = obj;
        nearestDist = dist;
      }
    }

    return nearestObj;
  }

  async getTrip(id_trip: string) {
    const trip = await this.tripRepository.findTripById(id_trip);
    return trip;
  }

  async endTrip(distance, time, user, id_trip, updateTrip) {
    const totalFare = this.calculateTotalFare(distance, time);
    updateTrip.amount = totalFare;
    updateTrip.status = 'finished';
    const payment = await this.makePayment(totalFare, user);
    await this.tripRepository.updateTrip(id_trip, updateTrip);
    return payment;
  }

  private calculateTotalFare(
    distanceInKm: number,
    durationInMinutes: number,
  ): number {
    const { fareKM, fareTime, fareBase } =
      this.configService.get('config.fares');
    const fareFromKm = distanceInKm * parseInt(fareKM);
    const fareFromTime = durationInMinutes * parseInt(fareTime);
    const totalFare = fareFromKm + fareFromTime + parseInt(fareBase);
    return Math.round(totalFare);
  }
  async makePayment(amount: number, user) {
    try {
      const { urlPayment, currency, keyPrivate } =
        this.configService.get('config.payment');
      const ref = 'sJK4489dDjkd390ds' + Math.floor(Math.random() * 1000);
      const paymentData = {
        amount_in_cents: amount * 100,
        currency: currency,
        customer_email: user.email,
        payment_method: {
          installments: 24,
        },
        reference: ref,
        payment_source_id: user.payment_source_id,
      };

      const headers = {
        Authorization: `Bearer ${keyPrivate}`,
        'Content-Type': 'application/json',
      };

      await axios.post(urlPayment, paymentData, { headers });

      return {
        message: `Este es el valor que cargamos a tu tarjeta ${amount} y referencia de pago ${ref}`,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
