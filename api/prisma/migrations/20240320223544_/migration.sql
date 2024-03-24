-- CreateTable
CREATE TABLE "SelectFiltersOnViews" (
    "id" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,
    "selectFilterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelectFiltersOnViews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SelectFiltersOnViews_viewId_key" ON "SelectFiltersOnViews"("viewId");

-- CreateIndex
CREATE UNIQUE INDEX "SelectFiltersOnViews_selectFilterId_key" ON "SelectFiltersOnViews"("selectFilterId");

-- AddForeignKey
ALTER TABLE "SelectFiltersOnViews" ADD CONSTRAINT "SelectFiltersOnViews_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "VIEWS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelectFiltersOnViews" ADD CONSTRAINT "SelectFiltersOnViews_selectFilterId_fkey" FOREIGN KEY ("selectFilterId") REFERENCES "SELECT_FILTER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
