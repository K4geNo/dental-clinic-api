/*
  Warnings:

  - You are about to drop the `previous_treatments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "previous_treatments" DROP CONSTRAINT "previous_treatments_patient_id_fkey";

-- DropTable
DROP TABLE "previous_treatments";

-- CreateTable
CREATE TABLE "treatments" (
    "id" TEXT NOT NULL,
    "treatment" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "treatments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
