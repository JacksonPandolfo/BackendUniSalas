/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import express from 'express'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('senha') senha: string,
        @Res({ passthrough: true }) res: express.Response
    ) {
        const { access_token } = await this.authService.login(email, senha)

        res.cookie('jwt', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        })

        return { message: "Login realizado com sucesso"}
    }
}
