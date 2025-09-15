-- CreateEnum
CREATE TYPE "public"."StatusSala" AS ENUM ('LIVRE', 'OCUPADA', 'MANUTENCAO', 'DESATIVADA');

-- CreateEnum
CREATE TYPE "public"."Cargo" AS ENUM ('ADMINISTRADOR', 'ATENDIMENTO', 'MINISTRANTE', 'FUNCIONARIO');

-- CreateEnum
CREATE TYPE "public"."TipoReserva" AS ENUM ('ESPORADICA', 'RECORRENTE');

-- CreateEnum
CREATE TYPE "public"."TipoEvento" AS ENUM ('AULA', 'PALESTRA', 'BANCA', 'REUNIAO', 'EVENTO');

-- CreateEnum
CREATE TYPE "public"."TipoMobiliario" AS ENUM ('MESADESENHO', 'CADEIRABRACO', 'MESAREUNIAO', 'MOBILIARIOMOVEL');

-- CreateEnum
CREATE TYPE "public"."TipoEquipamento" AS ENUM ('CAIXASOM', 'PROJETOR', 'COMPUTADOR', 'MICROFONE', 'WEBCAM');

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" DATE NOT NULL,
    "senha" TEXT NOT NULL,
    "cargos" "public"."Cargo"[],

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Setor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bloco" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "numero" INTEGER NOT NULL,
    "setorId" UUID NOT NULL,

    CONSTRAINT "Bloco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sala" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "numero" INTEGER NOT NULL,
    "temAcessibilidade" BOOLEAN NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "blocoId" UUID NOT NULL,
    "statusSala" "public"."StatusSala" NOT NULL DEFAULT 'LIVRE',

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SalaMobiliario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "salaId" UUID NOT NULL,
    "tipoMobiliario" "public"."TipoMobiliario" NOT NULL,

    CONSTRAINT "SalaMobiliario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SalaEquipamento" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "salaId" UUID NOT NULL,
    "tipoEquipamento" "public"."TipoEquipamento" NOT NULL,

    CONSTRAINT "SalaEquipamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Curso" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Curriculo" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "versaoCurriculo" INTEGER NOT NULL,
    "cursoId" UUID NOT NULL,

    CONSTRAINT "Curriculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CurriculoDisciplina" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "curriculoId" UUID NOT NULL,
    "disciplinaId" UUID NOT NULL,
    "obrigatoria" BOOLEAN NOT NULL,
    "semestre" INTEGER NOT NULL,

    CONSTRAINT "CurriculoDisciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Disciplina" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "numeroCreditos" INTEGER NOT NULL,
    "cargaHoraria" INTEGER NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Turma" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "vagas" INTEGER NOT NULL DEFAULT 40,
    "cursoId" UUID NOT NULL,
    "disciplinaId" UUID NOT NULL,
    "ministranteId" UUID,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TurmaAluno" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "turmaId" UUID NOT NULL,
    "alunoId" UUID NOT NULL,

    CONSTRAINT "TurmaAluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TurmaHorario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "turmaId" UUID NOT NULL,
    "horarioId" UUID NOT NULL,

    CONSTRAINT "TurmaHorario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Horario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" TEXT NOT NULL,
    "horaInicio" TIME NOT NULL,
    "horaFim" TIME NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reserva" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tipoReserva" "public"."TipoReserva" NOT NULL,
    "tipoEvento" "public"."TipoEvento" NOT NULL,
    "diaSemana" INTEGER NOT NULL,
    "dataInicio" DATE NOT NULL,
    "dataFim" DATE NOT NULL,
    "horarioId" UUID NOT NULL,
    "salaId" UUID NOT NULL,
    "turmaId" UUID,
    "ministranteId" UUID NOT NULL,
    "solicitanteId" UUID NOT NULL,
    "aprovadorId" UUID NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Setor_nome_key" ON "public"."Setor"("nome");

-- CreateIndex
CREATE INDEX "Sala_statusSala_idx" ON "public"."Sala"("statusSala");

-- CreateIndex
CREATE INDEX "Sala_blocoId_numero_idx" ON "public"."Sala"("blocoId", "numero");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculoDisciplina_curriculoId_disciplinaId_key" ON "public"."CurriculoDisciplina"("curriculoId", "disciplinaId");

-- CreateIndex
CREATE UNIQUE INDEX "TurmaAluno_turmaId_alunoId_key" ON "public"."TurmaAluno"("turmaId", "alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "TurmaHorario_turmaId_horarioId_key" ON "public"."TurmaHorario"("turmaId", "horarioId");

-- AddForeignKey
ALTER TABLE "public"."Bloco" ADD CONSTRAINT "Bloco_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "public"."Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sala" ADD CONSTRAINT "Sala_blocoId_fkey" FOREIGN KEY ("blocoId") REFERENCES "public"."Bloco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SalaMobiliario" ADD CONSTRAINT "SalaMobiliario_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "public"."Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SalaEquipamento" ADD CONSTRAINT "SalaEquipamento_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "public"."Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Curriculo" ADD CONSTRAINT "Curriculo_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurriculoDisciplina" ADD CONSTRAINT "CurriculoDisciplina_curriculoId_fkey" FOREIGN KEY ("curriculoId") REFERENCES "public"."Curriculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurriculoDisciplina" ADD CONSTRAINT "CurriculoDisciplina_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "public"."Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Turma" ADD CONSTRAINT "Turma_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Turma" ADD CONSTRAINT "Turma_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "public"."Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Turma" ADD CONSTRAINT "Turma_ministranteId_fkey" FOREIGN KEY ("ministranteId") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TurmaAluno" ADD CONSTRAINT "TurmaAluno_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "public"."Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TurmaAluno" ADD CONSTRAINT "TurmaAluno_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TurmaHorario" ADD CONSTRAINT "TurmaHorario_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "public"."Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TurmaHorario" ADD CONSTRAINT "TurmaHorario_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "public"."Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "public"."Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "public"."Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "public"."Turma"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_ministranteId_fkey" FOREIGN KEY ("ministranteId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_solicitanteId_fkey" FOREIGN KEY ("solicitanteId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reserva" ADD CONSTRAINT "Reserva_aprovadorId_fkey" FOREIGN KEY ("aprovadorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
