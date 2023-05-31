-- AlterTable
ALTER TABLE "previous_treatments" ALTER COLUMN "treatment" DROP NOT NULL,
ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL;
