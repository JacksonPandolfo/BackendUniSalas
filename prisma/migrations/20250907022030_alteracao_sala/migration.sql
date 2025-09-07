/*
  Warnings:

  - You are about to drop the column `diaSemana` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `setorId` on the `Sala` table. All the data in the column will be lost.
  - You are about to drop the `CursoDisciplina` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipoEquipamento` to the `Sala` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoMobiliario` to the `Sala` table without a default value. This is not possible if the table is not empty.
  - Changed the column `cargos` on the `Usuario` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- CreateEnum
CREATE TYPE "public"."TipoMobiliario" AS ENUM ('MESADESENHO', 'CADEIRABRACO', 'MESAREUNIAO', 'MOBILIARIOMOVEL');

-- CreateEnum
CREATE TYPE "public"."TipoEquipamento" AS ENUM ('CAIXASOM', 'PROJETOR', 'COMPUTADOR', 'MICROFONE', 'WEBCAM');

-- AlterEnum
ALTER TYPE "public"."TipoEvento" ADD VALUE 'EVENTO';

-- DropForeignKey
ALTER TABLE "public"."CursoDisciplina" DROP CONSTRAINT "CursoDisciplina_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CursoDisciplina" DROP CONSTRAINT "CursoDisciplina_disciplinaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Sala" DROP CONSTRAINT "Sala_setorId_fkey";

-- DropIndex
DROP INDEX "public"."Sala_setorId_blocoId_numero_idx";

-- AlterTable
ALTER TABLE "public"."Reserva" DROP COLUMN "diaSemana";

-- AlterTable
ALTER TABLE "public"."Sala" DROP COLUMN "setorId",
ADD COLUMN     "tipoEquipamento" "public"."TipoEquipamento" NOT NULL,
ADD COLUMN     "tipoMobiliario" "public"."TipoMobiliario" NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "cargos";
ALTER TABLE "Usuario" ADD COLUMN "cargos" "Cargo"[];

-- DropTable
DROP TABLE "public"."CursoDisciplina";

-- DropEnum
DROP TYPE "public"."DiaSemana";

-- CreateTable
CREATE TABLE "public"."Curriculo" (
    "id" SERIAL NOT NULL,
    "versaoCurriculo" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,

    CONSTRAINT "Curriculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CurriculoDisciplina" (
    "id" SERIAL NOT NULL,
    "curriculoId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "obrigatoria" BOOLEAN NOT NULL,
    "semestre" INTEGER NOT NULL,

    CONSTRAINT "CurriculoDisciplina_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CurriculoDisciplina_curriculoId_disciplinaId_key" ON "public"."CurriculoDisciplina"("curriculoId", "disciplinaId");

-- CreateIndex
CREATE INDEX "Sala_blocoId_numero_idx" ON "public"."Sala"("blocoId", "numero");

-- AddForeignKey
ALTER TABLE "public"."Curriculo" ADD CONSTRAINT "Curriculo_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurriculoDisciplina" ADD CONSTRAINT "CurriculoDisciplina_curriculoId_fkey" FOREIGN KEY ("curriculoId") REFERENCES "public"."Curriculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurriculoDisciplina" ADD CONSTRAINT "CurriculoDisciplina_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "public"."Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
