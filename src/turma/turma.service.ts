/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class TurmaService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTurmaDto: CreateTurmaDto) {
    return this.prismaService.turma.create({
      data: createTurmaDto
    });
  }

  findAll() {
    return this.prismaService.turma.findMany();
  }

  findOne(id: string) {
    return this.prismaService.turma.findUnique({
      where: {id: id},
    });
  }

  findManyByMinistrante(id: string){
    return this.prismaService.turma.findMany({
      where: {ministranteId: id},
      include: {
        ministrante: true,
        disciplina: true,
        curso: true
      }
    })
  }

  update(id: string, updateTurmaDto: UpdateTurmaDto) {
    return this.prismaService.turma.update({
      where: {id: id},
      data: updateTurmaDto
    });
  }

  remove(id: string) {
    return this.prismaService.turma.delete({
      where: {id: id}
    });
  }
}
