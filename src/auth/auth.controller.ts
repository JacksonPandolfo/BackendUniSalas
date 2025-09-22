/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usuarioService: UsuarioService,
    ) {}

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('senha') senha: string,
    ) {
        return this.authService.login(email, senha)
    }
}
