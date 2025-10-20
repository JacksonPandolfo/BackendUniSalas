/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SalaMobiliarioService } from './sala-mobiliario.service';
import { SalaMobiliarioController } from './sala-mobiliario.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [SalaMobiliarioController],
  providers: [SalaMobiliarioService],
})
export class SalaMobiliarioModule {}
