import { Module } from '@nestjs/common';
import { FitZoneController } from './fitzone.controller';
import { FitZoneService } from './fitzone.service';
import {
  Exercise,
  ExerciseSchema,
  Workout,
  WorkoutSchema,
} from './schemas/fitzone.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]),
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  controllers: [FitZoneController],
  providers: [FitZoneService],
})
export class FitZoneModule {}
