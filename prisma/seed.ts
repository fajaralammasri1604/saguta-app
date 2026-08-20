import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const metrics = [
    { id: "2026-02", monthLabel: "Feb", period: new Date("2026-02-01T00:00:00.000Z"), pricePerKg: 8150, productionTon: 180, activeCenters: 11, partnerFarmers: 92 },
    { id: "2026-03", monthLabel: "Mar", period: new Date("2026-03-01T00:00:00.000Z"), pricePerKg: 8280, productionTon: 198, activeCenters: 12, partnerFarmers: 98 },
    { id: "2026-04", monthLabel: "Apr", period: new Date("2026-04-01T00:00:00.000Z"), pricePerKg: 8220, productionTon: 207, activeCenters: 13, partnerFarmers: 105 },
    { id: "2026-05", monthLabel: "Mei", period: new Date("2026-05-01T00:00:00.000Z"), pricePerKg: 8380, productionTon: 218, activeCenters: 14, partnerFarmers: 112 },
    { id: "2026-06", monthLabel: "Jun", period: new Date("2026-06-01T00:00:00.000Z"), pricePerKg: 8150, productionTon: 219, activeCenters: 14, partnerFarmers: 110 },
    { id: "2026-07", monthLabel: "Jul", period: new Date("2026-07-01T00:00:00.000Z"), pricePerKg: 8500, productionTon: 245, activeCenters: 15, partnerFarmers: 128 },
  ];

  const compositions = [
    { id: "sagu-kering", name: "Sagu Kering", percentage: 42, colorKey: "forest", sortOrder: 1 },
    { id: "songgi-instan", name: "Songgi Instan", percentage: 31, colorKey: "gold", sortOrder: 2 },
    { id: "tepung-olahan", name: "Tepung Olahan", percentage: 17, colorKey: "blue", sortOrder: 3 },
    { id: "produk-umkm", name: "Produk UMKM", percentage: 10, colorKey: "orange", sortOrder: 4 },
  ];

  const priceTrends = [
    { id: "konawe", regencyCity: "Konawe", price2022RpKg: 3400, price2023RpKg: 3900, price2024RpKg: 4500, sortOrder: 1 },
    { id: "konawe-selatan", regencyCity: "Konawe Selatan", price2022RpKg: 3300, price2023RpKg: 3800, price2024RpKg: 4200, sortOrder: 2 },
    { id: "kolaka-timur", regencyCity: "Kolaka Timur", price2022RpKg: 3300, price2023RpKg: 3800, price2024RpKg: 4300, sortOrder: 3 },
    { id: "konawe-utara", regencyCity: "Konawe Utara", price2022RpKg: 3200, price2023RpKg: 3700, price2024RpKg: 4100, sortOrder: 4 },
    { id: "konawe-kepulauan", regencyCity: "Konawe Kepulauan", price2022RpKg: 3400, price2023RpKg: 3900, price2024RpKg: 4400, sortOrder: 5 },
    { id: "kolaka", regencyCity: "Kolaka", price2022RpKg: 3700, price2023RpKg: 4200, price2024RpKg: 5000, sortOrder: 6 },
    { id: "bombana", regencyCity: "Bombana", price2022RpKg: 3200, price2023RpKg: 3700, price2024RpKg: 4200, sortOrder: 7 },
    { id: "muna", regencyCity: "Muna", price2022RpKg: 3100, price2023RpKg: 3500, price2024RpKg: 4000, sortOrder: 8 },
    { id: "buton", regencyCity: "Buton", price2022RpKg: 3200, price2023RpKg: 3600, price2024RpKg: 4100, sortOrder: 9 },
    { id: "buton-tengah", regencyCity: "Buton Tengah", price2022RpKg: 3100, price2023RpKg: 3500, price2024RpKg: 3900, sortOrder: 10 },
    { id: "wakatobi", regencyCity: "Wakatobi", price2022RpKg: 3700, price2023RpKg: 4200, price2024RpKg: 4800, sortOrder: 11 },
    { id: "kota-kendari", regencyCity: "Kota Kendari", price2022RpKg: 3400, price2023RpKg: 3800, price2024RpKg: 4500, sortOrder: 12 },
    { id: "lainnya", regencyCity: "Lainnya / Kab. lain", price2022RpKg: 3000, price2023RpKg: 3500, price2024RpKg: 3900, sortOrder: 13 },
  ].map((item) => ({
    ...item,
    averagePriceRp: Math.round((item.price2022RpKg + item.price2023RpKg + item.price2024RpKg) / 3),
  }));

  const productionVolumes = [
    { id: "lainnya", regencyCity: "Lainnya / Kab. lain", production2022Ton: 34, production2023Ton: 127, production2024Ton: 129, sortOrder: 1 },
    { id: "kota-kendari", regencyCity: "Kota Kendari", production2022Ton: 34, production2023Ton: 32, production2024Ton: 32, sortOrder: 2 },
    { id: "wakatobi", regencyCity: "Wakatobi", production2022Ton: 39, production2023Ton: 36, production2024Ton: 36, sortOrder: 3 },
    { id: "buton-tengah", regencyCity: "Buton Tengah", production2022Ton: 46, production2023Ton: 41, production2024Ton: 44, sortOrder: 4 },
    { id: "buton", regencyCity: "Buton", production2022Ton: 63, production2023Ton: 56, production2024Ton: 56, sortOrder: 5 },
    { id: "muna", regencyCity: "Muna", production2022Ton: 83, production2023Ton: 76, production2024Ton: 76, sortOrder: 6 },
    { id: "bombana", regencyCity: "Bombana", production2022Ton: 112, production2023Ton: 95, production2024Ton: 95, sortOrder: 7 },
    { id: "kolaka", regencyCity: "Kolaka", production2022Ton: 183, production2023Ton: 158, production2024Ton: 158, sortOrder: 8 },
    { id: "konawe-kepulauan", regencyCity: "Konawe Kepulauan", production2022Ton: 195, production2023Ton: 203, production2024Ton: 210, sortOrder: 9 },
    { id: "konawe-utara", regencyCity: "Konawe Utara", production2022Ton: 245, production2023Ton: 263, production2024Ton: 265, sortOrder: 10 },
    { id: "kolaka-timur", regencyCity: "Kolaka Timur", production2022Ton: 645, production2023Ton: 680, production2024Ton: 680, sortOrder: 11 },
    { id: "konawe-selatan", regencyCity: "Konawe Selatan", production2022Ton: 1050, production2023Ton: 1100, production2024Ton: 1110, sortOrder: 12 },
    { id: "konawe", regencyCity: "Konawe", production2022Ton: 1520, production2023Ton: 1550, production2024Ton: 1560, sortOrder: 13 },
  ];

  const productionAnalyses = [
    { id: "konawe", regency: "Konawe", production2024Ton: "1560.50", price2024RpKg: 4500, productionValueMillionRp: "7.02", volumeSharePercent: "35.3", valueSharePercent: "36.6", category: "★★★ Sentra Utama", categoryLevel: "primary", sortOrder: 1 },
    { id: "konawe-selatan", regency: "Konawe Selatan", production2024Ton: "1102.00", price2024RpKg: 4200, productionValueMillionRp: "4.63", volumeSharePercent: "25.0", valueSharePercent: "24.1", category: "★★★ Sentra Utama", categoryLevel: "primary", sortOrder: 2 },
    { id: "kolaka-timur", regency: "Kolaka Timur", production2024Ton: "678.50", price2024RpKg: 4300, productionValueMillionRp: "2.92", volumeSharePercent: "15.4", valueSharePercent: "15.2", category: "★★★ Sentra Utama", categoryLevel: "primary", sortOrder: 3 },
    { id: "konawe-utara", regency: "Konawe Utara", production2024Ton: "262.00", price2024RpKg: 4100, productionValueMillionRp: "1.07", volumeSharePercent: "5.9", valueSharePercent: "5.6", category: "★★ Sentra Menengah", categoryLevel: "medium", sortOrder: 4 },
    { id: "konawe-kepulauan", regency: "Konawe Kepulauan", production2024Ton: "208.00", price2024RpKg: 4400, productionValueMillionRp: "0.92", volumeSharePercent: "4.7", valueSharePercent: "4.8", category: "★★ Sentra Menengah", categoryLevel: "medium", sortOrder: 5 },
    { id: "kolaka", regency: "Kolaka", production2024Ton: "155.00", price2024RpKg: 5000, productionValueMillionRp: "0.78", volumeSharePercent: "3.5", valueSharePercent: "4.1", category: "★ Sentra Kecil", categoryLevel: "small", sortOrder: 6 },
    { id: "bombana", regency: "Bombana", production2024Ton: "93.00", price2024RpKg: 4200, productionValueMillionRp: "0.39", volumeSharePercent: "2.1", valueSharePercent: "2.0", category: "★ Sentra Kecil", categoryLevel: "small", sortOrder: 7 },
    { id: "muna", regency: "Muna", production2024Ton: "72.50", price2024RpKg: 4000, productionValueMillionRp: "0.29", volumeSharePercent: "1.6", valueSharePercent: "1.5", category: "★ Sentra Kecil", categoryLevel: "small", sortOrder: 8 },
    { id: "buton", regency: "Buton", production2024Ton: "54.00", price2024RpKg: 4100, productionValueMillionRp: "0.22", volumeSharePercent: "1.2", valueSharePercent: "1.1", category: "★ Sentra Kecil", categoryLevel: "small", sortOrder: 9 },
    { id: "buton-tengah", regency: "Buton Tengah", production2024Ton: "41.00", price2024RpKg: 3900, productionValueMillionRp: "0.16", volumeSharePercent: "0.9", valueSharePercent: "0.8", category: "○ Pengembangan", categoryLevel: "development", sortOrder: 10 },
    { id: "wakatobi", regency: "Wakatobi", production2024Ton: "35.50", price2024RpKg: 4800, productionValueMillionRp: "0.17", volumeSharePercent: "0.8", valueSharePercent: "0.9", category: "○ Pengembangan", categoryLevel: "development", sortOrder: 11 },
    { id: "kota-kendari", regency: "Kota Kendari", production2024Ton: "28.12", price2024RpKg: 4500, productionValueMillionRp: "0.13", volumeSharePercent: "0.6", valueSharePercent: "0.7", category: "○ Pengembangan", categoryLevel: "development", sortOrder: 12 },
    { id: "lainnya", regency: "Lainnya / Kab. lain", production2024Ton: "126.50", price2024RpKg: 3900, productionValueMillionRp: "0.49", volumeSharePercent: "2.9", valueSharePercent: "2.6", category: "★ Sentra Kecil", categoryLevel: "small", sortOrder: 13 },
  ];

  const regions = [
    { id: "konawe", regency: "Konawe", productionTon: 54, pricePerKg: 8650, trend30DayPercent: 21, centersCount: 4, activePartnersCount: 18, sortOrder: 1 },
    { id: "kolaka", regency: "Kolaka", productionTon: 46, pricePerKg: 8420, trend30DayPercent: 9, centersCount: 3, activePartnersCount: 15, sortOrder: 2 },
    { id: "konawe-selatan", regency: "Konawe Selatan", productionTon: 39, pricePerKg: 8500, trend30DayPercent: 15, centersCount: 3, activePartnersCount: 14, sortOrder: 3 },
    { id: "buton-utara", regency: "Buton Utara", productionTon: 31, pricePerKg: 8280, trend30DayPercent: 7, centersCount: 2, activePartnersCount: 11, sortOrder: 4 },
    { id: "muna", regency: "Muna", productionTon: 27, pricePerKg: 8360, trend30DayPercent: 5, centersCount: 2, activePartnersCount: 8, sortOrder: 5 },
  ];

  const centers = [
    { id: "desa-galu", area: "Kec. Anggalomoare, Konawe", village: "Desa Galu", rank: 1, farmersCount: 50, productionTon: 68, growthPercent: 21 },
    { id: "desa-wolasi-jaya", area: "Kec. Wolasi, Konawe Selatan", village: "Desa Wolasi Jaya", rank: 2, farmersCount: 34, productionTon: 45, growthPercent: 15 },
    { id: "desa-sagu-makmur", area: "Kec. Wundulako, Kolaka", village: "Desa Sagu Makmur", rank: 3, farmersCount: 28, productionTon: 38, growthPercent: 9 },
  ];

  for (const metric of metrics) {
    await prisma.commodityMetric.upsert({
      where: { id: metric.id },
      update: metric,
      create: metric,
    });
  }

  for (const composition of compositions) {
    await prisma.productComposition.upsert({
      where: { id: composition.id },
      update: composition,
      create: composition,
    });
  }

  for (const priceTrend of priceTrends) {
    await prisma.sagoPriceTrend.upsert({
      where: { id: priceTrend.id },
      update: priceTrend,
      create: priceTrend,
    });
  }

  for (const productionVolume of productionVolumes) {
    await prisma.sagoProductionVolume.upsert({
      where: { id: productionVolume.id },
      update: productionVolume,
      create: productionVolume,
    });
  }

  for (const productionAnalysis of productionAnalyses) {
    await prisma.sagoProductionAnalysis.upsert({
      where: { id: productionAnalysis.id },
      update: productionAnalysis,
      create: productionAnalysis,
    });
  }

  for (const region of regions) {
    await prisma.regionalCommodityStat.upsert({
      where: { id: region.id },
      update: region,
      create: region,
    });
  }

  for (const center of centers) {
    await prisma.featuredCenter.upsert({
      where: { id: center.id },
      update: center,
      create: center,
    });
  }

  await prisma.dashboardUpdate.upsert({
    where: { id: "commodity-dashboard" },
    update: { label: "Diperbarui hari ini, 21 Jul 2026 - 14:30 WITA" },
    create: {
      id: "commodity-dashboard",
      label: "Diperbarui hari ini, 21 Jul 2026 - 14:30 WITA",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
