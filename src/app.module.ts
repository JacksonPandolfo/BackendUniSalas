import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { SetorModule } from './setor/setor.module';

@Module({
  imports: [DbModule, SetorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
