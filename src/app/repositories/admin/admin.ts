import { Admin } from '@domain/Admin/admin';

export abstract class AdminRepository {
  abstract create(admin: Admin): Promise<string>;

  abstract findAdminById(id: string): Promise<Admin>;

  abstract findAdminByEmail(email: string): Promise<Admin>;

  abstract findAllAdmins(): Promise<Admin[]>;

  abstract updateAdmin(adminId: string, admin: Admin): Promise<Admin>;

  abstract deleteAdmin(adminId: string): Promise<string>;
}
