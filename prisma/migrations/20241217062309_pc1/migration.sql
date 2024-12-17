/*
  Warnings:

  - You are about to drop the column `amountExclTax` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `amountInclTax` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `amountVAT` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Invoice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoiceNumber]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Invoice_orderId_key";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "amountExclTax",
DROP COLUMN "amountInclTax",
DROP COLUMN "amountVAT",
DROP COLUMN "orderId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "paymentStatus" SET DEFAULT 'Pending';

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");
