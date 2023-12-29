import { Module } from '@nestjs/common';
import { UsersModule } from './controllers/users/user.module';
import { MailQueueModule } from './controllers/mail/mail.module';
import { MessagesModule } from './controllers/chat/message.module';
import { ImagesModule } from './controllers/images/images.module';
import { SocketModule } from '@infra/Socket/socket.module';
import { ScheduleModule } from './controllers/schedule/schedule.module';
import { AdminModule } from './controllers/admin/admin..module';
import { AppointmentModule } from './controllers/appointment/appointment.module';
import { HoursModule } from './controllers/hours/hours.module';
@Module({
  imports: [
    UsersModule,
    MailQueueModule,
    ImagesModule,
    MessagesModule,
    SocketModule,
    ScheduleModule,
    AdminModule,
    AppointmentModule,
    HoursModule
  ],
})
export class HttpModule {}
