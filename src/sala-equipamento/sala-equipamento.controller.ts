/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaEquipamentoService } from './sala-equipamento.service';
import type { CreateSalaEquipamentoDto } from './dto/create-sala-equipamento.dto';
import type { UpdateSalaEquipamentoDto } from './dto/update-sala-equipamento.dto';
import type { UpdateEquipamentoBySalaIdDto } from './dto/update-sala-equipamento.dto';

@Controller('sala-equipamento')
export class SalaEquipamentoController {
  constructor(private readonly salaEquipamentoService: SalaEquipamentoService) {}

  @Post()
  create(@Body() createSalaEquipamentoDto: CreateSalaEquipamentoDto) {
    return this.salaEquipamentoService.create(createSalaEquipamentoDto);
  }

  @Get()
  findAll() {
    return this.salaEquipamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaEquipamentoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaEquipamentoDto: UpdateSalaEquipamentoDto) {
    return this.salaEquipamentoService.update(id, updateSalaEquipamentoDto);
  }

  @Patch('bySalaId/:salaId')
  updateBySalaId(@Param('salaId') id: string, @Body() UpdateEquipamentoBySalaIdDto: UpdateEquipamentoBySalaIdDto) {
    return this.salaEquipamentoService.updateBySalaId(id, UpdateEquipamentoBySalaIdDto.tipoEquipamento);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaEquipamentoService.remove(id);
  }
}
