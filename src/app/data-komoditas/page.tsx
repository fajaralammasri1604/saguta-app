import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  Layers3,
  MapPin,
  UsersRound,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/Button";
import { getCommodityDashboardData } from "@/lib/commodity-data";

export const dynamic = "force-dynamic";

export default async function DataKomoditasPage() {
  const dashboard = await getCommodityDashboardData();
  const stats = [
    {
      label: "Harga Rata-rata",
      value: dashboard.summary.averagePrice.value,
      unit: dashboard.summary.averagePrice.unit,
      note: dashboard.summary.averagePrice.note,
      badge: dashboard.summary.averagePrice.badge,
      color: "border-t-forest-700",
      tone: "bg-[#EAF6E8] text-forest-700",
      icon: CircleDollarSign,
    },
    {
      label: "Volume Produksi",
      value: dashboard.summary.production.value,
      unit: dashboard.summary.production.unit,
      note: dashboard.summary.production.note,
      badge: dashboard.summary.production.badge,
      color: "border-t-gold-600",
      tone: "bg-[#FFF3CC] text-gold-600",
      icon: Layers3,
    },
    {
      label: "Sentra Aktif",
      value: dashboard.summary.centers.value,
      unit: dashboard.summary.centers.unit,
      note: dashboard.summary.centers.note,
      badge: dashboard.summary.centers.badge,
      color: "border-t-[#1F7EA3]",
      tone: "bg-[#E7F0F5] text-[#1F7EA3]",
      icon: MapPin,
    },
    {
      label: "Petani Mitra",
      value: dashboard.summary.farmers.value,
      unit: dashboard.summary.farmers.unit,
      note: dashboard.summary.farmers.note,
      badge: dashboard.summary.farmers.badge,
      color: "border-t-[#D84E1F]",
      tone: "bg-[#FFE9DE] text-[#D84E1F]",
      icon: UsersRound,
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-cream-100">
      <section className="relative overflow-hidden pb-12 pt-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_6%,rgba(107,191,89,0.16),transparent_19rem),radial-gradient(circle_at_88%_12%,rgba(245,184,46,0.18),transparent_18rem),linear-gradient(180deg,#FFFDF7_0%,#FFF8E8_74%,#FAF3DD_100%)]" />
        <div className="section-shell relative">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <Link href="/#beranda" className="flex items-center gap-3" aria-label="Saguta Sultra">
              <BrandLogo className="h-14 w-[4.75rem]" priority />
              <span className="leading-tight">
                <span className="block text-xl font-black text-forest-700">SAGUTA</span>
                <span className="block text-xs font-semibold text-forest-900/70">
                  Data Komoditas Sagu Sultra
                </span>
              </span>
            </Link>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-forest-700/15 bg-[#EAF6E8] px-4 py-2 text-xs font-bold text-forest-900 shadow-card">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-forest-700/15 bg-warm-50">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D84E1F]" />
              </span>
              {dashboard.updatedLabel}
            </div>
          </div>

          <div className="mt-10 grid gap-6 border-b border-forest-700/15 pb-8 xl:grid-cols-[1fr_auto] xl:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#D84E1F]">
                Ekosistem Saguta
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight text-forest-900 sm:text-5xl">
                Data Komoditas Sagu
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5F6F64]">
                Informasi komprehensif mengenai tren harga sagu, volume produksi sagu mentah, analisis nilai produksi sagu per kabupaten di Sulawesi Tenggara, serta rincian data setiap kabupaten yang diurutkan berdasarkan volume produksi tertinggi.
              </p>
            </div>
            <Button href="#laporan" variant="primary" className="w-fit">
              <ArrowDownToLine className="h-5 w-5" />
              Unduh Laporan
            </Button>
          </div>
        </div>
      </section>

      <section className="section-shell pb-16">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className={`min-h-64 rounded-3xl border border-forest-700/10 ${item.color} bg-warm-50 p-6 shadow-card`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${item.tone}`}>
                  <item.icon className="h-6 w-6" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#DDF2DF] px-3 py-1 text-xs font-black text-forest-700">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {item.badge}
                </span>
              </div>
              <p className="mt-6 text-sm font-black uppercase tracking-[0] text-[#5F6F64]">
                {item.label}
              </p>
              <div className="mt-3 flex items-end gap-1 text-forest-900">
                <span className="text-4xl font-black leading-none">{item.value}</span>
                <span className="pb-1 text-base font-black text-[#5F6F64]">{item.unit}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#5F6F64]">{item.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-9 grid gap-5">
          <section className="rounded-3xl border border-forest-700/10 bg-warm-50 p-7 shadow-card">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-forest-900">Harga Sagu per Kabupaten Sulawesi Tenggara (2022-2024)</h2>
                <p className="mt-1 text-sm leading-6 text-[#5F6F64]">Rp/Kg berdasarkan data per kabupaten/kota</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {dashboard.priceTrendLegend.map((item) => (
                  <span key={item.label} className="inline-flex items-center gap-2 text-xs font-black text-forest-900">
                    <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 overflow-x-auto">
              <div className="min-w-[960px]">
                <div className="grid grid-cols-[2.75rem_12rem_1fr] gap-4">
                  <div className="flex items-center justify-center">
                    <span className="-rotate-90 text-sm font-black text-forest-900">Rp/Kg</span>
                  </div>
                  <div className="space-y-4 py-3">
                    {dashboard.priceTrend.map((item) => (
                      <p
                        key={item.regencyCity}
                        className="flex h-[4.125rem] items-center justify-end text-right text-sm font-bold text-forest-900"
                      >
                        {item.regencyCity}
                      </p>
                    ))}
                  </div>
                  <div>
                    <div className="relative border-b border-l border-forest-700/30 pb-4">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(47,62,53,0.26) 1px, transparent 1px)",
                          backgroundSize: "16.666% 100%",
                        }}
                      />
                      <div className="relative space-y-4 py-3">
                        {dashboard.priceTrend.map((item) => (
                          <div key={item.regencyCity} className="grid h-[4.125rem] items-center">
                            <div className="grid gap-1.5">
                              {item.bars.map((bar) => (
                                <div key={bar.year} className="h-4">
                                  <div
                                    className="h-full rounded-r-sm"
                                    style={{
                                      width: `${bar.width}%`,
                                      backgroundColor: bar.color,
                                    }}
                                    title={`${item.regencyCity} ${bar.label}: ${bar.formattedValue}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-7 text-xs font-bold text-forest-900">
                      {dashboard.priceTrendAxis.map((tick) => (
                        <span key={tick.value}>{tick.label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-forest-700/10 bg-warm-50 p-7 shadow-card">
            <h2 className="text-center text-2xl font-black text-forest-900">
              Volume Produksi Sagu Mentah per Kabupaten (2022–2024)
            </h2>

            <div className="mt-8 overflow-x-auto pb-2">
              <div className="min-w-[1040px]" role="img" aria-label="Grafik volume produksi sagu mentah per kabupaten tahun 2022 sampai 2024 dalam ton">
                <div className="grid grid-cols-[3rem_11rem_minmax(650px,1fr)_7.5rem] gap-4">
                  <div className="flex items-center justify-center">
                    <span className="-rotate-90 whitespace-nowrap text-sm font-black text-forest-900">
                      Volume (Ton)
                    </span>
                  </div>

                  <div className="space-y-2 py-2">
                    {dashboard.productionVolumes.map((item) => (
                      <p
                        key={item.regencyCity}
                        className="flex h-10 items-center justify-end text-right text-xs font-bold text-forest-900"
                      >
                        {item.regencyCity}
                      </p>
                    ))}
                  </div>

                  <div>
                    <div className="relative border-b border-l border-forest-700/35 pb-2">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: "linear-gradient(to right, rgba(47,62,53,0.28) 1px, transparent 1px)",
                          backgroundSize: "11.111111% 100%",
                        }}
                      />
                      <div className="relative space-y-2 py-2">
                        {dashboard.productionVolumes.map((item) => (
                          <div key={item.regencyCity} className="grid h-10 items-center">
                            <div className="grid gap-0.5">
                              {item.bars.map((bar) => (
                                <div key={bar.year} className="h-3">
                                  <div
                                    className="h-full min-w-[2px] rounded-r-[1px]"
                                    style={{ width: `${bar.width}%`, backgroundColor: bar.color }}
                                    title={`${item.regencyCity} ${bar.label}: ${bar.formattedValue}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative mt-2 h-5 text-[11px] font-bold text-forest-900">
                      {dashboard.productionVolumeAxis.map((tick, index) => (
                        <span
                          key={tick.value}
                          className="absolute"
                          style={{
                            left: `${(tick.value / 1800) * 100}%`,
                            transform:
                              index === 0
                                ? "translateX(0)"
                                : index === dashboard.productionVolumeAxis.length - 1
                                  ? "translateX(-100%)"
                                  : "translateX(-50%)",
                          }}
                        >
                          {tick.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-3">
                    {dashboard.productionVolumeLegend.map((item) => (
                      <span key={item.label} className="inline-flex items-center gap-2 text-xs font-bold text-forest-900">
                        <span className="h-3 w-3" style={{ backgroundColor: item.color }} />
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-5 rounded-3xl border border-forest-700/10 bg-warm-50 p-5 shadow-card sm:p-7">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#703B8C]">Analisis Produksi 2024</p>
            <h2 className="mt-2 text-2xl font-black text-forest-900 sm:text-3xl">
              Nilai Produksi Sagu 2024 per Kabupaten (Juta Rp)
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5F6F64]">
              Perbandingan nilai produksi sagu pada setiap kabupaten/kota di Sulawesi Tenggara
            </p>
          </div>

          <div className="mt-8 overflow-x-auto pb-2">
            <div
              className="min-w-[920px]"
              role="img"
              aria-label="Grafik nilai produksi sagu tahun 2024 per kabupaten dalam juta rupiah"
            >
              <div className="grid grid-cols-[12rem_minmax(650px,1fr)] gap-4">
                <div className="space-y-2 pb-8">
                  {[...dashboard.productionAnalysis.rows].reverse().map((item) => (
                    <p
                      key={item.regency}
                      className="flex h-10 items-center justify-end text-right text-xs font-bold text-forest-900"
                    >
                      {item.regency}
                    </p>
                  ))}
                </div>

                <div>
                  <div className="relative border-b border-l border-forest-700/40">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: "linear-gradient(to right, rgba(47,62,53,0.3) 1px, transparent 1px)",
                        backgroundSize: "12.5% 100%",
                      }}
                    />
                    <div className="relative space-y-2 py-1">
                      {[...dashboard.productionAnalysis.rows].reverse().map((item) => (
                        <div key={item.regency} className="flex h-10 items-center">
                          <div
                            className="h-7 min-w-[3px] rounded-r-sm border border-[#4C1680] bg-[#703B8C] shadow-sm"
                            style={{ width: `${(item.productionValue / dashboard.productionAnalysis.axisMax) * 100}%` }}
                            title={`${item.regency}: ${item.productionValue.toLocaleString("id-ID", { minimumFractionDigits: 2 })} juta rupiah`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative mt-2 h-6 text-[11px] font-bold text-forest-900">
                    {dashboard.productionAnalysis.axis.map((tick, index) => (
                      <span
                        key={tick.value}
                        className="absolute"
                        style={{
                          left: `${(tick.value / dashboard.productionAnalysis.axisMax) * 100}%`,
                          transform:
                            index === 0
                              ? "translateX(0)"
                              : index === dashboard.productionAnalysis.axis.length - 1
                                ? "translateX(-100%)"
                                : "translateX(-50%)",
                        }}
                      >
                        {tick.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex justify-center">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-forest-900">
                  <span className="h-3 w-3 border border-[#4C1680] bg-[#703B8C]" />
                  Nilai Produksi (Juta Rp)
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-3xl border border-forest-700/10 bg-warm-50 shadow-card">
          <div className="bg-[#703B8C] px-5 py-5 text-center text-white sm:px-7">
            <h2 className="text-lg font-black sm:text-2xl">
              Analisis Gabungan: Volume Produksi &amp; Harga Sagu per Kabupaten 2024
            </h2>
            <p className="mt-2 text-xs italic text-white/80">
              Sulawesi Tenggara | Sumber: BPS Sultra 2025, Jurnal IWI BPSDM Sultra 2025, Survei SAGUTA
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] border-collapse text-left text-xs">
              <thead>
                <tr className="bg-[#703B8C] text-center font-black text-white">
                  <th className="border border-white/35 px-3 py-3">Kabupaten/Kota</th>
                  <th className="border border-white/35 px-3 py-3">Volume 2024<br />(Ton)</th>
                  <th className="border border-white/35 px-3 py-3">Harga 2024<br />(Rp/Kg)</th>
                  <th className="border border-white/35 px-3 py-3">Nilai Produksi<br />(Juta Rp)</th>
                  <th className="border border-white/35 px-3 py-3">Kontribusi<br />Volume (%)</th>
                  <th className="border border-white/35 px-3 py-3">Kontribusi<br />Nilai (%)</th>
                  <th className="border border-white/35 px-3 py-3">Kategori</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.productionAnalysis.rows.map((row, index) => (
                  <tr key={row.regency} className={index % 2 === 0 ? "bg-white" : "bg-[#F5EFF8]"}>
                    <td className="border border-[#D7CEDB] px-3 py-2 font-black text-forest-900">{row.regency}</td>
                    <td className="border border-[#D7CEDB] px-3 py-2 text-center font-bold text-[#2F3E35]">{row.volume}</td>
                    <td className="border border-[#D7CEDB] px-3 py-2 text-center font-bold text-[#2F3E35]">{row.price}</td>
                    <td className="border border-[#D7CEDB] px-3 py-2 text-center font-bold text-[#703B8C]">
                      {row.productionValue.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="border border-[#D7CEDB] px-3 py-2 text-center font-black text-[#16813B]">{row.volumeShare}</td>
                    <td className="border border-[#D7CEDB] px-3 py-2 text-center font-black text-[#703B8C]">{row.valueShare}</td>
                    <td className={`whitespace-nowrap border border-[#D7CEDB] px-3 py-2 font-black ${row.categoryTone}`}>
                      {row.category}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#703B8C] font-black text-white">
                  <td className="border border-white/35 px-3 py-2">TOTAL SULTRA</td>
                  <td className="border border-white/35 px-3 py-2 text-center text-[#FFF200]">{dashboard.productionAnalysis.total.volume}</td>
                  <td className="border border-white/35 px-3 py-2 text-center text-[#FFF200]">{dashboard.productionAnalysis.total.price}</td>
                  <td className="border border-white/35 px-3 py-2 text-center text-[#FFF200]">{dashboard.productionAnalysis.total.productionValue}</td>
                  <td className="border border-white/35 px-3 py-2 text-center text-[#FFF200]">100%</td>
                  <td className="border border-white/35 px-3 py-2 text-center text-[#FFF200]">100%</td>
                  <td className="border border-white/35 px-3 py-2 text-center text-[#FFF200]">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-black text-forest-900">Sentra Unggulan</h2>
          <p className="mt-1 text-sm leading-6 text-[#5F6F64]">Tiga sentra dengan pertumbuhan produksi tercepat bulan ini</p>

          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            {dashboard.featuredCenters.map((center) => (
              <article key={center.village} className="rounded-3xl border border-forest-700/10 bg-warm-50 p-6 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-black uppercase tracking-[0.06em] text-[#D84E1F]">{center.area}</p>
                  <span className="text-lg font-black text-forest-900/15">{center.rank}</span>
                </div>
                <h3 className="mt-3 text-2xl font-black text-forest-900">{center.village}</h3>
                <div className="mt-5 grid grid-cols-3 gap-4 border-t border-forest-700/10 pt-5">
                  <Metric value={center.farmers} label="Petani Mitra" />
                  <Metric value={center.production} label="Produksi/bln" />
                  <Metric value={center.growth} label="vs bln lalu" tone="text-forest-700" />
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm leading-6 text-[#5F6F64]">
            Sumber: BPS Sultra — Statistik Harga Produsen Perdesaan Prov. Sultra 2021–2023 (Publikasi Juli 2024) | sultra.bps.go.id
          </p>
        </section>

        <section id="laporan" className="mt-5 rounded-3xl bg-forest-700 p-7 text-white shadow-soft">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-black">Laporan Komoditas Saguta</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-cream-200">
                Rekap ini disiapkan untuk monitoring petani, UMKM, dan mitra distribusi. Unduhan lengkap akan tersedia saat modul ekspor data diaktifkan.
              </p>
            </div>
            <Link
              href="/#tentang"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-5 text-sm font-black text-forest-900 transition hover:bg-gold-400"
            >
              Kembali ke Ekosistem
              <BarChart3 className="h-5 w-5" />
            </Link>
          </div>
        </section>

        <Link
          href="/#tentang"
          className="mt-8 inline-flex items-center gap-2 text-sm font-black text-forest-700 hover:text-forest-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </section>
    </main>
  );
}

function Metric({
  value,
  label,
  tone = "text-forest-900",
}: {
  value: string;
  label: string;
  tone?: string;
}) {
  return (
    <div>
      <p className={`text-lg font-black ${tone}`}>{value}</p>
      <p className="mt-1 text-xs font-semibold leading-5 text-[#5F6F64]">{label}</p>
    </div>
  );
}
