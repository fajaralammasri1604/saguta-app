import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  BadgeCheck,
  BookOpenCheck,
  Check,
  ChevronRight,
  CircleUserRound,
  HandCoins,
  Headphones,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sprout,
  Store,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { FarmerApplicationForm } from "@/components/FarmerApplicationForm";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gabung Petani | Saguta Sultra",
  description:
    "Daftar sebagai mitra petani Saguta dan dapatkan akses pasar, edukasi, serta pendampingan untuk komoditas sagu Sulawesi Tenggara.",
};

const benefits = [
  {
    icon: Store,
    title: "Akses pasar lebih luas",
    text: "Tampilkan produk kepada pembeli dan pelaku usaha melalui ekosistem Saguta.",
    tone: "bg-[#EAF6E8] text-forest-700",
  },
  {
    icon: TrendingUp,
    title: "Harga lebih transparan",
    text: "Dapatkan informasi harga dan peluang penjualan untuk keputusan yang lebih baik.",
    tone: "bg-[#FFF3CC] text-[#A66A2C]",
  },
  {
    icon: BookOpenCheck,
    title: "Edukasi praktis",
    text: "Pelajari peningkatan mutu, pengolahan, pengemasan, dan pemasaran produk.",
    tone: "bg-[#E7F0F5] text-[#1F7EA3]",
  },
  {
    icon: Headphones,
    title: "Pendampingan bertahap",
    text: "Tim Saguta membantu proses verifikasi hingga produk siap dipasarkan.",
    tone: "bg-[#FFE9DE] text-[#D84E1F]",
  },
];

const steps = [
  { number: "01", icon: MessageCircle, title: "Isi formulir", text: "Ceritakan singkat lokasi, pengalaman, dan produk sagu Anda." },
  { number: "02", icon: ShieldCheck, title: "Verifikasi data", text: "Tim Saguta menghubungi Anda untuk memastikan data dan kebutuhan." },
  { number: "03", icon: UsersRound, title: "Pemetaan potensi", text: "Kami memetakan kapasitas produksi serta dukungan yang sesuai." },
  { number: "04", icon: Store, title: "Mulai bermitra", text: "Ikuti pendampingan dan siapkan produk untuk masuk ke pasar Saguta." },
];

const requirements = [
  "Berdomisili atau memiliki kebun/produksi sagu di Sulawesi Tenggara",
  "Petani perorangan maupun anggota kelompok tani",
  "Memiliki nomor WhatsApp aktif untuk proses verifikasi",
  "Bersedia menjaga mutu produk dan mengikuti pendampingan",
];

