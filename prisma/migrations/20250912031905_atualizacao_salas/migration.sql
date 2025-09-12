/*
  Warnings:

  - You are about to drop the column `tipoEquipamento` on the `Sala` table. All the data in the column will be lost.
  - You are about to drop the column `tipoMobiliario` on the `Sala` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Sala" DROP COLUMN "tipoEquipamento",
DROP COLUMN "tipoMobiliario";

-- CreateTable
CREATE TABLE "public"."SalaMobiliario" (
    "id" SERIAL NOT NULL,
    "salaId" INTEGER NOT NULL,
    "tipoMobiliario" "public"."TipoMobiliario" NOT NULL,

    CONSTRAINT "SalaMobiliario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SalaEquipamento" (
    "id" SERIAL NOT NULL,
    "salaId" INTEGER NOT NULL,
    "tipoEquipamento" "public"."TipoEquipamento" NOT NULL,

    CONSTRAINT "SalaEquipamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SalaMobiliario" ADD CONSTRAINT "SalaMobiliario_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "public"."Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SalaEquipamento" ADD CONSTRAINT "SalaEquipamento_salaId_fkey" FOREIGN KEY ("salaId") REFERENCES "public"."Sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
