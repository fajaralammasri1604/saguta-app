import { prisma } from "@/lib/prisma";

export type CommodityDashboardData = Awaited<ReturnType<typeof getCommodityDashboardData>>;

function formatRupiah(value: number) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

function formatPercent(value: number) {
  const absValue = Math.abs(value);
  return `${absValue.toFixed(1)}%`;
}

function formatSignedPercent(value: number) {
  return `${value >= 0 ? "+" : "-"}${Math.abs(value)}%`;
}

function formatChangeNote(current: number, previous: number | undefined, unit: string) {
  if (!previous) {
    return "Data bulan sebelumnya belum tersedia";
  }

  const direction = current >= previous ? "Naik" : "Turun";
  const formattedPrevious = unit === "rupiah" ? formatRupiah(previous) : `${previous} ${unit}`;

  return `${direction} dari ${formattedPrevious} bulan lalu`;
}

function calculatePercentChange(current: number, previous: number | undefined) {
  if (!previous) {
    return 0;
  }

  return ((current - previous) / previous) * 100;
}

function formatNumber(value: number, fractionDigits: number) {
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function getCategoryTone(categoryLevel: string) {
  switch (categoryLevel) {
    case "primary":
      return "text-[#16813B]";
    case "medium":
      return "text-[#2E75B6]";
    case "small":
      return "text-[#B17900]";
    default:
      return "text-[#6B7280]";
  }
}

function createProductionValueAxis(maxValue: number) {
  if (maxValue <= 0) {
    return { max: 1, ticks: [0, 1] };
  }

  const roughStep = maxValue / 8;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const normalizedStep = roughStep / magnitude;
  const niceMultiplier = normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10;
  const step = niceMultiplier * magnitude;
  const max = Math.ceil(maxValue / step) * step;
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, index) => index * step);

  return { max, ticks };
}

