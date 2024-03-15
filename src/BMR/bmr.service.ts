import { Injectable } from '@nestjs/common';

@Injectable()
export class BmrService {
  getHello(): string {
    return 'Hello World from BMR!';
  }

  getBmr(
    weight: number,
    height: number,
    age: number,
    gender: string,
    activity: string,
  ) {
    let bmr: number;
    if (gender.toLowerCase() === 'men') {
      bmr = 88.362 + 13.397 * weight + 4.799 * height * 100 - 5.677 * age;
    }
    if (gender.toLowerCase() === 'women') {
      bmr = 447.593 + 9.247 * weight + 3.098 * height * 100 - 4.33 * age;
    }
    console.log({ activity });
    console.log({ bmr });
    return 'a';
  }
}
