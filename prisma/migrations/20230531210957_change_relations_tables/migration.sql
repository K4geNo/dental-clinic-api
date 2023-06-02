/*
  Warnings:

  - Made the column `patient_id` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `patient_id` on table `treatments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "treatments" DROP CONSTRAINT "treatments_patient_id_fkey";

-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "patient_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "treatments" ALTER COLUMN "patient_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
