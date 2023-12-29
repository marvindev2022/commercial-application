import { FileService } from '@infra/http/services/image/files.service';
import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class ImagesController {
  constructor(private imageService: FileService) {}

  @Post(':id/upload-img')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.imageService.uploadPhoto(id, file);
  }
}
