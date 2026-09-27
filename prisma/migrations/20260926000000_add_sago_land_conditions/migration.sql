CREATE TABLE "SagoLandCondition" (
  "id" TEXT NOT NULL,
  "landType" TEXT NOT NULL,
  "areaHa" INTEGER NOT NULL,
  "areaSharePercent" DECIMAL(5,2) NOT NULL,
  "phMin" DECIMAL(3,1) NOT NULL,
  "phMax" DECIMAL(3,1) NOT NULL,
  "drainageCondition" TEXT NOT NULL,
  "organicMatter" TEXT NOT NULL,
  "generalFoodSuitability" TEXT NOT NULL,
  "sagoSuitability" TEXT NOT NULL,
  "annualProductionTon" INTEGER NOT NULL,
  "productivityTonPerHaYear" DECIMAL(5,2) NOT NULL,
  "productionContributionPercent" DECIMAL(5,2) NOT NULL,
  "colorHex" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "SagoLandCondition_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SagoLandCondition_sortOrder_idx" ON "SagoLandCondition"("sortOrder");

INSERT INTO "SagoLandCondition" (
  "id",
  "landType",
  "areaHa",
  "areaSharePercent",
  "phMin",
  "phMax",
  "drainageCondition",
  "organicMatter",
  "generalFoodSuitability",
  "sagoSuitability",
  "annualProductionTon",
  "productivityTonPerHaYear",
  "productionContributionPercent",
  "colorHex",
  "sortOrder",
  "updatedAt"
) VALUES
  ('rawa-pasang-surut', 'Rawa / Pasang Surut', 1250, 34.1, 4.0, 5.5, 'Tergenang musiman-permanen', 'Sedang - Tinggi', 'Rendah', 'Tinggi', 3125, 2.50, 37.0, '#2F7D57', 1, CURRENT_TIMESTAMP),
  ('gambut', 'Gambut', 950, 25.9, 3.5, 4.5, 'Jenuh air, drainase buruk', 'Sangat Tinggi', 'Rendah', 'Tinggi', 2565, 2.70, 30.3, '#D7A62A', 2, CURRENT_TIMESTAMP),
  ('tanah-masam', 'Tanah Masam', 880, 24.0, 4.5, 5.5, 'Drainase sedang', 'Rendah - Sedang', 'Sedang', 'Tinggi', 1936, 2.20, 22.9, '#D86A3A', 3, CURRENT_TIMESTAMP),
  ('lahan-kering-marginal', 'Lahan Kering Marginal', 590, 16.1, 5.0, 6.0, 'Drainase baik, rawan kering', 'Rendah', 'Sedang', 'Sedang', 826, 1.40, 9.8, '#7557A5', 4, CURRENT_TIMESTAMP);
