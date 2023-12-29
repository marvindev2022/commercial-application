import { AdminService } from '@infra/http/services/admin/admin.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Post()
  async createAdmin(@Body() createAdminDTO: any) {
    const admin: any = await this.adminService.create(createAdminDTO);
    if (admin instanceof Error) {
      return admin.message;
    }
    return admin;
  }

  @Get('find/:id')
  async findAdmin(@Param('id') id: string) {
    const admin = await this.adminService.getAdminById(id);
    return admin;
  }

  @Get('find/email')
  async findAdminByEmail(@Param('email') email: string) {
    const admin = await this.adminService.getAdminByEmail(email);
    return admin;
  }

  @Get('find/all')
  async findAllAdmins() {
    const admins = await this.adminService.getAllAdmins();
    return admins;
  }

  @Put('update/:id')
  async updateAdmin(@Param('id') id: string, @Body() updateAdminDTO: any) {
    const admin = await this.adminService.updateAdmin(id, updateAdminDTO);
    return admin;
  }

  @Delete('delete')
  async deleteAdmin(@Param('id') id: string) {
    await this.adminService.deleteAdmin(id);
    return 'Admin deleted successfully';
  }
}
