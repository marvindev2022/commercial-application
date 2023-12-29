import { Module } from '@nestjs/common';
import { UsersDatabaseModule } from './prisma/repositories/user/prisma-user-database.module';
import { FirebaseMessagesModule } from './prisma/repositories/message/prisma-message-database.module';
import { ScheduleDatabaseModule } from './prisma/repositories/schedule/prisma-schedule-database.module';
import { AppointmentDatabaseModule } from './prisma/repositories/appointment/prisma-appointment-database.module';
import { AdminDatabaseModule } from './prisma/repositories/admin/prisma-admin-database.module';
import { HoursDatabaseModule } from './prisma/repositories/hours/prisma-hours-database.module';

@Module({
  imports: [
    UsersDatabaseModule,
    FirebaseMessagesModule,
    ScheduleDatabaseModule,
    AppointmentDatabaseModule,
    AdminDatabaseModule,
    HoursDatabaseModule,
  ],
})
export class DatabaseModule {}
