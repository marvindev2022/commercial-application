/*
  Warnings:

  - You are about to drop the column `hour` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `hourId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_scheduleId_fkey";

-- DropIndex
DROP INDEX "Appointment_hour_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "hour",
DROP COLUMN "scheduleId",
ADD COLUMN     "hourId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "hours";

-- CreateTable
CREATE TABLE "Hour" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "scheduleId" TEXT NOT NULL,

    CONSTRAINT "Hour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hour" ADD CONSTRAINT "Hour_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_hourId_fkey" FOREIGN KEY ("hourId") REFERENCES "Hour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
