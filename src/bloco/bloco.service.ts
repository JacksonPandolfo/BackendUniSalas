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

  findOne(id: number) {
    return this.prismaService.bloco.findUnique({
      where: {id}
    })
  }

  update(id: number, updateBlocoDto: UpdateBlocoDto) {
    return this.prismaService.bloco.update({
      where: {id},
      data: updateBlocoDto
    })
  }

  remove(id: number) {
    return this.prismaService.bloco.delete({
      where: {id},
    })
  }
}
