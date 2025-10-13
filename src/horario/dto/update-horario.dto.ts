import { CreateHorarioDto } from './create-horario.dto';

export interface UpdateHorarioDto extends Partial<CreateHorarioDto> {
  id: string;
}
