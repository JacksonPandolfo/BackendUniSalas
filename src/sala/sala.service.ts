/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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
        bloco: {include: {
          setor: true
        }},
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

  async findBySolicitacaoReserva(reservaId: string) {
    const reserva = await this.prismaService.reserva.findUnique({
      where: {id: reservaId}
    })

    if(!reserva) throw new NotFoundException('Reserva não encontrada')

    const wherePrincipal: any = {
      capacidade: { gte: reserva.qtdPessoas },
      temAcessibilidade: reserva.acessibilidade === true ? true : undefined,
      bloco: reserva.setorPreferidoId
        ? { setorId: reserva.setorPreferidoId }
        : undefined,
      Reservas: {
        none: {
          statusReserva: { not: 'CANCELADA' },
          AND: [
            { dataInicio: { lte: reserva.dataFim } },
            { dataFim: { gte: reserva.dataInicio } },
            { horaInicial: { lt: reserva.horaFinal } },
            { horaFinal: { gt: reserva.horaInicial } },
          ],
        },
      },
    };

    if (reserva.equipamentos?.length > 0) {
      wherePrincipal.AND ??= [];
      wherePrincipal.AND.push({
        Equipamentos: {
          some: {
            tipoEquipamento: { in: reserva.equipamentos },
          },
        },
      });
    }

    if (reserva.mobiliarios?.length > 0) {
      wherePrincipal.AND ??= [];
      wherePrincipal.AND.push({
        Mobiliarios: {
          some: {
            tipoMobiliario: { in: reserva.mobiliarios },
          },
        },
      });
    }

    let salas = await this.prismaService.sala.findMany({
      where: wherePrincipal,
      include: {
        bloco: {
          select: {
            numero: true,
            setor: { select: { id: true, nome: true, descricao: true } },
          },
        },
        Equipamentos: true,
        Mobiliarios: true,
      },
    });

    if(salas.length === 0 && reserva.setorPreferidoId) {
      const { bloco, ...wherePrincipalSemBloco} = wherePrincipal

      salas = await this.prismaService.sala.findMany({
        where: wherePrincipalSemBloco,
        include: {
          bloco: {
            select: {
              numero: true,
              setor: { select: { id: true, nome: true, descricao: true } },
            },
          },
          Equipamentos: true,
          Mobiliarios: true,
        },
      })
    }

    if(salas.length === 0) {
      const { bloco, capacidade, ...wherePrincipalSemBlocoSemCapacidade } = wherePrincipal
      const whereCapacidadeFlex = {
        ...wherePrincipalSemBlocoSemCapacidade,
        capacidade: { gte: Math.ceil(reserva.qtdPessoas * 0.9) },
      }
      salas = await this.prismaService.sala.findMany({
        where: whereCapacidadeFlex,
        include: {
          bloco: {
            select: {
              numero: true,
              setor: { select: { id: true, nome: true, descricao: true } },
            },
          },
          Equipamentos: true,
          Mobiliarios: true,
        },
      })
    }

    return salas
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
