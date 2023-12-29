import { AdminDatabaseModule } from '@infra/database/prisma/repositories/admin/prisma-admin-database.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from '@infra/http/services/admin/admin.service';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ValidateToken } from '@infra/http/middleware/validateToken';

@Module({
  imports: [AdminDatabaseModule],
  controllers: [AdminController],
  providers: [AdminService, PrismaService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateToken)
      .exclude({ path: '/admin/*', method: RequestMethod.POST })
      .forRoutes(
        { path: '/admin/*', method: RequestMethod.PUT },
        { path: '/admin/*', method: RequestMethod.PATCH },
        { path: '/admin/*', method: RequestMethod.DELETE },
        { path: '/admin/*', method: RequestMethod.GET },
      );
  }
}
