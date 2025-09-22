/* eslint-disable prettier/prettier */
import { CreateUsuarioDto } from './create-usuario.dto';

export interface UpdateUsuarioDto extends Partial<CreateUsuarioDto> {
    id: string;
}
