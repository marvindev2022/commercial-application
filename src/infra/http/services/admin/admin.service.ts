import { AdminRepository } from '@app/repositories/admin/admin';
import { Admin } from '@domain/Admin/admin';
import { BadRequestException, Injectable } from '@nestjs/common';

export interface RegisterAdminDTO {
  email: string;
  password: string;
  name: string;
}

interface EditAdminDTO extends RegisterAdminDTO {
  id: string;
}

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  async create(request: RegisterAdminDTO): Promise<string> {
    const newAdmin = new Admin(request);
    try {
      const admin = await this.adminRepository.create(newAdmin);
      if (!admin) {
        throw new BadRequestException('Erro ao criar o admin');
      }

      return admin;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  async getAdminById(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findAdminById(id);
    if (!admin) {
      throw new BadRequestException('Error getting admin');
    }

    return admin;
  }

  async getAdminByEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepository.findAdminByEmail(email);
    if (!admin) {
      throw new BadRequestException('Error getting admin');
    }

    return admin;
  }

  async getAllAdmins(): Promise<Admin[]> {
    const admins = await this.adminRepository.findAllAdmins();
    if (!admins) {
      throw new BadRequestException('Error getting admins');
    }

    return admins;
  }

  async updateAdmin(id: string, request: EditAdminDTO): Promise<Admin> {
    const newAdmin = new Admin(request);
    const admin = await this.adminRepository.updateAdmin(id, newAdmin);
    if (!admin) {
      throw new BadRequestException('Error updating admin');
    }

    return admin;
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.adminRepository.deleteAdmin(id);
  }
}
