import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AdminRepository } from '@app/repositories/admin/admin';
import { PrismaAdminRepository } from './prisma-admin-respoitory';

@Module({
  providers: [
    PrismaService,
    {
      provide: AdminRepository,
      useClass: PrismaAdminRepository,
    },
  ],
  exports: [
    {
      provide: AdminRepository,
      useClass: PrismaAdminRepository,
    },
  ],
})
export class AdminDatabaseModule {}
