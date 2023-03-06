import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTripDto } from '../trips/dto/trip.dto';
import { Trip } from './models/trip.schema';

@Injectable()
export class TripRepository {
  constructor(
    @InjectModel('Trip')
    private readonly tripModel: Model<Trip>,
  ) {}

  async create(createTrip): Promise<Trip> {
    const newTrip = new this.tripModel(createTrip);
    return await newTrip.save();
  }

  async findTripById(id: string): Promise<Trip> {
    return await this.tripModel.findOne({ _id: id });
  }

  async updateTrip(id: string, updateTrip): Promise<Trip> {
    return await this.tripModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateTrip },
      { new: true },
    );
  }
}
