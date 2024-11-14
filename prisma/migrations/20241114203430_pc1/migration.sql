/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siren]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siret]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siren` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "apeCode" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'France',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "siren" TEXT NOT NULL,
ADD COLUMN     "siret" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vatNumber" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_name_key" ON "Customer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_siren_key" ON "Customer"("siren");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_siret_key" ON "Customer"("siret");

-- CreateIndex
CREATE INDEX "Customer_siren_idx" ON "Customer"("siren");

-- CreateIndex
CREATE INDEX "Customer_name_idx" ON "Customer"("name");
