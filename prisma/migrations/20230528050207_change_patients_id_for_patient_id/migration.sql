/*
  Warnings:

  - You are about to drop the column `patients_id` on the `previous_treatments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "previous_treatments" DROP CONSTRAINT "previous_treatments_patients_id_fkey";

-- AlterTable
ALTER TABLE "previous_treatments" DROP COLUMN "patients_id",
ADD COLUMN     "patient_id" TEXT;

-- AddForeignKey
ALTER TABLE "previous_treatments" ADD CONSTRAINT "previous_treatments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
