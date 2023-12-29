import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { UsersDatabaseModule } from '@infra/database/prisma/repositories/user/prisma-user-database.module';
import { FileService } from '@infra/http/services/image/files.service';

@Module({
  imports: [UsersDatabaseModule],
  controllers: [ImagesController],
  providers: [FileService],
})
export class ImagesModule {}
