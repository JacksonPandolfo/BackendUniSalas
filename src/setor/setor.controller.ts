/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SetorService } from './setor.service';
import type { CreateSetorDto } from './dto/create-setor.dto';
import type { UpdateSetorDto } from './dto/update-setor.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Cargo } from 'generated/prisma';

@Controller('setores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  @Post()
  create(@Body() createSetorDto: CreateSetorDto) {
    return this.setorService.create(createSetorDto);
  }

  @Get()
  findAll() {
    return this.setorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setorService.findOne(id);
  }

  @Roles(Cargo.ADMINISTRADOR, Cargo.ATENDIMENTO)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSetorDto: UpdateSetorDto) {
    return this.setorService.update(id, updateSetorDto);
  }

  @Delete(':id')
  @Roles(Cargo.ADMINISTRADOR)
  remove(@Param('id') id: string) {
    return this.setorService.remove(id);
  }
}