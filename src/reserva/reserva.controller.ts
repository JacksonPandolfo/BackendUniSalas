/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import type { CreateReservaDto } from './dto/create-reserva.dto';
import type { UpdateReservaDto } from './dto/update-reserva.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Cargo } from 'generated/prisma';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('reserva')
@UseGuards(JwtAuthGuard)
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    console.log(createReservaDto)
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  findUnique(@Param('id') id: string) {
    return this.reservaService.findUnique(id);
  }

  @Get('bySala/:id')
  findManyBySala(@Param('id') salaId: string) {
    return this.reservaService.findManyBySala(salaId);
  }

  @Get('byDate/:salaId/:dataInicio/:dataFim')
  findWithDate(@Param('salaId') salaId: string, @Param('dataInicio') dataInicio: string, @Param('dataFim') dataFim: string) {
    const inicioUTC = new Date(`${dataInicio}T00:00:00`);
    const fimUTC = new Date(`${dataFim}T23:59:59`);

    return this.reservaService.findWithDate(
      salaId, inicioUTC, fimUTC
    )
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(id, updateReservaDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)   // Chama guard de cargos para a validação
  @Roles(Cargo.ADMINISTRADOR) // só aceita o delete se for administrador
  remove(@Param('id') id: string) {
    return this.reservaService.remove(id);
  }
}

