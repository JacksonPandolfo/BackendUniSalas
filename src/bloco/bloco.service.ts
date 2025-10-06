/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBlocoDto } from './dto/create-bloco.dto';
import { UpdateBlocoDto } from './dto/update-bloco.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class BlocoService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBlocoDto: CreateBlocoDto) {
    return this.prismaService.bloco.create({
      data: createBlocoDto
    })
  }

  findAll() {
    return this.prismaService.bloco.findMany();
  }

  findUnique(id: string) {
    return this.prismaService.bloco.findUnique({
      where: {id: id}
    })
  }

  findManyBySetor(id: string) {
    return this.prismaService.bloco.findMany({
      where: {setorId: id},
      include: {
        salas: true
      }
    })
  }

  update(id: string, updateBlocoDto: UpdateBlocoDto) {
    console.log(updateBlocoDto)
    return this.prismaService.bloco.update({
      where: {id},
      data: updateBlocoDto
    })
  }

  remove(id: string) {
    return this.prismaService.bloco.delete({
      where: {id},
    })
  }
}
