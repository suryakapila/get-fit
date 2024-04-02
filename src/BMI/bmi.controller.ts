import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { BmiService } from './bmi.service';

@Controller('/bmi')
export class BmiController {
  constructor(private readonly bmiService: BmiService) {}

  @Get()
  getHello(): string {
    return this.bmiService.getHello();
  }
  @Get('calculator/:weight/:height')
  calculator(@Param('weight') weight: number, @Param('height') height: number) {
    try {
      this.bmiService.calculator(weight, height);
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

  @Get('/category/:weight/:height/:gender')
  category(
    @Param('weight') weight: number,
    @Param('height') height: number,
    @Param('gender') gender: string,
  ) {
    try {
      return this.bmiService.category(weight, height, gender);
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
