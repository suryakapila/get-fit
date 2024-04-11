import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { FitZoneService } from './fitzone.service';

@Controller('/fitZone')
export class FitZoneController {
  constructor(private readonly fitZoneService: FitZoneService) {}

  @Get('/workout/:type')
  async getWorkoutsByZone(
    @Param('type') type: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    try {
      return this.fitZoneService.getWorkoutsByZone(type, offset, limit);
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

  @Get('/target')
  async getTargetWorkouts(
    @Query('equipment') equipment: string,
    @Query('muscle') muscle: string,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ) {
    try {
      return this.fitZoneService.getTargetWorkouts(
        equipment,
        muscle,
        offset,
        limit,
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

  @Get('/equipments')
  async getEquipments() {
    try {
      return this.fitZoneService.getEquipments();
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
