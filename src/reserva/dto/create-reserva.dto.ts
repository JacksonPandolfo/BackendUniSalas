/* eslint-disable prettier/prettier */
import { TipoEvento, TipoReserva } from "generated/prisma"

export interface CreateReservaDto {
    tipoReserva: TipoReserva
    tipoEvento: TipoEvento
    diaSemana: number
    dataInicio: Date
    dataFim: Date
    horarioId: string
    salaId: string
    turmaId?: string
    ministranteId: string
    solicitanteId: string
    aprovadorId: string
}
