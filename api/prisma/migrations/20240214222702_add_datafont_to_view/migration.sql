/*
  Warnings:

  - Added the required column `datafontId` to the `VIEWS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VIEWS" ADD COLUMN     "datafontId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VIEWS" ADD CONSTRAINT "VIEWS_datafontId_fkey" FOREIGN KEY ("datafontId") REFERENCES "DATAFONTS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
