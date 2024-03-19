import { Injectable } from '@nestjs/common';

@Injectable()
export class BmiService {
  getHello(): string {
    return 'Hello World!';
  }

  calculator(weight: number, height: number) {
    const heightInM = height / 100;
    return weight / (heightInM * heightInM);
  }

  category(weight: number, height: number, gender: string) {
    try {
      const bmi = this.calculator(weight, height);
      if (gender.toLowerCase() === 'male') {
        if (bmi < 20) {
          return 'Underweight';
        } else if (bmi >= 20 && bmi < 25) {
          return 'Normal';
        } else if (bmi >= 25 && bmi < 30) {
          return 'Overweight';
        } else if (bmi >= 30) {
          return 'Obese';
        }
      }
      if (gender.toLowerCase() === 'female') {
        if (bmi < 18) {
          return 'Underweight';
        } else if (bmi >= 18 && bmi < 24) {
          return 'Normal';
        } else if (bmi >= 24 && bmi < 29) {
          return 'Overweight';
        } else if (bmi >= 29) {
          return 'Obese';
        }
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
