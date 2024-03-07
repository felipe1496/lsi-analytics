/*
  Warnings:

  - You are about to drop the column `number` on the `NUMBER_VIEW` table. All the data in the column will be lost.
  - Added the required column `labelColumn` to the `NUMBER_VIEW` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueColumn` to the `NUMBER_VIEW` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NUMBER_VIEW" DROP COLUMN "number",
ADD COLUMN     "labelColumn" TEXT NOT NULL,
ADD COLUMN     "valueColumn" TEXT NOT NULL;
