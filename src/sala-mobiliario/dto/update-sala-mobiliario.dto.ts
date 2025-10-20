/* eslint-disable prettier/prettier */
import { CreateSalaMobiliarioDto } from './create-sala-mobiliario.dto';
import { TipoMobiliario } from "generated/prisma";

export interface UpdateSalaMobiliarioDto extends Partial<CreateSalaMobiliarioDto> {
    id: string
}

export interface UpdateMobiliarioBySalaIdDto {
    tipoMobiliario: TipoMobiliario[]
}
