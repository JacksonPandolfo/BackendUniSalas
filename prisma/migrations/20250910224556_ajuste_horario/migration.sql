/*
  Warnings:

  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Horario" ALTER COLUMN "horaInicio" SET DATA TYPE TIME,
ALTER COLUMN "horaFim" SET DATA TYPE TIME;

-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "senha" TEXT NOT NULL,
ALTER COLUMN "dataNascimento" SET DATA TYPE DATE;
