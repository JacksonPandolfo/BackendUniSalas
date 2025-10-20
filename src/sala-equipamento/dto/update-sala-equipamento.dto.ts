/* eslint-disable prettier/prettier */
import { TipoEquipamento } from 'generated/prisma';
import { CreateSalaEquipamentoDto } from './create-sala-equipamento.dto';

export interface UpdateSalaEquipamentoDto extends Partial<CreateSalaEquipamentoDto> {
    id: string
}

export interface UpdateEquipamentoBySalaIdDto {
    tipoEquipamento: TipoEquipamento[]
}
