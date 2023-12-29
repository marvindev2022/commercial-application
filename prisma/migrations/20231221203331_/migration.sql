/*
  Warnings:

  - The `hours` column on the `Schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "hours",
ADD COLUMN     "hours" TIMESTAMP(3)[];
