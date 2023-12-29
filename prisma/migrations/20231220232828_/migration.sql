/*
  Warnings:

  - The `hours` column on the `Schedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[date]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `number` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `date` on the `Schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "hours",
ADD COLUMN     "hours" TIMESTAMP(3)[];

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_date_key" ON "Schedule"("date");
