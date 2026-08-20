# Database Komoditas Saguta

Project ini memakai Prisma 7 + PostgreSQL. Halaman `/data-komoditas` membaca data langsung dari database, jadi perubahan di tabel akan otomatis memengaruhi grafik dan ringkasan halaman.

## Setup

1. Buat database PostgreSQL, misalnya di Neon, Supabase, Railway, atau Prisma Postgres.
2. Isi `DATABASE_URL` di `.env` lokal atau environment variable hosting.
3. Jalankan migration:

```bash
npm run db:deploy
```

4. Isi data awal:

```bash
npm run db:seed
```

5. Untuk input/edit data manual sebelum halaman admin dibuat:

```bash
npm run db:studio
```

## Tabel

- `CommodityMetric`: data bulanan untuk grafik tren harga dan kartu ringkasan.
- `ProductComposition`: persentase komposisi produk.
- `SagoPriceTrend`: data grafik harga sagu per kabupaten/kota dengan kolom `price2022RpKg`, `price2023RpKg`, `price2024RpKg`, dan `averagePriceRp`.
- `SagoProductionVolume`: sumber acuan grafik volume produksi sagu mentah per kabupaten/kota, dengan kolom `production2022Ton`, `production2023Ton`, dan `production2024Ton`.
- `SagoProductionAnalysis`: sumber grafik nilai produksi 2024 dan tabel analisis gabungan. Total Sultra dan skala grafik dihitung otomatis dari seluruh baris tabel ini.
- `RegionalCommodityStat`: data produksi, harga, tren, sentra, dan mitra per kabupaten.
- `FeaturedCenter`: daftar sentra unggulan.
- `DashboardUpdate`: teks status pembaruan data di bagian atas halaman.

## Deploy

Pastikan hosting memiliki environment variable:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Lalu jalankan `npm run db:deploy` pada database production sebelum membuka halaman `/data-komoditas`.
