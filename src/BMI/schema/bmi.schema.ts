import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFields } from 'src/constants/schemaFields';

export type BmiDocument = HydratedDocument<Bmi>;

@Schema({ timestamps: true })
export class Bmi extends SchemaFields {
  @Prop()
  weight: number;

  @Prop()
  height: number;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  bmi: number;

  @Prop()
  category: string;
}

export const BmiSchema = SchemaFactory.createForClass(Bmi);
