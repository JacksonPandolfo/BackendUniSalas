import { Injectable } from '@nestjs/common';
import { CreateSetorDto } from './dto/create-setor.dto';
import { UpdateSetorDto } from './dto/update-setor.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class SetorService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSetorDto: CreateSetorDto) {
    return this.prismaService.setor.create({
      data: createSetorDto,
    });
  }

  findAll() {
    return this.prismaService.setor.findMany();
  }

  findOne(id: string) {
    return this.prismaService.setor.findUnique({
      where: { id },
    });
  }

  update(id: string, updateSetorDto: UpdateSetorDto) {
    return this.prismaService.setor.update({
      where: { id },
      data: updateSetorDto,
    });
  }

  remove(id: string) {
    return this.prismaService.setor.delete({
      where: { id },
    });
  }
}
