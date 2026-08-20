import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  ChevronRight,
  CircleUserRound,
  Download,
  Factory,
  Globe2,
  Handshake,
  Leaf,
  MapPin,
  Package,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sprout,
  Star,
  Store,
  TrendingUp,
  Truck,
  UsersRound,
  Waves,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Header } from "@/components/Header";
import { EducationGallery } from "@/components/sections/EducationGallery";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/lib/navigation";

const heroTrust = [
  { icon: Sprout, label: "Sagu Lokal Sultra" },
  { icon: ShieldCheck, label: "Tanpa Pengawet" },
  { icon: Package, label: "Praktis & Lezat" },
  { icon: Star, label: "Higienis & Berkualitas" },
];

const heroBackgrounds = [
  {
    src: "/images/backgrounds/background-1.jpeg",
    alt: "sajian makanan olahan sagu (songgi)",
  },
  {
    src: "/images/backgrounds/background-2.jpeg",
    alt: "Proses panen sagu",
  },
  {
    src: "/images/backgrounds/background-3.jpeg",
    alt: "Proses pembuatan sagu",
  },
  {
    src: "/images/backgrounds/background-4.jpeg",
    alt: "Sagu mentah yang sudah jadi",
  },
  {
    src: "/images/backgrounds/background-5.jpeg",
    alt: "Sagu mentah",
  },
 
];

const stats = [
  { value: "15+", label: "Sentra Sagu Potensial", icon: Sprout },
  { value: "100+", label: "Petani Mitra", icon: UsersRound },
  { value: "50+", label: "Produk Olahan", icon: Package },
  { value: "Seluruh Indonesia", label: "Distribusi Laut & Darat", icon: Truck },
];

const ecosystem = [
  {
    icon: BarChart3,
    title: "Data Komoditas",
    text: "Informasi komprehensif mengenai tren harga sagu, volume produksi sagu mentah, analisis nilai produksi sagu per kabupaten di Sulawesi Tenggara, serta rincian data setiap kabupaten yang diurutkan berdasarkan volume produksi tertinggi.",
    cta: "Lihat Data",
    tone: "bg-[#EAF6E8]",
  },
  {
    icon: BookOpenCheck,
    title: "Pusat Edukasi",
    text: "Panduan edukasi visual melalui infografis tahapan dan ilustrasi yang dapat membantu petani dan pelaku UMKM meningkatkan kualitas produksi, pengemasan, serta penjualan melalui marketplace.",
    cta: "Belajar Sekarang",
    tone: "bg-[#FFF3CC]",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    text: "Jual beli bahan mentah dan produk olahan sagu dengan jangkauan nasional dan global.",
    cta: "Belanja Sekarang",
    tone: "bg-[#E7F0F5]",
  },
];

const reasons = [
  {
    icon: Sprout,
    title: "Diversifikasi Pangan",
    text: "Sumber karbohidrat lokal sehat dan bergizi.",
  },
  {
    icon: Waves,
    title: "Tahan Perubahan Iklim",
    text: "Tumbuh di lahan basah dan tahan kondisi ekstrem.",
  },
  {
    icon: Leaf,
    title: "Ramah Lingkungan",
    text: "Tanaman sagu menjaga ekosistem dan serapan karbon.",
  },
  {
    icon: TrendingUp,
    title: "Bernilai Tambah Tinggi",
    text: "Peluang produk olahan bernilai ekonomi tinggi.",
  },
];

const flow = [
  { title: "Petani Sagu", icon: Sprout },
  { title: "Edukasi & Pendampingan", icon: BookOpenCheck },
  { title: "Produksi Berkualitas", icon: Factory },
  { title: "Marketplace Digital", icon: Store },
  { title: "Distribusi Darat & Laut", icon: Truck },
  { title: "Konsumen Nasional", icon: UsersRound },
  { title: "Pasar Global", icon: Globe2 },
];

const impact = [
  { value: "120+", label: "Petani Bergabung", icon: CircleUserRound },
  { value: "10+", label: "Desa Mitra", icon: Store },
  { value: "1.250+", label: "Transaksi Selesai", icon: ShoppingCart },
  { value: "8+", label: "Wilayah Pulau Terjangkau", icon: Truck },
  { value: "35%", label: "Peningkatan Pendapatan", icon: TrendingUp },
];

