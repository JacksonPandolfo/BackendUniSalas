import { CreateBlocoDto } from './create-bloco.dto';

export interface UpdateBlocoDto extends Partial<CreateBlocoDto> {
  id: string;
}
