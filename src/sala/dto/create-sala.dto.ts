/* eslint-disable prettier/prettier */
import { StatusSala, TipoEquipamento, TipoMobiliario } from "generated/prisma";

export interface CreateSalaDto {
    numero: number;
    statusSala: StatusSala;
    temAcessibilidade: boolean;
    capacidade: number;
    blocoId: string;
    tipoEquipamento: TipoEquipamento;
    tipoMobiliario: TipoMobiliario;
}

