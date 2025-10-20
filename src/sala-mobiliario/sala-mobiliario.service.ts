/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import type { CreateSalaMobiliarioDto } from './dto/create-sala-mobiliario.dto';
import type { UpdateSalaMobiliarioDto } from './dto/update-sala-mobiliario.dto';
import { PrismaService } from 'src/db/prisma.service';
import { TipoMobiliario } from 'generated/prisma';

@Injectable()
export class SalaMobiliarioService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSalaMobiliarioDto: CreateSalaMobiliarioDto) {
    return this.prismaService.salaMobiliario.create({
      data: createSalaMobiliarioDto
    })
  }

  findAll() {
    return this.prismaService.salaMobiliario.findMany()
  }

  findOne(id: string) {
    return this.prismaService.salaMobiliario.findUnique({
      where: {id: id}
    })
  }

  update(id: string, updateSalaMobiliarioDto: UpdateSalaMobiliarioDto) {
    return this.prismaService.salaMobiliario.update({
      where: {id: id},
      data: updateSalaMobiliarioDto
    }
    )
  }

  async updateBySalaId(salaId: string, novosMobiliarios: TipoMobiliario[]) {
    const mobiliariosAtuais = await this.prismaService.salaMobiliario.findMany({
      where: {salaId: salaId},
      select: {tipoMobiliario: true}
    })
    const atuais = mobiliariosAtuais.map(m => m.tipoMobiliario)
    const paraAdicionar = novosMobiliarios.filter(m => !atuais.includes(m))
    const paraRemover = atuais.filter(m => !novosMobiliarios.includes(m))

    await this.prismaService.$transaction([
      ...paraAdicionar.map(tipoMobiliario =>
        this.prismaService.salaMobiliario.create({
          data: {salaId, tipoMobiliario}
        })
      ),
      ...paraRemover.map(tipoMobiliario =>
        this.prismaService.salaMobiliario.deleteMany({
          where: {salaId, tipoMobiliario}
        })
      )
    ])

    return { adicionados: paraAdicionar, removidos: paraRemover}
  }

  remove(id: string) {
    return this.prismaService.salaMobiliario.delete({
      where: {id: id}
    })
  }
}
