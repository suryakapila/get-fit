import { Injectable } from '@nestjs/common';
import { BmiService } from '../BMI/bmi.service';
import { BmrService } from '../BMR/bmr.service';
import {
  bodyType,
  disclaimer,
  bmiCategories,
  DietGoal,
} from 'src/constants/enums';

@Injectable()
export class CalorieMeterService {
  constructor(
    private readonly bmiService: BmiService,
    private readonly bmrService: BmrService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  private dietType = {
    [DietGoal.WeightGain]: '0',
    [DietGoal.WeightMaintenance]: '1',
    [DietGoal.WeightLoss]: '2',
    [DietGoal.MuscleBuilding]: '3',
  };

  //based on TDEE and BMI decide the calorie intake/ suggest calorie deficit/surplus
  calorieIntake(
    weight: string,
    height: string,
    age: string,
    gender: string,
    activity: string,
  ) {
    try {
      const weightInKg = parseFloat(weight);
      const heightInCm = parseFloat(height);
      let bmi = this.bmiService.calculator(weightInKg, heightInCm);
      let bmiCategory = this.bmiService.category(
        weightInKg,
        heightInCm,
        gender,
      );
      const { tdee, bmr } = this.bmrService.calculator(
        weight,
        height,
        age,
        gender,
        activity,
      );
      const tdeeR = Math.round(tdee);
      const bmrR = Math.round(bmr);
      let description: string = '';
      let calorieIntake: number = 0;
      let calorieDiff: number = 0;
      let dietGoal: string;
      let message: any;
      if (bmiCategory === bodyType.Obese) {
        dietGoal = this.dietType[DietGoal.WeightLoss];
        if (bmi >= 40) {
          description = `Danger zone ahead! It's time to hit the brakes on unhealthy habits and take charge of your health. Seek professional guidance and make those lifestyle changes pronto!`;
          calorieDiff = -1 * 1000;
          calorieIntake = tdeeR + calorieDiff;
          bmiCategory = bmiCategories[5].id;
          message = bmiCategories[5].message;
          if (bmi >= 69) bmi = 69;
        }
        if (bmi >= 35 && bmi < 40) {
          description = `Okay, this is serious stuff. Your weight might be weighing you down. Let's prioritize healthier choices and get you on the path to a lighter, brighter future!`;
          calorieDiff = -1 * 750;
          calorieIntake = tdeeR + calorieDiff;
          bmiCategory = bmiCategories[4].id;
          message = bmiCategories[4].message;
        }
        if (bmi >= 30 && bmi < 35) {
          description = `Whoa, looks like you've got some extra baggage to unload. Time to kick those unhealthy habits to the curb and start moving towards a lighter, healthier you!`;
          calorieDiff = -1 * 500;
          calorieIntake = tdeeR + calorieDiff;
          bmiCategory = bmiCategories[3].id;
          message = bmiCategories[3].message;
        }
      }
      if (bmiCategory === bodyType.Overweight) {
        description = `Looks like you've got some extra baggage to unload. Time to kick those unhealthy habits to the curb and start moving towards a lighter, healthier you!`;
        calorieDiff = -1 * 250;
        calorieIntake = tdeeR + calorieDiff;
        message = bmiCategories[2].message;
        dietGoal = this.dietType[DietGoal.WeightLoss];
      }
      if (bmiCategory === bodyType.Underweight) {
        description = `Being underweight may indicate insufficient nutrition or health problems. Time to beef up those meals and nourish your body for optimal health!`;
        calorieDiff = 250;
        calorieIntake = tdeeR + calorieDiff;
        message = bmiCategories[0].message;
        dietGoal = this.dietType[DietGoal.WeightGain];
      }
      if (bmiCategory === bodyType.Normal) {
        description = `Congratulations, you're in the Goldilocks zone of weight! Keep up the balanced lifestyle, and your body will thank you for it.`;
        calorieDiff = 0;
        calorieIntake = tdeeR + calorieDiff;
        message = bmiCategories[1].message;
        dietGoal = this.dietType[DietGoal.WeightMaintenance];
      }
      const bmiCategoryData = {
        bmi,
        bmrR,
        bmiCategory,
        description,
        dietGoal,
        calorieDiff,
        message,
        totalDailyEnergyExpended: `${tdeeR} kcal/day`,
        calorieIntake: `${calorieIntake} kcal/day`,
      };
      return bmiCategoryData;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  getIdealWeight(height: string) {
    const heightR = parseFloat(height);
    const heightInCm: number = heightR / 100;
    const idealWeight: number = heightInCm * heightInCm * 21.7;
    return idealWeight;
  }

  daysToGoalWeight(
    weight: string,
    height: string,
    age: string,
    gender: string,
    activity: string,
  ) {
    const idealWeight = this.getIdealWeight(height);
    const weightR = parseFloat(weight);
    const weightDifference = weightR - idealWeight;
    const bmi = this.calorieIntake(weight, height, age, gender, activity);
    const calorieDiff = bmi.calorieDiff;
    const tdee = parseFloat(bmi.totalDailyEnergyExpended);
    const bmr = bmi.bmrR;
    let daysToGoalWeight = 0;
    if (calorieDiff != 0) {
      daysToGoalWeight =
        (weightDifference * 7700) / (tdee + calorieDiff - (tdee - bmr));
    }
    const days =
      daysToGoalWeight < 0
        ? -1 * Math.round(daysToGoalWeight)
        : Math.round(daysToGoalWeight);
    const date = this.getCalendarDate(days);
    const res = `${date}`;
    return {
      currentBodyWeight: weight + ' kg',
      idealWeight: idealWeight.toFixed(1) + ' kg',
      bodyMassIndex: bmi.bmi.toFixed(1),
      basalMetabolicRate: bmi.bmrR + ' kcal/day',
      totalEnergyExpenditure: bmi.totalDailyEnergyExpended,
      bmiCategory: bmi.bmiCategory,
      daysToGoalWeight: days.toString() + ' days',
      estimatedDate: res,
      description: bmi.description,
      dietGoal: bmi.dietGoal,
      calorieIntake: tdee + calorieDiff + ' kcal/day',
      message: bmi.message,
      disclaimer: disclaimer.daysToGoalWeight,
    };
  }

  getCalendarDate(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toDateString();
  }
}
