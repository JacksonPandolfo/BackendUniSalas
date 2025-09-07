/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [SalaController],
  providers: [SalaService],
})
export class SalaModule {}

