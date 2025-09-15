/* eslint-disable prettier/prettier */
import { CreateReservaDto } from './create-reserva.dto';

export interface UpdateReservaDto extends Partial<CreateReservaDto> {
    id: string
}