import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Exercise,
  ExerciseDocument,
  Workout,
  WorkoutDocument,
} from './schemas/fitzone.schema';
import { Model } from 'mongoose';
import { workoutTypes } from 'src/constants/enums';

@Injectable()
export class FitZoneService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getWorkoutsByZone(type: string, offset: number, limit: number) {
    if (!workoutTypes[type]) {
      return { message: 'Invalid workout type' };
    }
    const workout = await this.workoutModel
      .find({ workoutType: workoutTypes[type] })
      .skip(offset)
      .limit(limit)
      .exec();
    const count = workout ? workout[0].exercises.length : 0;
    const result = workout ? workout[0] : {};
    return { result: result, count };
  }

  async getTargetWorkouts(
    equipment: string,
    muscle: string,
    offset: number,
    limit: number,
  ) {
    const eqType = equipment ? equipment.split(',') : [];
    const muscleType = muscle ? muscle.split(',') : [];
    const matchConditions = [];
    if (eqType.length > 0 && muscleType.length > 0) {
      matchConditions.push({
        targetMuscles: { $in: muscleType },
        equipment: { $in: eqType },
      });
    }
    if (muscleType.length > 0) {
      matchConditions.push({ targetMuscles: { $in: muscleType } });
    }
    if (eqType.length > 0) {
      matchConditions.push({ equipment: { $in: eqType } });
    }
    const aggregationPipeline = [];
    if (matchConditions.length > 0) {
      aggregationPipeline.push({ $match: { $or: matchConditions } });
    }
    aggregationPipeline.push({ $skip: +offset }, { $limit: +limit });
    const workouts = await this.exerciseModel
      .aggregate(aggregationPipeline)
      .exec();
    // count number of matching exercise for the above pipeline
    const count = await this.exerciseModel
      .countDocuments(
        matchConditions.length > 0 ? { $or: matchConditions } : {},
      )
      .exec();
    return { results: workouts, count };
  }

  async getEquipments() {
    const equipment = await this.exerciseModel.distinct('equipment').exec();
    //create an object with the equipment as key and the array of target muscles as value
    const equipmentMap = {};
    equipment.forEach((eq) => {
      equipmentMap[eq] = [];
    });
    const result = await this.exerciseModel.find().exec();
    result.forEach((workout) => {
      workout.equipment.forEach((eq) => {
        equipmentMap[eq] = [...workout.targetMuscles];
      });
    });
    return equipmentMap;
  }
}
