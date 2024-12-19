/*
  Warnings:

  - You are about to drop the column `capacity` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `licensePlate` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the `Maintenance` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `driverId` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_driverId_fkey";

-- DropIndex
DROP INDEX "Vehicle_licensePlate_key";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "capacity",
DROP COLUMN "licensePlate",
ALTER COLUMN "driverId" SET NOT NULL;

-- DropTable
DROP TABLE "Maintenance";

-- CreateTable
CREATE TABLE "Palette" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "Palette_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Palette" ADD CONSTRAINT "Palette_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
