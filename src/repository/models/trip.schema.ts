import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from './user.schema';

@Schema({ timestamps: true })
export class Trip extends Document {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lon: number;

  @Prop()
  lat_end: number;

  @Prop()
  lon_end: number;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  id_passenger: User | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  id_driver: User | Types.ObjectId;

  @Prop()
  amount: number;

  @Prop({ default: 'ongoing' })
  status: string;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
