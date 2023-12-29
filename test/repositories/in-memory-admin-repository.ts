import { Admin } from '@domain/Admin/admin';

export class InMemoryAdminRepositry {
  public admins: any[] = [];

  async create(admin: Admin): Promise<string> {
    this.admins.push(admin);
    return 'valid_id';
  }

  async findAdminById(id: string): Promise<any> {
    const admin = this.admins.find((admin) => admin.id === id);
    if (!admin) {
      throw new Error('Admin não encontrado');
    }

    return admin;
  }

  async findAdminByEmail(email: string): Promise<any> {
    const admin = this.admins.find((admin) => admin.email === email);
    if (!admin) {
      throw new Error('Admin não encontrado');
    }

    return admin;
  }

  async findAllAdmins(): Promise<any[]> {
    return this.admins;
  }

  async updateAdmin(adminId: string, admin: any): Promise<any> {
    const adminIndex = this.admins.findIndex((admin) => admin.id === adminId);
    if (adminIndex < 0) {
      throw new Error('Admin não encontrado');
    }

    this.admins[adminIndex] = admin;

    return admin;
  }

  async deleteAdmin(adminId: string): Promise<string> {
    const adminIndex = this.admins.findIndex((admin) => admin.id === adminId);
    if (adminIndex < 0) {
      throw new Error('Admin não encontrado');
    }

    this.admins.splice(adminIndex, 1);

    return adminId;
  }
}
