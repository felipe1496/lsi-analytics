/*
  Warnings:

  - Added the required column `userId` to the `PANELS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PANELS" ADD COLUMN     "imageURL" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PANELS" ADD CONSTRAINT "PANELS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
