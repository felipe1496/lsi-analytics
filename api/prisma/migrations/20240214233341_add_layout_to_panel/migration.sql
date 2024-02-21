/*
  Warnings:

  - Added the required column `layout` to the `PANELS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PANELS" ADD COLUMN     "layout" JSONB NOT NULL;
