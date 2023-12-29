import { Address } from '@domain/Address/Addres';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AddressRepository } from '@app/repositories/Address/address';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private prismaService: PrismaService) {}

  async createAddress(address: Address): Promise<string> {
    if (address instanceof Error) {
      throw new BadRequestException(address.message, {
        cause: address,
        description: address.stack,
      });
    }

    const { ...addressProps } = address.props;

    const { id } = await this.prismaService.address.create({
      data: {
        ...addressProps,
        userId: addressProps.userId as string,
        complement: addressProps.complement as string,
      },
      select: {
        id: true,
      },
    });

    return id;
  }

  async findAddressById(addressId: string): Promise<Address> {
    const address = await this.prismaService.address.findUnique({
      where: {
        id: addressId,
      },
    });
    if (!address) throw new BadRequestException('Endereço não encontrado');
    return new Address(address);
  }

  async updateAddress(address: Address): Promise<void> {
    const { id, ...addressProps } = address.props;
    await this.prismaService.address.update({
      where: {
        id,
      },
      data: {
        ...addressProps,
      },
    });
  }

  async deleteAddress(addressId: string): Promise<void> {
    await this.prismaService.address.delete({
      where: {
        id: addressId,
      },
    });
  }
}
