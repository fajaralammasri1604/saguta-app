CREATE TABLE "SagoProductionVolume" (
  "id" TEXT NOT NULL,
  "regencyCity" TEXT NOT NULL,
  "production2022Ton" INTEGER NOT NULL,
  "production2023Ton" INTEGER NOT NULL,
  "production2024Ton" INTEGER NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "SagoProductionVolume_pkey" PRIMARY KEY ("id")
);
