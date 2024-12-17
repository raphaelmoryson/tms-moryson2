/*
  Warnings:

  - Added the required column `TotalHT` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalTTC` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalTVA` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "TotalHT" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "TotalTTC" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "TotalTVA" DOUBLE PRECISION NOT NULL;
