export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  birthDate: Date;
  photo?: string;
  address?: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    userId?: string;
  };
}
