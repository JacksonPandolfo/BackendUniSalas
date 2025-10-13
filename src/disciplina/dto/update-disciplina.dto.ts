import { CreateDisciplinaDto } from './create-disciplina.dto';

export interface UpdateDisciplinaDto extends Partial<CreateDisciplinaDto> {
  id: string;
}
