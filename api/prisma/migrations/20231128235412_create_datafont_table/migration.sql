-- CreateEnum
CREATE TYPE "TypeOfStorage" AS ENUM ('DATABASE', 'FILE');

-- CreateEnum
CREATE TYPE "DataProvider" AS ENUM ('POSTGRESQL', 'CSV');

-- CreateTable
CREATE TABLE "DATAFONTS" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeOfStorage" "TypeOfStorage" NOT NULL,
    "provider" "DataProvider" NOT NULL,
    "accessKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DATAFONTS_pkey" PRIMARY KEY ("id")
);
