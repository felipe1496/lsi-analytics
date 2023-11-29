-- CreateEnum
CREATE TYPE "ViewTypeEnum" AS ENUM ('PIECHART');

-- CreateEnum
CREATE TYPE "ViewContentUpdate" AS ENUM ('STATIC', 'DYNAMIC');

-- CreateTable
CREATE TABLE "VIEWS" (
    "id" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "type" "ViewTypeEnum" NOT NULL,
    "contentUpdate" "ViewContentUpdate" NOT NULL,
    "sql" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VIEWS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "STATIC_VIEW_DATA" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "STATIC_VIEW_DATA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DATASET" (
    "id" TEXT NOT NULL,
    "sql" TEXT NOT NULL,
    "columnsMetadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DATASET_pkey" PRIMARY KEY ("id")
);
