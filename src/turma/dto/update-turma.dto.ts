import { CreateTurmaDto } from './create-turma.dto';

export interface UpdateTurmaDto extends Partial<CreateTurmaDto> {
  id: string;
}
