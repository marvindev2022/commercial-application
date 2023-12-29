import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ScheduleRepository } from '@app/repositories/Schedule/schedule';
import { PrismaScheduleRepository } from './prisma-schedule.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ScheduleRepository,
      useClass: PrismaScheduleRepository,
    },
  ],
  exports: [
    {
      provide: ScheduleRepository,
      useClass: PrismaScheduleRepository,
    },
  ],
})
export class ScheduleDatabaseModule {}
