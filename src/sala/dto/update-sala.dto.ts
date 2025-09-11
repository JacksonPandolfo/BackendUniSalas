/* eslint-disable prettier/prettier */
import { CreateSalaDto } from './create-sala.dto';

export interface UpdateSalaDto extends Partial<CreateSalaDto> {
    id: number
}