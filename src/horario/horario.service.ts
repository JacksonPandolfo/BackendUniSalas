/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class HorarioService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createHorarioDto: CreateHorarioDto) {
    return this.prismaService.horario.create({
      data: createHorarioDto
    });
  }

  findAll() {
    return this.prismaService.horario.findMany();
  }

  findOne(id: string) {
    return this.prismaService.horario.findUnique({
      where: {id: id}
    });
  }

  update(id: string, updateHorarioDto: UpdateHorarioDto) {
    return this.prismaService.horario.update({
      where: {id: id},
      data: updateHorarioDto
    });
  }

  remove(id: string) {
    return this.prismaService.horario.delete({
      where: {id: id}
    });
  }
}
