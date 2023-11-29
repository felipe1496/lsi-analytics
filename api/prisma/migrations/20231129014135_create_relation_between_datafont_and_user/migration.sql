/*
  Warnings:

  - Added the required column `userId` to the `DATAFONTS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DATAFONTS" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DATAFONTS" ADD CONSTRAINT "DATAFONTS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
