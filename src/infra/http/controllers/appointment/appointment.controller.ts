import {
  AppointmentService,
  RegisterAppointmentDTO,
} from '@infra/http/services/appoiment/appoiment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Appointment } from '@prisma/client';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(@Body() appointment: RegisterAppointmentDTO) {
    return await this.appointmentService.create(appointment);
  }

  @Get(':id/find')
  async findAppointmentById(@Param('id') id: string) {
    return await this.appointmentService.getAppointmentById(id);
  }

  @Get(':userId/user')
  async findAppointmentByUserId(@Param('userId') userId: string) {
    return await this.appointmentService.getAppointmentByUserId(userId);
  }

  @Get('all/')
  async findAppointmentAll() {
    return await this.appointmentService.getAppointmentsAll();
  }

  @Put(':id')
  async updateAppointment(
    @Param('id') appointmentId: string,
    @Body() appointment: Appointment,
  ) {
    return await this.appointmentService.updateAppointment(
      appointmentId,
      appointment as any,
    );
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') appointmentId: string) {
    return await this.appointmentService.deleteAppointment(appointmentId);
  }
}
