import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { CalorieMeterService } from './calorieMeter.service';

@Controller('/calorieMeter')
export class CalorieMeterController {
  constructor(private readonly calorieMeterService: CalorieMeterService) {}

  @Get('/hello')
  getHello(): string {
    return this.calorieMeterService.getHello();
  }

  @Get('/:weight/:height/:age/:gender/:activity')
  calorieIntake(
    @Param('weight') weight: string,
    @Param('height') height: string,
    @Param('age') age: string,
    @Param('gender') gender: string,
    @Param('activity') activity: string,
  ) {
    try {
      return this.calorieMeterService.calorieIntake(
        weight,
        height,
        age,
        gender,
        activity,
      );
    } catch (e) {
      console.log(e);
      if (e.status >= 400 && e.status < 500)
        throw new HttpException(e.response, e.status);
      else
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Get('/days/:weight/:height/:age/:gender/:activity')
  daysToGoalWeight(
    @Param('weight') weight: string,
    @Param('height') height: string,
    @Param('age') age: string,
    @Param('gender') gender: string,
    @Param('activity') activity: string,
  ) {
    try {
      return this.calorieMeterService.daysToGoalWeight(
        weight,
        height,
        age,
        gender,
        activity,
      );
    } catch (e) {
      console.log(e);
      if (e.status >= 400 && e.status < 500)
        throw new HttpException(e.response, e.status);
      else
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
