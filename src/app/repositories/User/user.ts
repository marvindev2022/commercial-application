import { User } from '@domain/User/User';
import { EditDTO } from '@infra/http/models/User/edit.dto';
import { FindedDTO } from '@infra/http/models/User/finded.dto';
import { LoginDTO } from '@infra/http/models/User/login.dto';
import { NotFoundException } from '@nestjs/common';

export abstract class UserRepository {
  abstract register(user: User): Promise<string>;

  abstract login(account: LoginDTO): Promise<any | Error>;

  abstract edit(
    userId: string,
    account: EditDTO,
    photoFile?: Express.Multer.File,
  ): Promise<void | Error>;

  abstract findUserById(userId: string): Promise<User>;

  abstract saveImage(id: string, photoUrl: string): Promise<any>;

  abstract updatePassword(
    userId: string,
    newPassword: string,
  ): Promise<User | boolean | Error>;

  abstract findByEmail(email: string): Promise<FindedDTO | NotFoundException>;

  abstract deleteUser(id: string): Promise<void>;
}
