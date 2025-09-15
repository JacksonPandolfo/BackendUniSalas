/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlocoService } from './bloco.service';
import type { CreateBlocoDto } from './dto/create-bloco.dto';
import type { UpdateBlocoDto } from './dto/update-bloco.dto';

@Controller('bloco')
export class BlocoController {
  constructor(private readonly blocoService: BlocoService) {}

  @Post()
  create(@Body() createBlocoDto: CreateBlocoDto) {
    return this.blocoService.create(createBlocoDto);
  }

  @Get()
  findAll() {
    return this.blocoService.findAll();
  }

  @Get(':id')
  findMany(@Param('id') id: string) {
    return this.blocoService.findMany(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlocoDto: UpdateBlocoDto) {
    return this.blocoService.update(id, updateBlocoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blocoService.remove(id);
  }
}

