import { Controller, Get } from '@nestjs/common';
import { BmiService } from './bmi.service';

@Controller('bmi')
export class BmiController {
  constructor(private readonly bmiService: BmiService) {}

  @Get()
  getHello(): string {
    return this.bmiService.getHello();
  }
}
// Path: src/BMI/bmi.service.ts
