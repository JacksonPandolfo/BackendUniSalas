/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, pass: string): Promise<{access_token: string}>{
    const usuario = await this.usuarioService.loginUserByEmail(email)

    if(!usuario){
        throw new UnauthorizedException("Usuário não encontrado")
    }

    const senhaValida = await bcrypt.compare(pass, usuario.senha)
    if(!senhaValida){
      throw new UnauthorizedException("Credenciais inválidas");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...result } = usuario
    const payload = {sub: usuario.id, email: usuario.email, roles: usuario.cargos}
    const token = await this.jwtService.signAsync(payload)
    return {
        access_token: token
    }
  }
}
