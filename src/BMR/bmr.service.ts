import { Injectable } from '@nestjs/common';
import { ActivityLevel } from 'src/constants/enums';

@Injectable()
export class BmrService {
  constructor() {}

  getHello(): string {
    return 'Hello World from BMR!';
  }

  calculator(
    weight: string,
    height: string,
    age: string,
    gender: string,
    activity: string,
  ) {
    let bmr: number;
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseFloat(age);
    if (gender.toLowerCase() === 'male') {
      bmr =
        88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * ageInYears;
    }
    if (gender.toLowerCase() === 'female') {
      bmr =
        447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * ageInYears;
    }
    const tdee = this.totalDailyEnergyExpenditure(bmr, activity);
    return tdee;
  }

  totalDailyEnergyExpenditure(bmr: number, activity: string) {
    if (activity === ActivityLevel.Sedentary) {
      return bmr * 1.2;
    }
    if (activity.toLowerCase() === ActivityLevel.LightlyActive) {
      return bmr * 1.375;
    }
    if (activity.toLowerCase() === ActivityLevel.ModeratelyActive) {
      return bmr * 1.55;
    }
    if (activity.toLowerCase() === ActivityLevel.VeryActive) {
      return bmr * 1.725;
    }
    if (activity.toLowerCase() === ActivityLevel.ExtraActive) {
      return bmr * 1.9;
    }
  }
}
