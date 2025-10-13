/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [TurmaController],
  providers: [TurmaService],
})
export class TurmaModule {}