const partners = [
  {
    name: "Pemerintah Provinsi Sulawesi Tenggara",
    logo: "/images/partners/pemerintah-sulawesi-tenggara.svg",
    logoClassName: "h-24 w-24",
  },
  {
    name: "Bank Indonesia",
    logo: "/images/partners/bank-indonesia.svg",
    logoClassName: "h-16 w-full max-w-64",
  },
  {
    name: "Perum BULOG",
    logo: "/images/partners/bulog.svg",
    logoClassName: "h-16 w-full max-w-64",
  },
];

export default function Home() {
  return (
    <main className="overflow-x-hidden pt-20">
      <Header />
      <Hero />
      <StatsStrip />
      <EcosystemSection />
      <ReasonsSection />
      <FlowSection />
      <EducationSection />
      <ImpactSection />
      <PartnersSection />
      <NewsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}

function Hero() {
  const slideDurationSeconds = 5;
  const carouselDurationSeconds = heroBackgrounds.length * slideDurationSeconds;

  return (
    <section id="beranda" className="scroll-target relative overflow-hidden bg-cream-100">
      <div className="absolute inset-0">
        {heroBackgrounds.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="hero-carousel-slide object-cover"
            style={{
              animationDelay: `${index * slideDurationSeconds}s`,
              animationDuration: `${carouselDurationSeconds}s`,
              animationIterationCount: "infinite",
              animationName: "hero-carousel-slide-right",
              animationTimingFunction: "ease-in-out",
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(255, 248, 232, 0.90) 0%, rgba(255, 248, 232, 0.78) 46%, rgba(255, 248, 232, 0.08) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-warm-50/45 via-transparent to-cream-100" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cream-100 to-transparent" />
      <div className="section-shell relative grid min-h-[650px] items-center gap-8 py-10 xl:grid-cols-[0.95fr_1.05fr] xl:gap-10 xl:py-16">
        <div className="z-10 max-w-2xl xl:max-w-none">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-forest-700/15 bg-warm-50/85 px-4 py-2 text-sm font-bold text-forest-700 shadow-card">
            <Leaf className="h-4 w-4" />
            Komoditas sagu lokal Sulawesi Tenggara
          </div>
          <h1 className="text-6xl font-black leading-[0.9] tracking-[0] text-forest-700 sm:text-7xl xl:text-8xl">
            SAGUTA
          </h1>
          <p className="mt-5 max-w-xl text-2xl font-extrabold leading-tight text-forest-900 sm:text-3xl">
            Ekosistem Digital Komoditas Sagu Sulawesi Tenggara
          </p>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#2F3E35] sm:text-lg">
            Menghubungkan petani, UMKM, pembeli dan mitra melalui satu
            platform digital untuk hilirisasi sagu, ketahanan pangan dan
            ekonomi maritim.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#tentang" size="lg">
              Jelajahi Ekosistem <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/gabung-petani" variant="secondary" size="lg">
              Gabung Sebagai Petani <CircleUserRound className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:max-w-xl">
            {heroTrust.map((item) => (
              <div key={item.label} className="rounded-2xl bg-warm-50/80 p-4 text-center shadow-card">
                <item.icon className="mx-auto mb-2 h-7 w-7 text-forest-700" />
                <p className="text-xs font-bold leading-snug text-forest-900">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/*gambar songgi-hero
        <div className="relative z-10 hidden min-h-[320px] sm:block sm:min-h-[400px] xl:min-h-[560px]">
          <div className="absolute bottom-2 right-0 h-[220px] w-[164px] sm:h-[270px] sm:w-[201px] xl:bottom-6 xl:h-[330px] xl:w-[246px]">
            <Image
              src="/images/products/songgi-hero.png"
              alt="Produk Songgi sagu instan premium"
              fill
              priority
              sizes="(min-width: 1280px) 246px, 201px"
              className="object-contain object-center leaf-shadow"
            />
          </div>
        </div>
        */}
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="section-shell relative z-20 -mt-10">
      <div className="grid gap-1 overflow-hidden rounded-3xl border border-forest-700/10 bg-warm-50 shadow-soft sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="flex items-center gap-4 border-forest-700/10 p-5 xl:border-r last:border-r-0">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-cream-200 text-forest-700">
              <item.icon className="h-8 w-8" />
            </span>
            <span>
              <span className="block text-2xl font-black text-forest-700 sm:text-3xl">{item.value}</span>
              <span className="block text-sm font-semibold leading-tight text-forest-900">{item.label}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section className="section-shell py-16">
      <span id="tentang" className="scroll-anchor" />
      <SectionHeading
        title="Ekosistem Saguta"
        subtitle="Satu platform digital untuk seluruh rantai nilai sagu"
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {ecosystem.map((item) => (
          <article
            key={item.title}
            id={item.title === "Marketplace" ? "marketplace" : undefined}
            className={`${item.tone} scroll-target rounded-3xl p-7 shadow-card`}
          >
            <item.icon className="h-12 w-12 text-forest-700" />
            <h3 className="mt-5 text-xl font-black text-forest-900">{item.title}</h3>
            <p className="mt-3 min-h-24 text-sm leading-7 text-[#2F3E35]">{item.text}</p>
            <a
              href={
                item.title === "Marketplace"
                  ? "/marketplace"
                  : item.title === "Data Komoditas"
                    ? "/data-komoditas"
                    : "#edukasi"
              }
              className="mt-4 inline-flex items-center gap-2 text-sm font-black text-forest-700"
            >
              {item.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReasonsSection() {
  return (
    <section className="section-shell pb-14">
      <div className="grid items-center gap-8 xl:grid-cols-[1fr_380px]">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-forest-900">Mengapa Memilih Sagu?</h2>
            <span className="hidden h-px flex-1 bg-forest-700/20 sm:block" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
            {reasons.map((item) => (
              <article key={item.title} className="rounded-3xl bg-warm-50 p-5 text-center shadow-card">
                <item.icon className="mx-auto h-11 w-11 text-forest-700" />
                <h3 className="mt-4 text-sm font-black text-forest-900">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#5F6F64]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-[#FFF7E8] p-5 shadow-card">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_16%,rgba(98,148,61,0.16),transparent_11rem),radial-gradient(circle_at_28%_78%,rgba(220,80,30,0.12),transparent_10rem),linear-gradient(180deg,#FFFDF6_0%,#FFF3DA_58%,#F8DFC0_100%)]" />
          <div className="absolute inset-x-8 bottom-5 h-20 rounded-full bg-[#7A3B1A]/10 blur-2xl" />
          <div className="relative z-10 text-center">
            <p className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-black uppercase tracking-[0] text-[#C83A12] shadow-card">
              Produk Unggulan
            </p>
          </div>
          <Image
            src="/images/products/songgi-produk.png"
            alt="Produk Songgi sagu instan"
            fill
            sizes="(min-width: 1280px) 380px, 100vw"
            className="object-contain px-6 pb-5 pt-16 drop-shadow-[0_18px_28px_rgba(85,31,13,0.24)]"
          />
        </div>
      </div>
    </section>
  );
}

function FlowSection() {
  return (
    <section className="section-shell pb-16">
      <SectionHeading title="Alur Ekosistem Saguta" subtitle="Dari kebun sagu sampai pasar nasional dan global" />
      <div className="mt-8 rounded-3xl border border-forest-700/10 bg-warm-50 p-5 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
          {flow.map((item, index) => (
            <div key={item.title} className="relative flex items-center gap-3 rounded-2xl border border-forest-700/10 bg-white p-4 xl:block xl:text-center">
              <item.icon className="h-10 w-10 shrink-0 text-forest-700 xl:mx-auto" />
              <p className="text-sm font-black leading-snug text-forest-900 xl:mt-3">{item.title}</p>
              {index < flow.length - 1 && (
                <ChevronRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-forest-700 xl:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  const articles = [
    {
      title: "Standar Mutu Sagu Kering",
      text: "Panduan menjaga kadar air, kebersihan kemasan dan konsistensi tekstur sebelum produk masuk marketplace.",
      tag: "Modul Petani",
      pdf: "/documents/education/standar-mutu-sagu-kering.pdf",
    },
    {
      title: "Hilirisasi Produk Songgi",
      text: "Ide olahan sagu instan, pengemasan premium dan strategi harga untuk UMKM lokal Sulawesi Tenggara.",
      tag: "UMKM",
      pdf: "/documents/education/hilirisasi-produk-songgi.pdf",
    },
    {
      title: "QRIS dan Transaksi Digital Marketplace",
      text: "Alur pembelian awal yang sederhana: pilih produk, kirim pesan otomatis dan konfirmasi stok ke petani.",
      tag: "Marketplace",
      pdf: "/documents/education/qris-dan-transaksi-digital-marketplace.pdf",
    },
  ];

  return (
    <section id="edukasi" className="section-shell scroll-target pb-16">
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0] text-forest-700">
            Pusat Edukasi
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-forest-900">
            Materi praktis untuk petani, UMKM dan pembeli sagu
          </h2>
          <p className="mt-4 leading-8 text-[#5F6F64]">
            Saguta bukan hanya katalog produk. Platform ini menyiapkan
            pengetahuan produksi, pemasaran dan transaksi agar rantai nilai
            sagu terus naik kelas.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="flex h-full flex-col rounded-3xl bg-warm-50 p-6 shadow-card"
            >
              <span className="rounded-full bg-[#EAF6E8] px-3 py-1 text-xs font-black text-forest-700">
                {article.tag}
              </span>
              <h3 className="mt-5 text-lg font-black text-forest-900">{article.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5F6F64]">{article.text}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <a
                  href={article.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-2 text-xs font-black text-white transition hover:bg-forest-900"
                >
                  <BookOpenCheck className="h-4 w-4" />
                  Baca PDF
                </a>
                <a
                  href={article.pdf}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-forest-700/20 px-4 py-2 text-xs font-black text-forest-700 transition hover:bg-[#EAF6E8]"
                >
                  <Download className="h-4 w-4" />
                  Unduh
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <EducationGallery />
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="section-shell grid gap-8 py-16 xl:grid-cols-[0.9fr_1.4fr]">
      <div className="rounded-3xl bg-[#FAF3DD] p-7 shadow-card">
        <h2 id="petani-mitra" className="scroll-target text-3xl font-black text-forest-900">Kisah Petani</h2>
        <FarmerQuote
          image="/images/farmers/farmer-1.svg"
          quote="Sebelum bergabung di Saguta, kami hanya menjual ke tengkulak. Sekarang harga lebih adil dan produk kami dikenal luas."
          name="Petani Sagu Desa Galu"
        />
        <FarmerQuote
          image="/images/farmers/farmer-2.svg"
          quote="Edukasi dari Saguta sangat membantu kami meningkatkan kualitas sagu dan menambah pendapatan keluarga."
          name="Kelompok Tani Anggalomoare"
        />
      </div>

      <div>
        <h2 className="text-3xl font-black text-forest-900">Dampak Saguta</h2>
        <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-3xl border border-forest-700/10 bg-warm-50 shadow-card lg:grid-cols-3 xl:grid-cols-5">
          {impact.map((item) => (
            <div key={item.label} className="border-b border-r border-forest-700/10 p-6 text-center last:border-r-0 md:border-b-0">
              <item.icon className="mx-auto h-10 w-10 text-forest-700" />
              <p className="mt-4 text-3xl font-black text-forest-700">{item.value}</p>
              <p className="mt-2 text-sm font-bold leading-tight text-forest-900">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FarmerQuote({ image, quote, name }: { image: string; quote: string; name: string }) {
  return (
    <div className="mt-6 grid grid-cols-[88px_1fr] gap-5">
      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-cream-200">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div>
        <p className="text-sm leading-7 text-[#2F3E35]">&quot;{quote}&quot;</p>
        <p className="mt-2 text-sm font-black text-forest-900">- {name}</p>
      </div>
    </div>
  );
}

function PartnersSection() {
  return (
    <section className="section-shell pb-16">
      <h2 className="text-3xl font-black text-forest-900">Mitra Kami</h2>
      <div className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-forest-700/10 bg-forest-700/10 sm:grid-cols-3">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="grid min-h-40 place-items-center bg-warm-50 p-6"
          >
            <Image
              src={partner.logo}
              alt={`Logo ${partner.name}`}
              width={280}
              height={112}
              className={`${partner.logoClassName} object-contain`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function NewsSection() {
  const news = [
    {
      title: "Sagu Hingga Kelapa Prioritas Hilirisasi Perkebunan Sultra.",
      href: "https://www.kompas.id/artikel/en-sagu-hingga-kelapa-prioritas-hilirisasi-perkebunan-sultra",
    },
    {
      title:
        "Sinonggi, Olahan Sagu Sulawesi Tenggara Menyatukan Tradisi dan Cita Rasa.",
      href: "https://www.liputan6.com/regional/read/6046269/sinonggi-olahan-sagu-sulawesi-tenggara-menyatukan-tradisi-dan-cita-rasa",
    },
    {
      title:
        "Sagu Bisa Jadi Jawaban Ketahanan Pangan, tapi Masyarakat Tolaki di Sulawesi Tenggara Kesulitan Memproduksi Sagu secara Ekonomis.",
      href: "https://theconversation.com/sagu-bisa-jadi-jawaban-ketahanan-pangan-tapi-masyarakat-tolaki-di-sulawesi-tenggara-kesulitan-memproduksi-sagu-secara-ekonomis-192343",
    },
  ];

  return (
    <section id="berita" className="section-shell scroll-target pb-16">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-black text-forest-900">Berita Saguta</h2>
        <span className="hidden h-px flex-1 bg-forest-700/20 sm:block" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {news.map((item, index) => (
          <article
            key={item.title}
            className="flex h-full flex-col rounded-3xl bg-warm-50 p-6 shadow-card"
          >
            <p className="text-sm font-black text-gold-600">Berita 0{index + 1}</p>
            <h3 className="mt-3 text-lg font-black leading-snug text-forest-900">
              {item.title}
            </h3>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black text-forest-700"
            >
              Baca Selengkapnya <ArrowRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="gabung" className="section-shell scroll-target pb-16">
      <div className="relative overflow-hidden rounded-[2rem] bg-forest-700 p-8 shadow-soft md:p-10">
        <div className="absolute bottom-0 right-0 h-52 w-72 opacity-40">
          <Image src="/images/illustrations/sago-roots.svg" alt="" fill className="object-contain object-bottom" />
        </div>
        <div className="relative max-w-3xl">
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
            Mari Bangun Masa Depan Sagu Indonesia
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-cream-200">
            Bergabung bersama Saguta untuk mendukung petani lokal, hilirisasi
            sagu dan ekonomi maritim Sulawesi Tenggara.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/gabung-petani" variant="gold">
              Daftar Petani <CircleUserRound className="h-5 w-5" />
            </Button>
            <Button href="https://wa.me/6287762844077?text=Halo%20Saguta%2C%20saya%20ingin%20menjadi%20mitra" variant="secondary">
              Jadi Mitra <Handshake className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#063D1D] py-12 text-cream-100">
      <div className="section-shell grid gap-10 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 shrink-0 rounded-full border-2 border-gold-500/70 bg-white shadow-card">
              <BrandLogo className="absolute left-1/2 top-1/2 h-11 w-12 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <p className="text-2xl font-black">SAGUTA</p>
              <p className="text-xs text-cream-200">Satu ekosistem, untuk sagu Sultra</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-7 text-cream-200">
            Platform digital yang menghubungkan petani sagu, pelaku usaha dan
            konsumen untuk ekonomi yang inklusif, mandiri dan berdaya saing.
          </p>
        </div>
        <FooterNavColumn title="Navigasi" items={navItems} />
        <FooterColumn
          title="Produk"
          items={["Tepung Sagu Konawe", "Tepung Sagu Konawe Selatan", "Songgi Rumput Laut"]}
        />
        <div>
          <h3 className="font-black text-white">Kontak Kami</h3>
          <div className="mt-5 space-y-3 text-sm leading-6 text-cream-200">
            <p className="flex gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-500" /> Kota Kendari, Sulawesi Tenggara</p>
            <a
              href="https://wa.me/6287762844077"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 transition hover:text-gold-500"
            >
              <Phone className="mt-1 h-4 w-4 shrink-0 text-gold-500" />
              087762844077
            </a>
            <p className="flex gap-2"><Search className="mt-1 h-4 w-4 shrink-0 text-gold-500" /> www.saguta.id</p>
          </div>
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-white/10 pt-6 text-sm text-cream-200">
        (c) 2026 Saguta. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-black text-white">{title}</h3>
      <div className="mt-5 space-y-3 text-sm text-cream-200">
        {items.map((item) => (
          <a key={item} href="#" className="block hover:text-gold-500">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}

function FooterNavColumn({
  title,
  items,
}: {
  title: string;
  items: typeof navItems;
}) {
  return (
    <div>
      <h3 className="font-black text-white">{title}</h3>
      <div className="mt-5 space-y-3 text-sm text-cream-200">
        {items.map((item) => (
          <a key={item.label} href={item.href} className="block hover:text-gold-500">
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3">
        <Leaf className="h-6 w-6 text-leaf-500" />
        <h2 className="text-3xl font-black text-forest-900">{title}</h2>
        <Leaf className="h-6 w-6 -scale-x-100 text-leaf-500" />
      </div>
      <p className="mt-3 text-[#5F6F64]">{subtitle}</p>
    </div>
  );
}
