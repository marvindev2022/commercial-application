import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { MessageService } from '@infra/http/services/chat/message.service';
import { FirebaseMessagesModule } from '@infra/database/prisma/repositories/message/prisma-message-database.module';
import { MessagesController } from '@infra/http/controllers/chat/message.controller';
import { SocketModule } from '@infra/Socket/socket.module';
import { ValidateToken } from '@infra/http/middleware/validateToken';
@Module({
  imports: [FirebaseMessagesModule, SocketModule],
  controllers: [MessagesController],
  providers: [MessageService, PrismaService],
})
export class MessagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateToken)
      .forRoutes(
        { path: '/message/*', method: RequestMethod.POST },
        { path: '/message/*', method: RequestMethod.PUT },
        { path: '/message/*', method: RequestMethod.GET },
        { path: '/message/*', method: RequestMethod.DELETE },
      );
  }
}
