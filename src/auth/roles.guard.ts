import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Cargo } from 'generated/prisma';
import { JwtPayload } from 'src/types/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Cargo[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // se a rota não exige roles, libera
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();

    const usuario = request.user as JwtPayload;

    if (!usuario || !usuario.roles) {
      return false;
    }
    return requiredRoles.some((role) => usuario.roles.includes(role));
  }
}
