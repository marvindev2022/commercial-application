import { Module } from '@nestjs/common';
import { AddressRepository } from '@app/repositories/Address/address';
import { PrismaAddressRepository } from './prisma-address-repository';

@Module({
  imports: [PrismaAddressModule],
  providers: [
    { provide: AddressRepository, useClass: PrismaAddressRepository },
  ],
  exports: [{ provide: AddressRepository, useClass: PrismaAddressRepository }],
})
export class PrismaAddressModule {}
