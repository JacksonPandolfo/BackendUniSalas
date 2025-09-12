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
        Equipamentos: true
      }
    })
  }

  findOne(id: number) {
    return this.prismaService.sala.findUnique({
      where: {id},
      include: {
        Mobiliarios: true,
        Equipamentos: true
      }
    })
  }

  findBySetor(setorid: number) {
    return this.prismaService.sala.findMany({
      where: {
        bloco: { setorId: setorid }
      },
      include: {
        Mobiliarios: true,
        Equipamentos: true,
        bloco: true
      }
    })
  }

  update(id: number, updateSalaDto: UpdateSalaDto) {
    return this.prismaService.sala.update({
      where: {id},
      data: updateSalaDto
    })
  }

  remove(id: number) {
    return this.prismaService.sala.delete({
      where: {id}
    })
  }
}
