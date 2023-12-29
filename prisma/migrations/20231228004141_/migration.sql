/*
  Warnings:

  - A unique constraint covering the columns `[hour]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_hour_key" ON "Appointment"("hour");
