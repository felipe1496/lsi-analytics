/*
  Warnings:

  - You are about to drop the column `config` on the `VIEWS` table. All the data in the column will be lost.
  - Added the required column `panelId` to the `VIEWS` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `VIEWS` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ViewType" AS ENUM ('PIECHART');

-- AlterTable
ALTER TABLE "VIEWS" DROP COLUMN "config",
ADD COLUMN     "panelId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "ViewType" NOT NULL;

-- DropEnum
DROP TYPE "ViewTypeEnum";

-- CreateTable
CREATE TABLE "PIE_CHART" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "subTitle" TEXT,
    "labelColumn" TEXT NOT NULL,
    "valueColumn" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PIE_CHART_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PIE_CHART_viewId_key" ON "PIE_CHART"("viewId");

-- AddForeignKey
ALTER TABLE "VIEWS" ADD CONSTRAINT "VIEWS_panelId_fkey" FOREIGN KEY ("panelId") REFERENCES "PANELS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PIE_CHART" ADD CONSTRAINT "PIE_CHART_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "VIEWS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
