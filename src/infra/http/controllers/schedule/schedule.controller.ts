import {
  RegisterScheduleDTO,
  ScheduleService,
  UpdateScheduleDTO,
} from '@infra/http/services/schedule/schedule.service';
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

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}
  @Post('create')
  async createSchedule(@Body() createScheduleDTO: RegisterScheduleDTO) {
   const schedule = await this.scheduleService.create(createScheduleDTO);

    if (schedule instanceof Error) {
      return schedule.message;
    }
    
  }

  @Get(':id/find/')
  async findSchedule(@Param('id') id: string) {
   return  await this.scheduleService.getScheduleById(id);
    
  }

  @Get('find')
  async findScheduleByDate(@Query('date') date: Date) {
   return  await this.scheduleService.getScheduleByDate(date);
    
  }

  @Get('all')
  async findAllSchedules(@Query('date') date: Date) {
    const schedules = await this.scheduleService.getAllSchedules(date);
    return schedules;
  }

  @Put('update')
  async updateSchedule(
    @Param('id') id: string,
    @Body() updateScheduleDTO: UpdateScheduleDTO,
  ) {
   return  await this.scheduleService.updateSchedule(
      updateScheduleDTO,
      id,
    );
    
  }

  @Delete('delete')
  async deleteSchedule(@Param('id') id: string) {
    await this.scheduleService.deleteSchedule(id);
    return 'Schedule deleted successfully';
  }
}
