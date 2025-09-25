/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsuarioService } from './usuario.service';
import type { CreateUsuarioDto } from './dto/create-usuario.dto';
import type { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Request } from 'express';
import { JwtPayload } from 'src/types/jwt-payload.interface';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Cargo } from 'generated/prisma';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request & { usuario: JwtPayload }) {
    const { sub, email, roles } = req.usuario
    return { id: sub, email, roles } // Esse "user" veio do payload do JWT (JwtStrategy)
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @UseGuards(RolesGuard)   // Chama guard de cargos para a validação
  @Roles(Cargo.ADMINISTRADOR) // só aceita o delete se for administrador
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}
