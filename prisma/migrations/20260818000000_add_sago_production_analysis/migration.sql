CREATE TABLE "SagoProductionAnalysis" (
  "id" TEXT NOT NULL,
  "regency" TEXT NOT NULL,
  "production2024Ton" DECIMAL(12,2) NOT NULL,
  "price2024RpKg" INTEGER NOT NULL,
  "productionValueMillionRp" DECIMAL(12,2) NOT NULL,
  "volumeSharePercent" DECIMAL(5,2) NOT NULL,
  "valueSharePercent" DECIMAL(5,2) NOT NULL,
  "category" TEXT NOT NULL,
  "categoryLevel" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "SagoProductionAnalysis_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SagoProductionAnalysis_sortOrder_idx" ON "SagoProductionAnalysis"("sortOrder");

INSERT INTO "SagoProductionAnalysis" (
  "id",
  "regency",
  "production2024Ton",
  "price2024RpKg",
  "productionValueMillionRp",
  "volumeSharePercent",
  "valueSharePercent",
  "category",
  "categoryLevel",
  "sortOrder",
  "updatedAt"
) VALUES
  ('konawe', 'Konawe', 1560.50, 4500, 7.02, 35.3, 36.6, '★★★ Sentra Utama', 'primary', 1, CURRENT_TIMESTAMP),
  ('konawe-selatan', 'Konawe Selatan', 1102.00, 4200, 4.63, 25.0, 24.1, '★★★ Sentra Utama', 'primary', 2, CURRENT_TIMESTAMP),
  ('kolaka-timur', 'Kolaka Timur', 678.50, 4300, 2.92, 15.4, 15.2, '★★★ Sentra Utama', 'primary', 3, CURRENT_TIMESTAMP),
  ('konawe-utara', 'Konawe Utara', 262.00, 4100, 1.07, 5.9, 5.6, '★★ Sentra Menengah', 'medium', 4, CURRENT_TIMESTAMP),
  ('konawe-kepulauan', 'Konawe Kepulauan', 208.00, 4400, 0.92, 4.7, 4.8, '★★ Sentra Menengah', 'medium', 5, CURRENT_TIMESTAMP),
  ('kolaka', 'Kolaka', 155.00, 5000, 0.78, 3.5, 4.1, '★ Sentra Kecil', 'small', 6, CURRENT_TIMESTAMP),
  ('bombana', 'Bombana', 93.00, 4200, 0.39, 2.1, 2.0, '★ Sentra Kecil', 'small', 7, CURRENT_TIMESTAMP),
  ('muna', 'Muna', 72.50, 4000, 0.29, 1.6, 1.5, '★ Sentra Kecil', 'small', 8, CURRENT_TIMESTAMP),
  ('buton', 'Buton', 54.00, 4100, 0.22, 1.2, 1.1, '★ Sentra Kecil', 'small', 9, CURRENT_TIMESTAMP),
  ('buton-tengah', 'Buton Tengah', 41.00, 3900, 0.16, 0.9, 0.8, '○ Pengembangan', 'development', 10, CURRENT_TIMESTAMP),
  ('wakatobi', 'Wakatobi', 35.50, 4800, 0.17, 0.8, 0.9, '○ Pengembangan', 'development', 11, CURRENT_TIMESTAMP),
  ('kota-kendari', 'Kota Kendari', 28.12, 4500, 0.13, 0.6, 0.7, '○ Pengembangan', 'development', 12, CURRENT_TIMESTAMP),
  ('lainnya', 'Lainnya / Kab. lain', 126.50, 3900, 0.49, 2.9, 2.6, '★ Sentra Kecil', 'small', 13, CURRENT_TIMESTAMP);
