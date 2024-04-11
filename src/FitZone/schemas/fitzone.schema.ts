import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaFields } from 'src/constants/schemaFields';
import { HydratedDocument } from 'mongoose';

export type ExerciseDocument = HydratedDocument<Exercise>;
export type WorkoutDocument = HydratedDocument<Workout>;
@Schema()
export class Exercise extends SchemaFields {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number })
  duration: number;

  @Prop({ type: String })
  image: string;

  @Prop({ type: [String] })
  targetMuscles: string[];

  @Prop({ type: [String] })
  equipment: string[];

  @Prop({ type: String })
  aim: string;
}
export const ExerciseSchema = SchemaFactory.createForClass(Exercise);

@Schema()
export class Workout extends SchemaFields {
  @Prop({ type: String, required: true })
  workoutType: string;

  @Prop({ type: [ExerciseSchema], required: true })
  exercises: Exercise[];
}
export const WorkoutSchema = SchemaFactory.createForClass(Workout);
