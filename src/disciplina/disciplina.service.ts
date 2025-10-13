/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class DisciplinaService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDisciplinaDto: CreateDisciplinaDto) {
    return this.prismaService.disciplina.create({
      data: createDisciplinaDto
    });
  }

  findAll() {
    return this.prismaService.disciplina.findMany()
  }

  findOne(id: string) {
    return this.prismaService.disciplina.findUnique({
      where: {id: id}
    });
  }

  update(id: string, updateDisciplinaDto: UpdateDisciplinaDto) {
    return this.prismaService.disciplina.update({
      where: {id: id},
      data: updateDisciplinaDto
    });
  }

  remove(id: string) {
    return this.prismaService.disciplina.delete({
      where: {id: id}
    })
  }
}
