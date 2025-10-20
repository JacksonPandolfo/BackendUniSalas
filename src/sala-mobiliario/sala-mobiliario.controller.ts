/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalaMobiliarioService } from './sala-mobiliario.service';
import type { CreateSalaMobiliarioDto } from './dto/create-sala-mobiliario.dto';
import type { UpdateSalaMobiliarioDto } from './dto/update-sala-mobiliario.dto';
import type { UpdateMobiliarioBySalaIdDto } from './dto/update-sala-mobiliario.dto';

@Controller('sala-mobiliario')
export class SalaMobiliarioController {
  constructor(private readonly salaMobiliarioService: SalaMobiliarioService) {}

  @Post()
  create(@Body() createSalaMobiliarioDto: CreateSalaMobiliarioDto) {
    return this.salaMobiliarioService.create(createSalaMobiliarioDto);
  }

  @Get()
  findAll() {
    return this.salaMobiliarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaMobiliarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalaMobiliarioDto: UpdateSalaMobiliarioDto) {
    return this.salaMobiliarioService.update(id, updateSalaMobiliarioDto);
  }

  @Patch('bySalaId/:salaId')
  updateBySalaId(@Param('salaId') salaId: string, @Body() UpdateMobiliarioBySalaIdDto: UpdateMobiliarioBySalaIdDto) {
    return this.salaMobiliarioService.updateBySalaId(salaId, UpdateMobiliarioBySalaIdDto.tipoMobiliario);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaMobiliarioService.remove(id);
  }
}
