/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ReservaService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createReservaDto: CreateReservaDto) {
    return this.prismaService.reserva.create({
      data: createReservaDto
    })
  }

  findAll() {
    return this.prismaService.reserva.findMany();
  }

  findMany(id: string) {
    return this.prismaService.reserva.findMany({
      where: {salaId: id},
      include: {
        sala: true,
        horario: true,
        turma: {select:
          {id: true, nome: true, cursoId: true, disciplinaId: true,
            curso: {select: {id: true, nome: true}},
            disciplina: {select: {id: true, nome: true}}
          }},
        ministrante: { select: {id: true, nome: true}}
      }
    })
  }

  findWithDate(salaId: string, dataInicio: Date, dataFim: Date) {
    const inicioUTC = new Date(Date.UTC(
      dataInicio.getFullYear(),
      dataInicio.getMonth(),
      dataInicio.getDate()
    ));
    const fimUTC = new Date(Date.UTC(
      dataFim.getFullYear(),
      dataFim.getMonth(),
      dataFim.getDate()
    ));

    return this.prismaService.reserva.findMany({
      where: {
        salaId,
        AND:[
          { dataInicio: { gte: inicioUTC }},
          { dataFim: { lte: fimUTC }}
        ]
      },
      include: {
        sala: true,
        horario: true,
        turma: {select:
          {id: true, nome: true, cursoId: true, disciplinaId: true,
            curso: {select: {id: true, nome: true}},
            disciplina: {select: {id: true, nome: true}}
          }},
        ministrante: { select: {id: true, nome: true}}
      }
    })
  }

  update(id: string, updateReservaDto: UpdateReservaDto) {
    return this.prismaService.reserva.update({
      where: {id},
      data: updateReservaDto
    })
  }

  remove(id: string) {
    return this.prismaService.reserva.delete({
      where: {id}
    })
  }
}

