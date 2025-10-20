import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { SetorModule } from './setor/setor.module';
import { BlocoModule } from './bloco/bloco.module';
import { SalaModule } from './sala/sala.module';
import { ReservaModule } from './reserva/reserva.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { TurmaModule } from './turma/turma.module';
import { HorarioModule } from './horario/horario.module';
import { SalaMobiliarioModule } from './sala-mobiliario/sala-mobiliario.module';
import { SalaEquipamentoModule } from './sala-equipamento/sala-equipamento.module';

@Module({
  imports: [
    DbModule,
    SetorModule,
    BlocoModule,
    SalaModule,
    ReservaModule,
    UsuarioModule,
    AuthModule,
    DisciplinaModule,
    TurmaModule,
    HorarioModule,
    SalaMobiliarioModule,
    SalaEquipamentoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
