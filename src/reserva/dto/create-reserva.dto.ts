/* eslint-disable prettier/prettier */
import { TipoEvento, TipoReserva } from "generated/prisma"

export class CreateReservaDto {
    id: number
    tipoReserva: TipoReserva
    tipoEvento: TipoEvento
    dataInicio: Date
    dataFim: Date
    horarioId: number
    salaId: number
    turmaId?: number
    ministranteId: number
    solicitanteId: number
    aprovadorId: number
}
