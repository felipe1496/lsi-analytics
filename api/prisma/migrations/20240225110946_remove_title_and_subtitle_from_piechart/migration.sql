/*
  Warnings:

  - You are about to drop the column `subTitle` on the `PIE_CHART` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `PIE_CHART` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PIE_CHART" DROP COLUMN "subTitle",
DROP COLUMN "title";
