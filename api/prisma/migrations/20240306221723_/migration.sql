/*
  Warnings:

  - Added the required column `stripeColor` to the `NUMBER_VIEW` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NUMBER_VIEW" ADD COLUMN     "stripeColor" TEXT NOT NULL,
ALTER COLUMN "isPercentage" DROP DEFAULT,
ALTER COLUMN "numberOfDecimaPlaces" DROP DEFAULT;