export async function getCommodityDashboardData() {
  const [metrics, priceTrends, productionVolumes, productionAnalyses, landConditions, regions, featuredCenters, dashboardUpdate] =
    await Promise.all([
      prisma.commodityMetric.findMany({
        orderBy: { period: "desc" },
      }),
      prisma.sagoPriceTrend.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      prisma.sagoProductionVolume.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      prisma.sagoProductionAnalysis.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      prisma.sagoLandCondition.findMany({
        orderBy: { sortOrder: "asc" },
      }),
      prisma.regionalCommodityStat.findMany({
        orderBy: [{ productionTon: "desc" }, { sortOrder: "asc" }],
      }),
      prisma.featuredCenter.findMany({
        orderBy: { rank: "asc" },
        take: 3,
      }),
      prisma.dashboardUpdate.findUnique({
        where: { id: "commodity-dashboard" },
      }),
    ]).catch((error) => {
      console.error("Commodity database connection failed", error);
      return getFallbackCommodityRows();
    });

  const latestMetric = metrics[0];
  const previousMetric = metrics[1];
  const latestPrice = latestMetric?.pricePerKg ?? 0;
  const latestProduction = latestMetric?.productionTon ?? 0;
  const latestCenters = latestMetric?.activeCenters ?? 0;
  const latestFarmers = latestMetric?.partnerFarmers ?? 0;
  const farmerDiff = previousMetric ? latestFarmers - previousMetric.partnerFarmers : latestFarmers;
  const maxTrendPrice = Math.max(
    6000,
    ...priceTrends.flatMap((item) => [
      item.price2022RpKg,
      item.price2023RpKg,
      item.price2024RpKg,
    ]),
    0,
  );
  // The analysis table was added after the price and volume tables. Some
  // deployments therefore have both source datasets, but no analysis rows
  // yet. Keep the dashboard useful in that state by using the same baseline
  // analysis records that are installed by the database migration/seed.
  const effectiveProductionAnalyses =
    productionAnalyses.length > 0 ? productionAnalyses : getFallbackProductionAnalyses();
  const effectiveLandConditions =
    landConditions.length > 0 ? landConditions : getFallbackLandConditions();
  const productionAnalysisRows = effectiveProductionAnalyses.map((item) => ({
    regency: item.regency,
    volumeValue: Number(item.production2024Ton),
    volume: formatNumber(Number(item.production2024Ton), 2),
    priceValue: item.price2024RpKg,
    price: item.price2024RpKg.toLocaleString("id-ID"),
    productionValue: Number(item.productionValueMillionRp),
    volumeShare: `${formatNumber(Number(item.volumeSharePercent), 1)}%`,
    valueShare: `${formatNumber(Number(item.valueSharePercent), 1)}%`,
    category: item.category,
    categoryTone: getCategoryTone(item.categoryLevel),
  }));
  const productionValueAxis = createProductionValueAxis(
    Math.max(0, ...productionAnalysisRows.map((item) => item.productionValue)),
  );
  const totalProductionVolume = productionAnalysisRows.reduce((total, item) => total + item.volumeValue, 0);
  const totalProductionValue = productionAnalysisRows.reduce((total, item) => total + item.productionValue, 0);
  const weightedPriceTotal = productionAnalysisRows.reduce(
    (total, item) => total + item.volumeValue * item.priceValue,
    0,
  );
  const averagePrice =
    totalProductionVolume > 0
      ? Math.round(weightedPriceTotal / totalProductionVolume / 100) * 100
      : 0;
  const totalLandArea = effectiveLandConditions.reduce((total, item) => total + item.areaHa, 0);
  const totalLandProduction = effectiveLandConditions.reduce(
    (total, item) => total + item.annualProductionTon,
    0,
  );
  const maxLandArea = Math.max(1, ...effectiveLandConditions.map((item) => item.areaHa));
  const maxLandProduction = Math.max(
    1,
    ...effectiveLandConditions.map((item) => item.annualProductionTon),
  );
  const maxLandProductivity = Math.max(
    1,
    ...effectiveLandConditions.map((item) => Number(item.productivityTonPerHaYear)),
  );
  let pieCursor = 0;
  const landPieSegments = effectiveLandConditions.map((item) => {
    const start = pieCursor;
    const share = totalLandArea > 0 ? (item.areaHa / totalLandArea) * 100 : 0;
    pieCursor += share;
    return `${item.colorHex} ${start.toFixed(2)}% ${pieCursor.toFixed(2)}%`;
  });
  const landConditionRows = effectiveLandConditions.map((item) => ({
    id: item.id,
    landType: item.landType,
    areaHa: item.areaHa,
    area: item.areaHa.toLocaleString("id-ID"),
    areaShare: `${formatNumber(Number(item.areaSharePercent), 1)}%`,
    phRange: `${formatNumber(Number(item.phMin), 1)}–${formatNumber(Number(item.phMax), 1)}`,
    drainageCondition: item.drainageCondition,
    organicMatter: item.organicMatter,
    generalFoodSuitability: item.generalFoodSuitability,
    sagoSuitability: item.sagoSuitability,
    annualProductionTon: item.annualProductionTon,
    annualProduction: item.annualProductionTon.toLocaleString("id-ID"),
    productivity: Number(item.productivityTonPerHaYear),
    productivityLabel: formatNumber(Number(item.productivityTonPerHaYear), 2),
    productionContribution: `${formatNumber(Number(item.productionContributionPercent), 1)}%`,
    color: item.colorHex,
    areaWidth: (item.areaHa / maxLandArea) * 100,
    productionWidth: (item.annualProductionTon / maxLandProduction) * 100,
    productivityHeight: (Number(item.productivityTonPerHaYear) / maxLandProductivity) * 100,
  }));

  return {
    updatedLabel: dashboardUpdate?.label ?? "Data komoditas belum diperbarui",
    activeCenters: latestCenters,
    summary: {
      averagePrice: {
        value: formatRupiah(latestPrice),
        unit: "/kg",
        note: formatChangeNote(latestPrice, previousMetric?.pricePerKg, "rupiah"),
        badge: formatPercent(calculatePercentChange(latestPrice, previousMetric?.pricePerKg)),
      },
      production: {
        value: latestProduction.toLocaleString("id-ID"),
        unit: "ton/bln",
        note: latestCenters > 0 ? `Dari ${latestCenters} sentra aktif` : "Belum ada sentra aktif",
        badge: formatPercent(calculatePercentChange(latestProduction, previousMetric?.productionTon)),
      },
      centers: {
        value: latestCenters.toLocaleString("id-ID"),
        unit: "kab/kota",
        note: "Data mengikuti input database terbaru",
        badge: `${latestCenters}/17`,
      },
      farmers: {
        value: latestFarmers.toLocaleString("id-ID"),
        unit: "orang",
        note: farmerDiff >= 0 ? "Bertambah bulan ini" : "Berkurang bulan ini",
        badge: `${farmerDiff >= 0 ? "+" : "-"}${Math.abs(farmerDiff)}`,
      },
    },
    landCondition: {
      rows: landConditionRows,
      pieGradient: `conic-gradient(${landPieSegments.join(", ")})`,
      totals: {
        area: totalLandArea.toLocaleString("id-ID"),
        production: totalLandProduction.toLocaleString("id-ID"),
        productivity:
          totalLandArea > 0 ? formatNumber(totalLandProduction / totalLandArea, 2) : "0,00",
      },
    },
    priceTrend: priceTrends.map((item) => ({
      regencyCity: item.regencyCity,
      price2022: formatRupiah(item.price2022RpKg),
      price2023: formatRupiah(item.price2023RpKg),
      price2024: formatRupiah(item.price2024RpKg),
      averagePrice: formatRupiah(item.averagePriceRp),
      bars: [
        {
          year: "2022",
          label: "2022 (Rp/Kg)",
          value: item.price2022RpKg,
          formattedValue: formatRupiah(item.price2022RpKg),
          color: "#2E75B6",
          width: maxTrendPrice > 0 ? Math.max(8, Math.round((item.price2022RpKg / maxTrendPrice) * 100)) : 0,
        },
        {
          year: "2023",
          label: "2023 (Rp/Kg)",
          value: item.price2023RpKg,
          formattedValue: formatRupiah(item.price2023RpKg),
          color: "#C55A11",
          width: maxTrendPrice > 0 ? Math.max(8, Math.round((item.price2023RpKg / maxTrendPrice) * 100)) : 0,
        },
        {
          year: "2024",
          label: "2024 (Rp/Kg)",
          value: item.price2024RpKg,
          formattedValue: formatRupiah(item.price2024RpKg),
          color: "#375623",
          width: maxTrendPrice > 0 ? Math.max(8, Math.round((item.price2024RpKg / maxTrendPrice) * 100)) : 0,
        },
      ],
    })),
    priceTrendAxis: [0, 1000, 2000, 3000, 4000, 5000, 6000].map((value) => ({
      value,
      label: value.toLocaleString("id-ID"),
    })),
    priceTrendLegend: [
      { label: "2024 (Rp/Kg)", color: "#375623" },
      { label: "2023 (Rp/Kg)", color: "#C55A11" },
      { label: "2022 (Rp/Kg)", color: "#2E75B6" },
    ],
    productionVolumes: productionVolumes.map((item) => ({
      regencyCity: item.regencyCity,
      bars: [
        {
          year: "2024",
          label: "2024 (Ton)",
          value: item.production2024Ton,
          formattedValue: `${item.production2024Ton.toLocaleString("id-ID")} ton`,
          color: "#70AD47",
          width: (item.production2024Ton / 1800) * 100,
        },
        {
          year: "2023",
          label: "2023 (Ton)",
          value: item.production2023Ton,
          formattedValue: `${item.production2023Ton.toLocaleString("id-ID")} ton`,
          color: "#ED7D31",
          width: (item.production2023Ton / 1800) * 100,
        },
        {
          year: "2022",
          label: "2022 (Ton)",
          value: item.production2022Ton,
          formattedValue: `${item.production2022Ton.toLocaleString("id-ID")} ton`,
          color: "#5B9BD5",
          width: (item.production2022Ton / 1800) * 100,
        },
      ],
    })),
    productionVolumeAxis: Array.from({ length: 10 }, (_, index) => {
      const value = index * 200;
      return { value, label: value.toLocaleString("id-ID") };
    }),
    productionVolumeLegend: [
      { label: "2024 (Ton)", color: "#70AD47" },
      { label: "2023 (Ton)", color: "#ED7D31" },
      { label: "2022 (Ton)", color: "#5B9BD5" },
    ],
    productionAnalysis: {
      rows: productionAnalysisRows,
      axis: productionValueAxis.ticks.map((value) => ({
        value,
        label: formatNumber(value, Number.isInteger(value) ? 2 : 1),
      })),
      axisMax: productionValueAxis.max,
      total: {
        volume: formatNumber(totalProductionVolume, 2),
        price: averagePrice.toLocaleString("id-ID"),
        productionValue: formatNumber(totalProductionValue, 2),
      },
    },
    regions: regions.slice(0, 4).map((region) => ({
      name: region.regency,
      volume: `${region.productionTon} ton`,
      price: formatRupiah(region.pricePerKg),
      active: `${region.activePartnersCount} mitra`,
    })),
    districtRows: regions.map((region) => ({
      regency: region.regency,
      production: `${region.productionTon} ton`,
      price: formatRupiah(region.pricePerKg),
      trend: formatSignedPercent(region.trend30DayPercent),
      centers: `${region.centersCount} sentra`,
    })),
    featuredCenters: featuredCenters.map((center) => ({
      area: center.area,
      village: center.village,
      rank: center.rank.toString().padStart(2, "0"),
      farmers: `${center.farmersCount}+`,
      production: `${center.productionTon} ton`,
      growth: formatSignedPercent(center.growthPercent),
    })),
  };
}

