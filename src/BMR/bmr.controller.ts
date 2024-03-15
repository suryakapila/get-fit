import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { BmrService } from './bmr.service';

@Controller('bmr')
export class BmrController {
  constructor(private readonly bmrService: BmrService) {}

  @Get('/hello')
  getHello(): string {
    return this.bmrService.getHello();
  }

  @Get('/:weight/:height/:age/:gender/:activity')
  getBmr(
    @Param('weight') weight: number,
    @Param('height') height: number,
    @Param('age') age: number,
    @Param('gender') gender: string,
    @Param('activity') activity: string,
  ): string {
    try {
      return this.bmrService.getBmr(weight, height, age, gender, activity);
    } catch (e) {
      console.log(e);
      if (e.status >= 400 && e.status < 500)
        throw new HttpException(e.response, e.status);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
