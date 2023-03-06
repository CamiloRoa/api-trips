import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Roles } from './roles.schema';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lon: number;

  @Prop({ default: 'FREE' })
  status: string;

  @Prop()
  payment_source_id: number;

  @Prop({ type: Types.ObjectId, ref: Roles.name, required: true })
  rol: Roles | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
