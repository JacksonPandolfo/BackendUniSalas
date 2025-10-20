/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SalaEquipamentoService } from './sala-equipamento.service';
import { SalaEquipamentoController } from './sala-equipamento.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [SalaEquipamentoController],
  providers: [SalaEquipamentoService],
})
export class SalaEquipamentoModule {}
