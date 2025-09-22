import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { SetorModule } from './setor/setor.module';
import { BlocoModule } from './bloco/bloco.module';
import { SalaModule } from './sala/sala.module';
import { ReservaModule } from './reserva/reserva.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DbModule,
    SetorModule,
    BlocoModule,
    SalaModule,
    ReservaModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
