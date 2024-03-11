/*
  Warnings:

  - You are about to drop the column `numberOfDecimaPlaces` on the `NUMBER_VIEW` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NUMBER_VIEW" DROP COLUMN "numberOfDecimaPlaces",
ADD COLUMN     "numberOfDecimalPlaces" INTEGER;
