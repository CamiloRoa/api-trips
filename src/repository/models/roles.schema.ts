import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Roles extends Document {
  @Prop({ required: true, unique: true }) // 👈 is unique
  name: string;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
