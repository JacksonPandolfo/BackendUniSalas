/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import type { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import type { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Cargo } from 'generated/prisma';

@Controller('disciplina')
@UseGuards(JwtAuthGuard)
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Post()
  create(@Body() createDisciplinaDto: CreateDisciplinaDto) {
    return this.disciplinaService.create(createDisciplinaDto);
  }

  @Get()
  findAll() {
    return this.disciplinaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplinaService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)   // Chama guard de cargos para a validação
  @Roles(Cargo.ADMINISTRADOR) // só aceita o delete se for administrador
  update(@Param('id') id: string, @Body() updateDisciplinaDto: UpdateDisciplinaDto) {
    return this.disciplinaService.update(id, updateDisciplinaDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)        // Chama guard de cargos para a validação
  @Roles(Cargo.ADMINISTRADOR)   // só aceita o delete se for administrador
  remove(@Param('id') id: string) {
    return this.disciplinaService.remove(id);
  }
}
