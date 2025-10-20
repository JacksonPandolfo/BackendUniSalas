/* eslint-disable prettier/prettier */

import { TipoMobiliario } from "generated/prisma";
export interface CreateSalaMobiliarioDto {
    salaId: string,
    tipoMobiliario: TipoMobiliario
}
