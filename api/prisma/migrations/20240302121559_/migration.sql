-- AlterEnum
ALTER TYPE "ViewType" ADD VALUE 'LINECHART';

-- CreateTable
CREATE TABLE "LINE_CHART" (
    "id" TEXT NOT NULL,
    "labelColumn" TEXT NOT NULL,
    "valueColumn" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LINE_CHART_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LINE_CHART_viewId_key" ON "LINE_CHART"("viewId");

-- AddForeignKey
ALTER TABLE "LINE_CHART" ADD CONSTRAINT "LINE_CHART_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "VIEWS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
