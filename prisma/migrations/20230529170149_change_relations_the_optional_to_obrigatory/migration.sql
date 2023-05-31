/*
  Warnings:

  - Made the column `patient_id` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `patient_id` on table `previous_treatments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "previous_treatments" DROP CONSTRAINT "previous_treatments_patient_id_fkey";

-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "patient_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "previous_treatments" ALTER COLUMN "patient_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "previous_treatments" ADD CONSTRAINT "previous_treatments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