function getFallbackCommodityRows() {
  const fallbackPriceTrends = [
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

  const fallbackProductionVolumes = [
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

  return [
    [
      { id: "2026-07", monthLabel: "Jul", period: new Date("2026-07-01T00:00:00.000Z"), pricePerKg: 8500, productionTon: 245, activeCenters: 15, partnerFarmers: 128 },
      { id: "2026-06", monthLabel: "Jun", period: new Date("2026-06-01T00:00:00.000Z"), pricePerKg: 8150, productionTon: 219, activeCenters: 14, partnerFarmers: 110 },
      { id: "2026-05", monthLabel: "Mei", period: new Date("2026-05-01T00:00:00.000Z"), pricePerKg: 8380, productionTon: 218, activeCenters: 14, partnerFarmers: 112 },
      { id: "2026-04", monthLabel: "Apr", period: new Date("2026-04-01T00:00:00.000Z"), pricePerKg: 8220, productionTon: 207, activeCenters: 13, partnerFarmers: 105 },
      { id: "2026-03", monthLabel: "Mar", period: new Date("2026-03-01T00:00:00.000Z"), pricePerKg: 8280, productionTon: 198, activeCenters: 12, partnerFarmers: 98 },
      { id: "2026-02", monthLabel: "Feb", period: new Date("2026-02-01T00:00:00.000Z"), pricePerKg: 8150, productionTon: 180, activeCenters: 11, partnerFarmers: 92 },
    ],
    fallbackPriceTrends,
    fallbackProductionVolumes,
    getFallbackProductionAnalyses(),
    getFallbackLandConditions(),
    [
      { id: "konawe", regency: "Konawe", productionTon: 54, pricePerKg: 8650, trend30DayPercent: 21, centersCount: 4, activePartnersCount: 18, sortOrder: 1 },
      { id: "kolaka", regency: "Kolaka", productionTon: 46, pricePerKg: 8420, trend30DayPercent: 9, centersCount: 3, activePartnersCount: 15, sortOrder: 2 },
      { id: "konawe-selatan", regency: "Konawe Selatan", productionTon: 39, pricePerKg: 8500, trend30DayPercent: 15, centersCount: 3, activePartnersCount: 14, sortOrder: 3 },
      { id: "buton-utara", regency: "Buton Utara", productionTon: 31, pricePerKg: 8280, trend30DayPercent: 7, centersCount: 2, activePartnersCount: 11, sortOrder: 4 },
      { id: "muna", regency: "Muna", productionTon: 27, pricePerKg: 8360, trend30DayPercent: 5, centersCount: 2, activePartnersCount: 8, sortOrder: 5 },
    ],
    [
      { id: "desa-galu", area: "Kec. Anggalomoare, Konawe", village: "Desa Galu", rank: 1, farmersCount: 50, productionTon: 68, growthPercent: 21 },
      { id: "desa-wolasi-jaya", area: "Kec. Wolasi, Konawe Selatan", village: "Desa Wolasi Jaya", rank: 2, farmersCount: 34, productionTon: 45, growthPercent: 15 },
      { id: "desa-sagu-makmur", area: "Kec. Wundulako, Kolaka", village: "Desa Sagu Makmur", rank: 3, farmersCount: 28, productionTon: 38, growthPercent: 9 },
    ],
    {
      id: "commodity-dashboard",
      label: "Database belum terhubung - menampilkan data awal",
      updatedAt: new Date(),
    },
  ] as const;
}

function getFallbackLandConditions() {
  return [
    { id: "rawa-pasang-surut", landType: "Rawa / Pasang Surut", areaHa: 1250, areaSharePercent: "34.1", phMin: "4.0", phMax: "5.5", drainageCondition: "Tergenang musiman-permanen", organicMatter: "Sedang - Tinggi", generalFoodSuitability: "Rendah", sagoSuitability: "Tinggi", annualProductionTon: 3125, productivityTonPerHaYear: "2.50", productionContributionPercent: "37.0", colorHex: "#2F7D57", sortOrder: 1 },
    { id: "gambut", landType: "Gambut", areaHa: 950, areaSharePercent: "25.9", phMin: "3.5", phMax: "4.5", drainageCondition: "Jenuh air, drainase buruk", organicMatter: "Sangat Tinggi", generalFoodSuitability: "Rendah", sagoSuitability: "Tinggi", annualProductionTon: 2565, productivityTonPerHaYear: "2.70", productionContributionPercent: "30.3", colorHex: "#D7A62A", sortOrder: 2 },
    { id: "tanah-masam", landType: "Tanah Masam", areaHa: 880, areaSharePercent: "24.0", phMin: "4.5", phMax: "5.5", drainageCondition: "Drainase sedang", organicMatter: "Rendah - Sedang", generalFoodSuitability: "Sedang", sagoSuitability: "Tinggi", annualProductionTon: 1936, productivityTonPerHaYear: "2.20", productionContributionPercent: "22.9", colorHex: "#D86A3A", sortOrder: 3 },
    { id: "lahan-kering-marginal", landType: "Lahan Kering Marginal", areaHa: 590, areaSharePercent: "16.1", phMin: "5.0", phMax: "6.0", drainageCondition: "Drainase baik, rawan kering", organicMatter: "Rendah", generalFoodSuitability: "Sedang", sagoSuitability: "Sedang", annualProductionTon: 826, productivityTonPerHaYear: "1.40", productionContributionPercent: "9.8", colorHex: "#7557A5", sortOrder: 4 },
  ];
}

function getFallbackProductionAnalyses() {
  return [
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
}
