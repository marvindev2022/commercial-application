import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Admin } from '@domain/Admin/admin';

@Injectable()
export class PrismaAdminRepository {
  constructor(private prismaService: PrismaService) {}

  async create(admin: Admin): Promise<string> {
    try {
      if (admin instanceof Error) {
        throw new BadRequestException(admin.message, {
          cause: admin,
          description: admin.stack,
        });
      }

      const newAdmin = new Admin(admin.props);

      const adminExists = await this.prismaService.admin.findFirst({
        where: {
          email: newAdmin.props.email,
        },
      });

      if (adminExists) {
        throw new BadRequestException('Admin já cadastrado');
      }

      const id = await this.prismaService.admin.create({
        data: {
          name: newAdmin.props.name,
          email: newAdmin.props.email,
          password: newAdmin.props.password,
        },
        select: {
          id: true,
        },
      });

      return id.id;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findAdminById(id: string): Promise<Admin> {
    try {
      const admin = await this.prismaService.admin.findFirst({
        where: {
          id: id,
        },
      });

      if (!admin) {
        throw new NotFoundException('Admin não encontrado');
      }

      return new Admin(admin);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findAdminByEmail(email: string): Promise<Admin> {
    try {
      const admin = await this.prismaService.admin.findFirst({
        where: {
          email: email,
        },
      });

      if (!admin) {
        throw new NotFoundException('Admin não encontrado');
      }

      return new Admin(admin);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateAdmin(adminId: string, admin: Admin): Promise<Admin> {
    try {
      const { ...adminProps } = admin;
      const updatedAdmin = await this.prismaService.admin.update({
        where: {
          id: adminId,
        },
        data: {
          ...adminProps.props,
        },
      });

      return new Admin(updatedAdmin);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteAdmin(adminId: string): Promise<string> {
    try {
      await this.prismaService.admin.delete({
        where: {
          id: adminId,
        },
      });

      return 'Admin deletado com sucesso';
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
