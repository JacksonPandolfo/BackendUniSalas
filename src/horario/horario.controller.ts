/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HorarioService } from './horario.service';
import type { CreateHorarioDto } from './dto/create-horario.dto';
import type { UpdateHorarioDto } from './dto/update-horario.dto';
import { Cargo } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('horario')
@UseGuards(JwtAuthGuard)
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post()
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horarioService.create(createHorarioDto);
  }

  @Get()
  findAll() {
    return this.horarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horarioService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)        // Chama guard de cargos para a validação
  @Roles(Cargo.ADMINISTRADOR)   // só aceita o delete se for administrador
  update(@Param('id') id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
    return this.horarioService.update(id, updateHorarioDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)        // Chama guard de cargos para a validação
  @Roles(Cargo.ADMINISTRADOR)   // só aceita o delete se for administrador
  remove(@Param('id') id: string) {
    return this.horarioService.remove(id);
  }
}
