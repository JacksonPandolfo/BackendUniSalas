/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "src/db/prisma.service";

@Injectable()
export class ReservaScheduler {
  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async atualizarStatusSala() {
    const agora = new Date()
    const horaAtual = agora.getHours()
    const minutoAtual = agora.getMinutes()
    const minutosAgora = horaAtual * 60 + minutoAtual

    try {
      const reservas = await this.prismaService.reserva.findMany({
        where: {
          dataInicio: { lte: agora },
          dataFim: { gte: agora },
          statusReserva: 'APROVADA',
        },
        select: {
          id: true,
          salaId: true,
          horaInicial: true,
          horaFinal: true,
          sala: { select: { statusSala: true } },
        },
      })

      for (const reserva of reservas) {
        const inicio = new Date(reserva.horaInicial)
        const fim = new Date(reserva.horaFinal)

        const horaIni = inicio.getUTCHours()
        const minIni = inicio.getUTCMinutes()
        const horaFim = fim.getUTCHours()
        const minFim = fim.getUTCMinutes()

        const minutosInicio = horaIni * 60 + minIni
        const minutosFim = horaFim * 60 + minFim

        if (minutosAgora >= minutosInicio && minutosAgora <= minutosFim) {
            if(!reserva.salaId) return
            await this.prismaService.sala.update({
              where: { id: reserva.salaId },
              data: { statusSala: 'OCUPADA' },
            })
        }

        if (minutosAgora > minutosFim) {
            if(!reserva.salaId) return
          await this.prismaService.sala.update({
            where: { id: reserva.salaId },
            data: { statusSala: 'LIVRE' },
          })

        }
      }
    } catch (err) {
        throw new NotFoundException("Sala não encontrada para atualização. Message: ", err)
    }
  }
}