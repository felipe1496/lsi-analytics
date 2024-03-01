/*
  Warnings:

  - Added the required column `name` to the `FAVORITE_QUERIES` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FAVORITE_QUERIES" ADD COLUMN     "name" TEXT NOT NULL;
