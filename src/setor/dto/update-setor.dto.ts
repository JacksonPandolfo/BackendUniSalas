/* eslint-disable prettier/prettier */
import { CreateSetorDto } from './create-setor.dto';

export interface UpdateSetorDto extends Partial<CreateSetorDto> {
  id: string;
}
