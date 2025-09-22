import { Cargo } from 'generated/prisma';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: Cargo[];
}
