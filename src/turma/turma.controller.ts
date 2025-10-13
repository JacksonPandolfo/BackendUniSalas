/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TurmaService } from './turma.service';
import type { CreateTurmaDto } from './dto/create-turma.dto';
import type { UpdateTurmaDto } from './dto/update-turma.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Cargo } from 'generated/prisma';
import { Roles } from 'src/auth/roles.decorator';

@Controller('turma')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TurmaController {
  constructor(private readonly turmaService: TurmaService) {}

  @Post()
  create(@Body() createTurmaDto: CreateTurmaDto) {
    return this.turmaService.create(createTurmaDto);
  }

  @Get()
  findAll() {
    return this.turmaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turmaService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)   // Chama guard de cargos para a validação
  @Roles(Cargo.ADMINISTRADOR) // só aceita o delete se for administrador
  update(@Param('id') id: string, @Body() updateTurmaDto: UpdateTurmaDto) {
    return this.turmaService.update(id, updateTurmaDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)   // Chama guard de cargos para a validação
  @Roles(Cargo.ADMINISTRADOR) // só aceita o delete se for administrador
  remove(@Param('id') id: string) {
    return this.turmaService.remove(id);
  }
}
