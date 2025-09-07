/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BlocoService } from './bloco.service';
import { BlocoController } from './bloco.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [BlocoController],
  providers: [BlocoService],
})
export class BlocoModule {}
