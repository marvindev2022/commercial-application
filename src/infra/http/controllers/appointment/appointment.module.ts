import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ValidateToken } from '@infra/http/middleware/validateToken';
import { AppointmentService } from '@infra/http/services/appoiment/appoiment.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentDatabaseModule } from '@infra/database/prisma/repositories/appointment/prisma-appointment-database.module';

@Module({
  imports: [AppointmentDatabaseModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, PrismaService],
})
export class AppointmentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateToken)
      .exclude(
        { path: 'appointment', method: RequestMethod.GET },
        { path: 'appointment', method: RequestMethod.POST },
      )
      .forRoutes(AppointmentController);
  }
}
