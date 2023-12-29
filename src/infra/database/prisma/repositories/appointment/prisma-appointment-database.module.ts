import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AppointmentRepository } from '@app/repositories/Appointment/appointment';
import { PrismaAppointmentRepository } from './prisma-appointment-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository,
    },
  ],
  exports: [
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository,
    },
  ],
})
export class AppointmentDatabaseModule {}
