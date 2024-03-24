/*
  Warnings:

  - You are about to drop the `SelectFiltersOnViews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SelectFiltersOnViews" DROP CONSTRAINT "SelectFiltersOnViews_selectFilterId_fkey";

-- DropForeignKey
ALTER TABLE "SelectFiltersOnViews" DROP CONSTRAINT "SelectFiltersOnViews_viewId_fkey";

-- AlterTable
ALTER TABLE "SELECT_FILTER" ADD COLUMN     "filterViews" TEXT[];

-- DropTable
DROP TABLE "SelectFiltersOnViews";
