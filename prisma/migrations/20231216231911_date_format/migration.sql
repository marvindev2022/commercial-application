/*
  Warnings:

  - You are about to drop the column `cep` on the `Address` table. All the data in the column will be lost.
  - Made the column `complement` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDate` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "cep",
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "neighborhood" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "street" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "zipcode" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "complement" SET NOT NULL,
ALTER COLUMN "number" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "birthDate" SET NOT NULL,
ALTER COLUMN "isActive" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
