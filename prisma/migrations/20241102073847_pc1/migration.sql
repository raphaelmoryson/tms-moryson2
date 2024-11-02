/*
  Warnings:

  - The values [CHAUFFEUR,CLIENT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `amountHT` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `amountTTC` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `amountTVA` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `commandeId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the `Chauffeur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Commande` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Entretien` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicule` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amountExclTax` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountInclTax` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountVAT` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_PROGRESS', 'DELIVERED', 'CANCELED');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'DRIVER', 'CUSTOMER');
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_chauffeurId_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_vehiculeId_fkey";

-- DropForeignKey
ALTER TABLE "Entretien" DROP CONSTRAINT "Entretien_vehiculeId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_commandeId_fkey";

-- DropIndex
DROP INDEX "Invoice_commandeId_key";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "amountHT",
DROP COLUMN "amountTTC",
DROP COLUMN "amountTVA",
DROP COLUMN "commandeId",
ADD COLUMN     "amountExclTax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "amountInclTax" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "amountVAT" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "orderId" INTEGER;

-- DropTable
DROP TABLE "Chauffeur";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Commande";

-- DropTable
DROP TABLE "Entretien";

-- DropTable
DROP TABLE "Vehicule";

-- DropEnum
DROP TYPE "Statut";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "details" TEXT NOT NULL,
    "pickupAddress" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "vehicleId" INTEGER,
    "driverId" INTEGER,
    "customerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "license" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maintenance" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "Maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_licensePlate_key" ON "Vehicle"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_orderId_key" ON "Invoice"("orderId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
