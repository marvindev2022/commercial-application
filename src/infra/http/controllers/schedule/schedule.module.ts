import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ValidateToken } from '@infra/http/middleware/validateToken';
import { ScheduleService } from '@infra/http/services/schedule/schedule.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleDatabaseModule } from '@infra/database/prisma/repositories/schedule/prisma-schedule-database.module';

@Module({
  imports: [ScheduleDatabaseModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
})
export class ScheduleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateToken)
      .forRoutes(
        { path: '/schedule/*', method: RequestMethod.POST },
        { path: '/schedule/*', method: RequestMethod.PUT },
        { path: '/schedule/*', method: RequestMethod.PATCH },
        { path: '/schedule/*', method: RequestMethod.DELETE },
        { path: '/schedule/*', method: RequestMethod.GET },
      );
  }
}
