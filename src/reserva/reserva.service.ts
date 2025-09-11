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

  findOne(id: number) {
    return this.prismaService.reserva.findUnique({
      where: {id}
    })
  }

  findWithDate(salaId: number, dataInicio: Date, dataFim: Date) {
    const inicioUTC = new Date(Date.UTC(
      dataInicio.getUTCFullYear(),
      dataInicio.getUTCMonth(),
      dataInicio.getUTCDate(), 0, 0, 0, 0
    ));

    const fimUTC = new Date(Date.UTC(
      dataFim.getUTCFullYear(),
      dataFim.getUTCMonth(),
      dataFim.getUTCDate(), 23, 59, 59, 999
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
        turma: {select: {id: true, nome: true}},
        ministrante: { select: {id: true, nome: true}}
      }
    })
  }

  update(id: number, updateReservaDto: UpdateReservaDto) {
    return this.prismaService.reserva.update({
      where: {id},
      data: updateReservaDto
    })
  }

  remove(id: number) {
    return this.prismaService.reserva.delete({
      where: {id}
    })
  }
}

