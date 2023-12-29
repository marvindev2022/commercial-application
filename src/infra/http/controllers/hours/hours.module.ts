import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
  } from '@nestjs/common';

import { HoursController } from './hours.controller';
import { HoursDatabaseModule } from '@infra/database/prisma/repositories/hours/prisma-hours-database.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ValidateToken } from '@infra/http/middleware/validateToken';
import { HoursService } from '@infra/http/services/hours/hours.service';

@Module({
  imports: [HoursDatabaseModule],
  controllers: [HoursController],
  providers: [HoursService, PrismaService],
})

export class HoursModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateToken)
      .forRoutes(
        { path: '/hours/*', method: RequestMethod.POST },
        { path: '/hours/*', method: RequestMethod.PUT },
        { path: '/hours/*', method: RequestMethod.PATCH },
        { path: '/hours/*', method: RequestMethod.DELETE },
        { path: '/hours/*', method: RequestMethod.GET },
      );
  }
}