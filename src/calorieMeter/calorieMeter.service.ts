import { Injectable } from '@nestjs/common';
import { BmiService } from '../BMI/bmi.service';
import { BmrService } from '../BMR/bmr.service';
import { bodyType } from 'src/constants/enums';

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
      const bmiCategory = this.bmiService.category(
        weightInKg,
        heightInCm,
        gender,
      );
      const tdee = this.bmrService.calculator(
        weight,
        height,
        age,
        gender,
        activity,
      );
      const tdeeR = Math.round(tdee);
      let description: string = '';
      let calorieIntake: number = 0;
      if (bmiCategory === bodyType.Obese) {
        if (bmi >= 40) {
          description = `Danger zone ahead! It's time to hit the brakes on unhealthy habits and take charge of your health. Seek professional guidance and make those lifestyle changes pronto!`;
          calorieIntake = tdeeR - 1000;
        }
        if (bmi >= 35 && bmi < 40) {
          description = `Okay, this is serious stuff. Your weight might be weighing you down. Let's prioritize healthier choices and get you on the path to a lighter, brighter future!`;
          calorieIntake = tdeeR - 750;
        }
        if (bmi >= 30 && bmi < 35) {
          description = `Whoa, looks like you've got some extra baggage to unload. Time to kick those unhealthy habits to the curb and start moving towards a lighter, healthier you!`;
          calorieIntake = tdeeR - 500;
        }
      }
      if (bmiCategory === bodyType.Overweight) {
        description = `Looks like you've got some extra baggage to unload. Time to kick those unhealthy habits to the curb and start moving towards a lighter, healthier you!`;
        calorieIntake = tdeeR - 250;
      }
      if (bmiCategory === bodyType.Underweight) {
        description = `Congratulations, you're in the Goldilocks zone of weight! Keep up the balanced lifestyle, and your body will thank you for it.`;
        calorieIntake = tdeeR + 250;
      }
      if (bmiCategory === bodyType.Normal) {
        description = `You're in the healthy weight range. Keep up the good work and maintain a balanced diet and regular exercise to stay healthy and fit!`;
        calorieIntake = tdeeR;
      }
      const bmiCategoryData = {
        bmi,
        bmiCategory,
        description,
        totalDailyEnergyExpended: `${tdeeR} kcal/day`,
        calorieIntake: `${calorieIntake} kcal/day`,
      };
      return bmiCategoryData;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
