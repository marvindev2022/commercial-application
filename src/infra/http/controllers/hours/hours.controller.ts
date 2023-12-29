import { Hours } from '@domain/Hours/hours';
import { HoursService, RegisterHoursDTO, UpdateHoursDTO } from '@infra/http/services/hours/hours.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
  } from '@nestjs/common';

@Controller('hours')
export class HoursController {
  constructor(private hourService: HoursService) {}
  @Post('create')
  async createHour(@Body() createHourDTO: RegisterHoursDTO) {
    const hour = await this.hourService.create(createHourDTO);

    if (hour instanceof Error) {
      return hour.message;
    }
    return hour;
  }

  @Get(':id/find/')
  async findHour(@Param('id') id: string) {
    return await this.hourService.getHoursById(id);
  }


  @Get('all')
  async findAllHours(@Query('time') time: Date) {
    const hours = await this.hourService.getAllHours();
    return hours;
  }

  @Put('update')
  async updateHour(
    @Param('id') id: string,
    @Body() updateHourDTO: UpdateHoursDTO,
  ) {
    return await this.hourService.updateHours(updateHourDTO, id);
  }

  @Delete('delete')
  async deleteHour(@Param('id') id: string) {
    return await this.hourService.deleteHours(id);
  }
}