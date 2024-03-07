/*
  Warnings:

  - You are about to drop the column `valueColumn` on the `BAR_CHART` table. All the data in the column will be lost.
  - You are about to drop the column `valueColumn` on the `LINE_CHART` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BAR_CHART" DROP COLUMN "valueColumn",
ADD COLUMN     "valueColumns" TEXT[];

-- AlterTable
ALTER TABLE "LINE_CHART" DROP COLUMN "valueColumn",
ADD COLUMN     "valueColumns" TEXT[];
