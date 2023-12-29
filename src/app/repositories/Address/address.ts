import { Address } from '@domain/Address/Addres';

export abstract class AddressRepository {
  abstract createAddress(address: Address): Promise<string>;

  abstract findAddressById(addressId: string): Promise<Address>;

  abstract updateAddress(address: Address): Promise<void>;

  abstract deleteAddress(addressId: string): Promise<void>;
}
