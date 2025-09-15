/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class SalaService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSalaDto: CreateSalaDto) {
    return this.prismaService.sala.create({
      data: createSalaDto
    })
  }

  findAll() {
    return this.prismaService.sala.findMany({
      include: {
        Mobiliarios: true,
        Equipamentos: true,
        bloco: {
          select: {
            numero: true,
            setor: {
              select: {
                nome: true}}}}
      }
    })
  }

  findOne(id: string) {
    return this.prismaService.sala.findUnique({
      where: {id},
      include: {
        Mobiliarios: true,
        Equipamentos: true
      }
    })
  }

  findBySetor(setorId: string) {
    return this.prismaService.sala.findMany({
      where: {
        bloco: { setorId: setorId }
      },
      include: {
        Mobiliarios: true,
        Equipamentos: true,
        bloco: true
      }
    })
  }

  findByBloco(blocoId: string) {
    return this.prismaService.sala.findMany({
      where: {
        blocoId: blocoId
      },
      include: {
        Mobiliarios: true,
        Equipamentos: true,
        bloco: true
      }
    })
  }

  update(id: string, updateSalaDto: UpdateSalaDto) {
    return this.prismaService.sala.update({
      where: {id},
      data: updateSalaDto
    })
  }

  remove(id: string) {
    return this.prismaService.sala.delete({
      where: {id}
    })
  }
}
