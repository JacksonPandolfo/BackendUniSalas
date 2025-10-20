/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import type { CreateSalaEquipamentoDto } from './dto/create-sala-equipamento.dto';
import type { UpdateSalaEquipamentoDto } from './dto/update-sala-equipamento.dto';
import { PrismaService } from 'src/db/prisma.service';
import { TipoEquipamento } from 'generated/prisma';

@Injectable()
export class SalaEquipamentoService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSalaEquipamentoDto: CreateSalaEquipamentoDto) {
    return this.prismaService.salaEquipamento.create({
      data: createSalaEquipamentoDto
    })
  }

  findAll() {
    return this.prismaService.salaEquipamento.findMany()
  }

  findOne(id: string) {
    return this.prismaService.salaEquipamento.findUnique({
      where: {id: id}
    })
  }

  update(id: string, updateSalaEquipamentoDto: UpdateSalaEquipamentoDto) {
    return this.prismaService.salaEquipamento.update({
      where: {id: id},
      data: updateSalaEquipamentoDto
    })
  }

  async updateBySalaId(salaId: string, novosEquipamentos: TipoEquipamento[]) {
    const equipamentosAtuais = await this.prismaService.salaEquipamento.findMany({
      where: {salaId: salaId}
    })
    const atuais = equipamentosAtuais.map(e => e.tipoEquipamento)
    const paraAdicionar = novosEquipamentos.filter(e => !atuais.includes(e))
    const paraRemover = atuais.filter(e => !novosEquipamentos.includes(e))

    await this.prismaService.$transaction([
      ...paraAdicionar.map(tipoEquipamento =>
        this.prismaService.salaEquipamento.create({
          data: {salaId, tipoEquipamento}
        })
      ),
      ...paraRemover.map(tipoEquipamento =>
        this.prismaService.salaEquipamento.deleteMany({
          where: {salaId, tipoEquipamento}
        })
      )
    ])

    return {adicionados: paraAdicionar, removidos: paraRemover}
  }

  remove(id: string) {
    return this.prismaService.salaEquipamento.delete({
      where: {id: id}
    })
  }
}
