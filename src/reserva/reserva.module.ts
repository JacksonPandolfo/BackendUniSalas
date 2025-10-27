/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { DbModule } from 'src/db/db.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReservaScheduler } from './reserva.scheduler';

@Module({
  imports: [DbModule,  ScheduleModule.forRoot(),],
  controllers: [ReservaController],
  providers: [ReservaService, ReservaScheduler],
})
export class ReservaModule {}

