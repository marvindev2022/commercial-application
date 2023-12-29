/*
  Warnings:

  - You are about to drop the column `adminId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `birthDate` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_userId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "complement" DROP DEFAULT,
ALTER COLUMN "city" DROP DEFAULT,
ALTER COLUMN "country" DROP DEFAULT,
ALTER COLUMN "neighborhood" DROP DEFAULT,
ALTER COLUMN "state" DROP DEFAULT,
ALTER COLUMN "street" DROP DEFAULT,
ALTER COLUMN "zipcode" DROP DEFAULT,
ALTER COLUMN "number" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "adminId",
DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "userId",
ADD COLUMN     "adminId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDate",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
