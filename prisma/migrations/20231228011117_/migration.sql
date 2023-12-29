/*
  Warnings:

  - You are about to drop the column `shceduleId` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `scheduleId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_shceduleId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "shceduleId",
ADD COLUMN     "scheduleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
