/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SalaService } from './sala.service';
import type { CreateSalaDto } from './dto/create-sala.dto';
import type { UpdateSalaDto } from './dto/update-sala.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Cargo } from 'generated/prisma';
import { Roles } from 'src/auth/roles.decorator';

@Controller('sala')
@UseGuards(JwtAuthGuard)
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  create(@Body() createSalaDto: CreateSalaDto) {
    return this.salaService.create(createSalaDto);
  }

  @Get()
  findAll() {
    return this.salaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaService.findOne(id);
  }

  @Get('bySetor/:id')
  findBySetor(@Param('id') id: string) {
    return this.salaService.findBySetor(id);
  }

  @Get('byBloco/:id')
  findByBloco(@Param('id') id: string) {
    return this.salaService.findByBloco(id);
  }

  @Get('bySolicitacao/:id')
  async findBySolicitacaoReserva(@Param('id') id: string){
    const res = await this.salaService.findBySolicitacaoReserva(id)
    console.log(res)
    return res
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaDto: UpdateSalaDto) {
    return this.salaService.update(id, updateSalaDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)   // Chama guard de cargos para a validação
  @Roles(Cargo.ADMINISTRADOR) // só aceita o delete se for administrador
  remove(@Param('id') id: string) {
    return this.salaService.remove(id);
  }
}
