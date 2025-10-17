/* eslint-disable prettier/prettier */
import { StatusReserva, TipoEquipamento, TipoEvento, TipoMobiliario, TipoReserva } from "generated/prisma"

export interface CreateReservaDto {
    tipoReserva: TipoReserva
    tipoEvento: TipoEvento
    acessibilidade: boolean
    diaSemana: number
    dataInicio: Date
    dataFim: Date
    horarioId?: string
    horaInicial: Date
    horaFinal: Date
    salaId?: string
    turmaId?: string
    qtdPessoas: number
    ministranteId: string
    solicitanteId: string
    aprovadorId: string
    statusReserva: StatusReserva
    equipamentos:  TipoEquipamento[]
    mobiliarios:   TipoMobiliario[]
    setorPreferidoId?: string
}
