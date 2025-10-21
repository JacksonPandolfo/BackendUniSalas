import { Cargo } from 'generated/prisma';

export interface UserDto {
  sub: string;
  nome: string;
  sobrenome: string;
  email: string;
  roles: Cargo[];
}
