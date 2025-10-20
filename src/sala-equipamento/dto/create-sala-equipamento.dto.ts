/* eslint-disable prettier/prettier */
import { TipoEquipamento } from "generated/prisma";

export interface CreateSalaEquipamentoDto {
    salaId: string,
    tipoEquipamento: TipoEquipamento
}
