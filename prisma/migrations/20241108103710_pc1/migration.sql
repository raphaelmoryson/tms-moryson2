/*
  Warnings:

  - Added the required column `entreprise` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "entreprise" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
