/*
  Warnings:

  - Added the required column `nome` to the `Turma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Reserva" ALTER COLUMN "dataInicio" SET DATA TYPE DATE,
ALTER COLUMN "dataFim" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "public"."Turma" ADD COLUMN     "nome" TEXT NOT NULL;