export default function GabungPetaniPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-cream-100 pt-20">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_7%_12%,rgba(107,191,89,0.22),transparent_22rem),radial-gradient(circle_at_92%_84%,rgba(245,184,46,0.22),transparent_20rem),linear-gradient(135deg,#FFFDF7_0%,#FFF8E8_58%,#FAF3DD_100%)]" />
        <div className="section-shell relative grid min-h-[650px] items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
          <div className="relative z-10">
            <Link href="/#petani-mitra" className="inline-flex items-center gap-2 text-sm font-black text-forest-700 transition hover:text-forest-600">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-forest-700/15 bg-white/80 px-4 py-2 text-sm font-black text-forest-700 shadow-card backdrop-blur">
              <Sprout className="h-4 w-4" />
              Program Mitra Petani Saguta
            </div>
            <h1 className="mt-5 max-w-2xl text-4xl font-black leading-[1.08] text-forest-900 sm:text-5xl xl:text-6xl">
              Tumbuh bersama,
              <span className="block text-forest-700">jual lebih pasti.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#46564B] sm:text-lg">
              Bergabunglah dalam ekosistem petani sagu Sulawesi Tenggara. Dapatkan akses pasar, pengetahuan, dan pendampingan untuk meningkatkan nilai hasil kebun Anda.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#form-pendaftaran" size="lg">
                Mulai Pendaftaran <ArrowDown className="h-5 w-5" />
              </Button>
              <Button href="#cara-bergabung" variant="secondary" size="lg">
                Lihat Cara Bergabung
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[#46564B]">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-forest-700" /> Gratis bergabung</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-forest-700" /> Proses mudah</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-forest-700" /> Didampingi tim lokal</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px] lg:mx-0 lg:ml-auto">
            <div className="relative h-[430px] overflow-hidden rounded-[2.25rem] border-[6px] border-white bg-forest-900 shadow-soft sm:h-[520px]">
              <Image
                src="/images/backgrounds/background-2.jpeg"
                alt="Petani sagu Sulawesi Tenggara memanen batang sagu"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-black backdrop-blur">
                  <MapPin className="h-3.5 w-3.5 text-gold-500" /> Sulawesi Tenggara
                </span>
                <p className="mt-3 max-w-md text-xl font-black leading-snug sm:text-2xl">
                  Dari kebun lokal menuju pasar yang lebih luas.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-forest-700/10 bg-white px-4 py-3 shadow-soft sm:-left-6 sm:bottom-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#EAF6E8] text-forest-700">
                <CircleUserRound className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-xl font-black leading-none text-forest-700">120+</span>
                <span className="mt-1 block text-xs font-bold text-[#5F6F64]">Petani bergabung</span>
              </span>
            </div>
            <div className="absolute -right-3 top-6 hidden items-center gap-2 rounded-2xl bg-gold-500 px-4 py-3 text-sm font-black text-forest-900 shadow-card sm:flex">
              <BadgeCheck className="h-5 w-5" /> Mitra terverifikasi
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#D84E1F]">Manfaat kemitraan</p>
          <h2 className="mt-3 text-3xl font-black text-forest-900 sm:text-4xl">Lebih dari sekadar tempat menjual</h2>
          <p className="mt-4 leading-7 text-[#5F6F64]">Saguta membantu petani mengembangkan kualitas, akses, dan keberlanjutan usaha sagu.</p>
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-3xl border border-forest-700/10 bg-warm-50 p-6 shadow-card">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${benefit.tone}`}>
                <benefit.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-black text-forest-900">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5F6F64]">{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cara-bergabung" className="scroll-target bg-[#0B5D2A] py-16 text-white sm:py-20">
        <div className="section-shell">
          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-gold-500">Cara bergabung</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Empat langkah sederhana</h2>
            </div>
            <p className="max-w-2xl leading-7 text-cream-200 lg:ml-auto">Tidak ada biaya pendaftaran. Tim kami akan membantu Anda memahami setiap tahap sebelum kemitraan dimulai.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step.number} className="relative rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold-500 text-forest-900"><step.icon className="h-5 w-5" /></span>
                  <span className="text-3xl font-black text-white/20">{step.number}</span>
                </div>
                <h3 className="mt-5 text-lg font-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-cream-200">{step.text}</p>
                {index < steps.length - 1 && <ChevronRight className="absolute -right-5 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 text-gold-500 xl:block" />}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] bg-[#FAF3DD] p-8 shadow-card">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/20" />
          <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-leaf-300/20" />
          <div className="relative">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-700 text-white"><PackageCheck className="h-7 w-7" /></span>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-[#D84E1F]">Siapa yang bisa mendaftar?</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-forest-900">Petani sagu yang siap tumbuh bersama</h2>
            <p className="mt-4 max-w-md leading-7 text-[#5F6F64]">Anda tidak harus memiliki usaha besar. Petani pemula, petani perorangan, dan kelompok tani dapat menyampaikan minatnya.</p>
          </div>
        </div>
        <div className="lg:pl-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-forest-700">Persyaratan awal</p>
          <h2 className="mt-3 text-3xl font-black text-forest-900">Cukup siapkan informasi dasar</h2>
          <div className="mt-7 space-y-4">
            {requirements.map((item) => (
              <div key={item} className="flex items-start gap-4 rounded-2xl border border-forest-700/10 bg-warm-50 p-4 shadow-card">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EAF6E8] text-forest-700"><Check className="h-4 w-4" /></span>
                <p className="text-sm font-bold leading-7 text-[#46564B]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="form-pendaftaran" className="scroll-target relative overflow-hidden bg-[#F7EED3] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_5%_15%,rgba(107,191,89,0.16),transparent_20rem),radial-gradient(circle_at_96%_80%,rgba(245,184,46,0.18),transparent_22rem)]" />
        <div className="section-shell relative">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#D84E1F]">Mulai dari sini</p>
            <h2 className="mt-3 text-3xl font-black text-forest-900 sm:text-4xl">Kenalkan kebun dan usaha Anda</h2>
            <p className="mt-4 leading-7 text-[#5F6F64]">Tidak perlu dokumen rumit pada tahap awal. Isi data berikut agar tim Saguta dapat menghubungi Anda.</p>
          </div>
          <FarmerApplicationForm />
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-5 rounded-[2rem] bg-forest-900 p-7 text-white shadow-soft md:grid-cols-[1fr_auto] md:items-center md:p-9">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-gold-500"><HandCoins className="h-6 w-6" /></span>
            <div>
              <h2 className="text-xl font-black sm:text-2xl">Masih punya pertanyaan?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-cream-200">Tim Saguta siap menjelaskan manfaat, proses verifikasi, dan bentuk pendampingan sebelum Anda mendaftar.</p>
            </div>
          </div>
          <Button href="https://wa.me/6285256448193?text=Halo%20Saguta%2C%20saya%20ingin%20bertanya%20tentang%20Program%20Mitra%20Petani" variant="gold" className="w-full md:w-auto">
            Chat Tim Saguta <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </section>

      <footer className="bg-[#063D1D] py-8 text-cream-200">
        <div className="section-shell flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Saguta. Ekosistem digital sagu Sulawesi Tenggara.</p>
          <div className="flex flex-wrap gap-5 font-bold">
            <Link href="/#tentang" className="hover:text-gold-500">Tentang Saguta</Link>
            <Link href="/data-komoditas" className="hover:text-gold-500">Data Komoditas</Link>
            <Link href="/marketplace" className="hover:text-gold-500">Marketplace</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
