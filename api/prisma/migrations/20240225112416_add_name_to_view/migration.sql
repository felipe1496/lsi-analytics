/*
  Warnings:

  - Added the required column `name` to the `VIEWS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VIEWS" ADD COLUMN     "name" TEXT NOT NULL;
