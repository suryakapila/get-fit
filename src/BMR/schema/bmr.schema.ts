import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFields } from 'src/constants/schemaFields';

export type BmrDocument = HydratedDocument<Bmr>;

@Schema({ timestamps: true })
export class Bmr extends SchemaFields {
  @Prop()
  userId: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  gender: string;

  @Prop()
  activity: string;
}

export const BmrSchema = SchemaFactory.createForClass(Bmr);
