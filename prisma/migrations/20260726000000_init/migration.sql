CREATE TABLE "CommodityMetric" (
  "id" TEXT NOT NULL,
  "monthLabel" TEXT NOT NULL,
  "period" TIMESTAMP(3) NOT NULL,
  "pricePerKg" INTEGER NOT NULL,
  "productionTon" INTEGER NOT NULL,
  "activeCenters" INTEGER NOT NULL,
  "partnerFarmers" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "CommodityMetric_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProductComposition" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "percentage" INTEGER NOT NULL,
  "colorKey" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "ProductComposition_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "RegionalCommodityStat" (
  "id" TEXT NOT NULL,
  "regency" TEXT NOT NULL,
  "productionTon" INTEGER NOT NULL,
  "pricePerKg" INTEGER NOT NULL,
  "trend30DayPercent" INTEGER NOT NULL,
  "centersCount" INTEGER NOT NULL,
  "activePartnersCount" INTEGER NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "RegionalCommodityStat_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FeaturedCenter" (
  "id" TEXT NOT NULL,
  "area" TEXT NOT NULL,
  "village" TEXT NOT NULL,
  "rank" INTEGER NOT NULL,
  "farmersCount" INTEGER NOT NULL,
  "productionTon" INTEGER NOT NULL,
  "growthPercent" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "FeaturedCenter_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DashboardUpdate" (
  "id" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "DashboardUpdate_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CommodityMetric_period_key" ON "CommodityMetric"("period");
CREATE INDEX "CommodityMetric_period_idx" ON "CommodityMetric"("period");
