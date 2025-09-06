-- CreateEnum
CREATE TYPE "public"."StatusSala" AS ENUM ('LIVRE', 'OCUPADA', 'MANUTENCAO', 'DESATIVADA');

-- CreateEnum
CREATE TYPE "public"."Cargo" AS ENUM ('ADMINISTRADOR', 'ATENDIMENTO', 'MINISTRANTE', 'FUNCIONARIO');

-- CreateEnum
CREATE TYPE "public"."DiaSemana" AS ENUM ('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO');

-- CreateEnum
CREATE TYPE "public"."TipoReserva" AS ENUM ('ESPORADICA', 'RECORRENTE');

-- CreateEnum
CREATE TYPE "public"."TipoEvento" AS ENUM ('AULA', 'PALESTRA', 'BANCA', 'REUNIAO');

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "cargos" "public"."Cargo" NOT NULL DEFAULT 'FUNCIONARIO',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bloco" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "setorId" INTEGER NOT NULL,

    CONSTRAINT "Bloco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sala" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "statusSala" "public"."StatusSala" NOT NULL DEFAULT 'LIVRE',
    "temAcessibilidade" BOOLEAN NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "setorId" INTEGER NOT NULL,
    "blocoId" INTEGER NOT NULL,

    CONSTRAINT "Sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CursoDisciplina" (
    "id" SERIAL NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,

    CONSTRAINT "CursoDisciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Disciplina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "numeroCreditos" INTEGER NOT NULL,
    "cargaHoraria" INTEGER NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Turma" (
    "id" SERIAL NOT NULL,
    "vagas" INTEGER NOT NULL DEFAULT 40,
    "cursoId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "ministranteId" INTEGER,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TurmaAluno" (
    "id" SERIAL NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,

    CONSTRAINT "TurmaAluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TurmaHorario" (
    "id" SERIAL NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "horarioId" INTEGER NOT NULL,

    CONSTRAINT "TurmaHorario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Horario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reserva" (
    "id" SERIAL NOT NULL,
    "tipoReserva" "public"."TipoReserva" NOT NULL,
    "tipoEvento" "public"."TipoEvento" NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "diaSemana" "public"."DiaSemana",
    "horarioId" INTEGER NOT NULL,
    "salaId" INTEGER NOT NULL,
    "turmaId" INTEGER,
    "ministranteId" INTEGER NOT NULL,
    "solicitanteId" INTEGER NOT NULL,
    "aprovadorId" INTEGER NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE INDEX "Sala_statusSala_idx" ON "public"."Sala"("statusSala");

-- CreateIndex
CREATE INDEX "Sala_setorId_blocoId_numero_idx" ON "public"."Sala"("setorId", "blocoId", "numero");

-- CreateIndex
CREATE UNIQUE INDEX "CursoDisciplina_cursoId_disciplinaId_key" ON "public"."CursoDisciplina"("cursoId", "disciplinaId");

-- CreateIndex
CREATE UNIQUE INDEX "TurmaAluno_turmaId_alunoId_key" ON "public"."TurmaAluno"("turmaId", "alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "TurmaHorario_turmaId_horarioId_key" ON "public"."TurmaHorario"("turmaId", "horarioId");

-- AddForeignKey
ALTER TABLE "public"."Bloco" ADD CONSTRAINT "Bloco_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "public"."Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sala" ADD CONSTRAINT "Sala_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "public"."Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sala" ADD CONSTRAINT "Sala_blocoId_fkey" FOREIGN KEY ("blocoId") REFERENCES "public"."Bloco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CursoDisciplina" ADD CONSTRAINT "CursoDisciplina_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CursoDisciplina" ADD CONSTRAINT "CursoDisciplina_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "public"."Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
