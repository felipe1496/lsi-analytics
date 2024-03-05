/*
  Warnings:

  - The `valueColumn` column on the `LINE_CHART` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "LINE_CHART" DROP COLUMN "valueColumn",
ADD COLUMN     "valueColumn" TEXT[];
