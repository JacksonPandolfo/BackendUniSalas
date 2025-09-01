/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SetorService } from './setor.service';
import { SetorController } from './setor.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [SetorController],
  providers: [SetorService],
})
export class SetorModule {}
