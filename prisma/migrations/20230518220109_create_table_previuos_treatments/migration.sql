/*
  Warnings:

  - You are about to drop the column `previous_treatments` on the `patients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "previous_treatments";

-- CreateTable
CREATE TABLE "previous_treatments" (
    "id" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "patients_id" TEXT,

    CONSTRAINT "previous_treatments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "previous_treatments" ADD CONSTRAINT "previous_treatments_patients_id_fkey" FOREIGN KEY ("patients_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
