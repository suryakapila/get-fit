import { Injectable } from '@nestjs/common';
import { BmiService } from '../BMI/bmi.service';
import { BmrService } from '../BMR/bmr.service';
import { bodyType, disclaimer } from 'src/constants/enums';

@Injectable()
export class CalorieMeterService {
  constructor(
    private readonly bmiService: BmiService,
    private readonly bmrService: BmrService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

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
      const bmi = this.bmiService.calculator(weightInKg, heightInCm);
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
      if (bmiCategory === bodyType.Obese) {
        if (bmi >= 40) {
          description = `Danger zone ahead! It's time to hit the brakes on unhealthy habits and take charge of your health. Seek professional guidance and make those lifestyle changes pronto!`;
          calorieDiff = -1 * 1000;
          calorieIntake = tdeeR + calorieDiff;
          bmiCategory = bodyType.Obese + '(Class 3)';
        }
        if (bmi >= 35 && bmi < 40) {
          description = `Okay, this is serious stuff. Your weight might be weighing you down. Let's prioritize healthier choices and get you on the path to a lighter, brighter future!`;
          calorieDiff = -1 * 750;
          calorieIntake = tdeeR + calorieDiff;
          bmiCategory = bodyType.Obese + '(Class 2)';
        }
        if (bmi >= 30 && bmi < 35) {
          description = `Whoa, looks like you've got some extra baggage to unload. Time to kick those unhealthy habits to the curb and start moving towards a lighter, healthier you!`;
          calorieDiff = -1 * 500;
          calorieIntake = tdeeR + calorieDiff;
          bmiCategory = bodyType.Obese + '(Class 1)';
        }
      }
      if (bmiCategory === bodyType.Overweight) {
        description = `Looks like you've got some extra baggage to unload. Time to kick those unhealthy habits to the curb and start moving towards a lighter, healthier you!`;
        calorieDiff = -1 * 250;
        calorieIntake = tdeeR + calorieDiff;
      }
      if (bmiCategory === bodyType.Underweight) {
        description = `Being underweight may indicate insufficient nutrition or health problems. Time to beef up those meals and nourish your body for optimal health!`;
        calorieDiff = 250;
        calorieIntake = tdeeR + calorieDiff;
      }
      if (bmiCategory === bodyType.Normal) {
        description = `Congratulations, you're in the Goldilocks zone of weight! Keep up the balanced lifestyle, and your body will thank you for it.`;
        calorieDiff = 0;
        calorieIntake = tdeeR + calorieDiff;
      }
      const bmiCategoryData = {
        bmi,
        bmrR,
        bmiCategory,
        description,
        calorieDiff,
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
      idealWeight: idealWeight.toFixed(1) + ' kg',
      bodyMassIndex: bmi.bmi.toFixed(1),
      basalMetabolicRate: bmi.bmrR,
      bmiCategory: bmi.bmiCategory,
      daysToGoalWeight: res,
      description: bmi.description,
      calorieIntake: tdee + calorieDiff + ' kcal/day',
      disclaimer: disclaimer.daysToGoalWeight,
    };
  }

  getCalendarDate(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toDateString();
  }
}
