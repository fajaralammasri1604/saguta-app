"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Images,
  MousePointerClick,
  PackageOpen,
  Sprout,
  Store,
  Wheat,
  X,
  type LucideIcon,
} from "lucide-react";

type EducationCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  images: string[];
  badgeClassName: string;
};

const educationCategories: EducationCategory[] = [
  {
    title: "Cara Budidaya",
    description: "Pelajari tahapan membuka kebun, menanam, dan merawat sagu.",
    icon: Sprout,
    images: [1, 2, 3, 4, 5].map(
      (number) => `/images/education/cara-budidaya/${number}.png`,
    ),
    badgeClassName: "bg-[#EAF6E8] text-forest-700",
  },
  {
    title: "Teknik Panen",
    description: "Kenali pohon siap panen dan proses pemanenan yang tepat.",
    icon: Wheat,
    images: [1, 2, 3, 4, 5].map(
      (number) => `/images/education/teknik-panen/${number}.png`,
    ),
    badgeClassName: "bg-[#FFF3CC] text-[#755900]",
  },
  {
    title: "Produk Olahan",
    description: "Temukan inspirasi pengolahan dan pengemasan produk sagu.",
    icon: PackageOpen,
    images: [1, 2, 3, 4].map(
      (number) => `/images/education/produk-olahan/${number}.png`,
    ),
    badgeClassName: "bg-[#FCE9D8] text-[#8A4315]",
  },
  {
    title: "Marketplace",
    description: "Ikuti panduan menyiapkan dan memasarkan produk secara digital.",
    icon: Store,
    images: [1, 2, 3, 4].map(
      (number) => `/images/education/marketplace/${number}.png`,
    ),
    badgeClassName: "bg-[#E7F0F5] text-[#24536A]",
  },
];

export function EducationGallery() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const selectedCategory =
    selectedCategoryIndex === null
      ? null
      : educationCategories[selectedCategoryIndex];

  const openGallery = (categoryIndex: number) => {
    setSelectedCategoryIndex(categoryIndex);
    setActiveImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedCategoryIndex(null);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    if (!selectedCategory) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowRight") {
        setActiveImageIndex(
          (current) => (current + 1) % selectedCategory.images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveImageIndex(
          (current) =>
            (current - 1 + selectedCategory.images.length) %
            selectedCategory.images.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCategory]);

  const showPreviousImage = () => {
    if (!selectedCategory) return;
    setActiveImageIndex(
      (current) =>
        (current - 1 + selectedCategory.images.length) %
        selectedCategory.images.length,
    );
  };

  const showNextImage = () => {
    if (!selectedCategory) return;
    setActiveImageIndex(
      (current) => (current + 1) % selectedCategory.images.length,
    );
  };

  return (
    <div className="mt-10 border-t border-forest-700/10 pt-9">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF6E8] px-3 py-1.5 text-xs font-black uppercase text-forest-700">
            <Images className="h-4 w-4" />
            Galeri Infografis
          </div>
          <h3 className="mt-3 text-2xl font-black text-forest-900 sm:text-3xl">
            Pilih materi yang ingin dipelajari
          </h3>
          <p className="mt-2 max-w-2xl leading-7 text-[#5F6F64]">
            Setiap kategori berisi beberapa panduan visual yang dapat dilihat satu per satu.
          </p>
        </div>

        <div className="flex w-fit items-center gap-3 rounded-2xl border border-gold-500/25 bg-[#FFF8E1] px-4 py-3 text-sm font-bold text-forest-900">
          <MousePointerClick className="h-5 w-5 shrink-0 text-gold-700" />
          Klik kartu untuk membuka galeri
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {educationCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;

          return (
            <button
              key={category.title}
              type="button"
              onClick={() => openGallery(categoryIndex)}
              aria-haspopup="dialog"
              className="group flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-forest-700/10 bg-white text-left shadow-card transition duration-300 hover:-translate-y-1 hover:border-forest-700/25 hover:shadow-[0_22px_50px_rgba(16,42,26,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest-700/25"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-cream-200">
                <Image
                  src={category.images[0]}
                  alt={`Sampul materi ${category.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-forest-900 shadow-sm backdrop-blur">
                  <Images className="h-3.5 w-3.5 text-forest-700" />
                  {category.images.length} gambar
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${category.badgeClassName}`}
                >
                  <CategoryIcon className="h-6 w-6" />
                </span>
                <h4 className="mt-4 text-xl font-black text-forest-900">
                  {category.title}
                </h4>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#5F6F64]">
                  {category.description}
                </p>
                <span className="mt-5 flex items-center justify-between border-t border-forest-700/10 pt-4 text-sm font-black text-forest-700">
                  Buka galeri
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-700 text-white transition group-hover:rotate-12 group-hover:bg-forest-900">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedCategory && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/80 p-2 backdrop-blur-sm sm:p-5"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="education-gallery-title"
            className="flex max-h-[calc(100dvh-1rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[24px] bg-warm-50 shadow-2xl sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-[32px]"
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-forest-700/10 px-4 py-3 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase text-forest-700">
                  Materi Edukasi
                </p>
                <h3
                  id="education-gallery-title"
                  className="truncate text-lg font-black text-forest-900 sm:text-2xl"
                >
                  {selectedCategory.title}
                </h3>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={selectedCategory.images[activeImageIndex]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Buka gambar ukuran penuh"
                  className="flex h-10 w-10 items-center justify-center gap-2 rounded-full border border-forest-700/15 text-sm font-black text-forest-700 transition hover:bg-[#EAF6E8] sm:h-auto sm:w-auto sm:px-4 sm:py-2"
                >
                  <span className="hidden sm:inline">Ukuran penuh</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={closeGallery}
                  autoFocus
                  aria-label="Tutup galeri"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-900 text-white transition hover:bg-forest-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest-700/25"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative min-h-[230px] flex-1 bg-[#0A1D11] sm:min-h-[360px]">
              <Image
                src={selectedCategory.images[activeImageIndex]}
                alt={`${selectedCategory.title}, gambar ${activeImageIndex + 1} dari ${selectedCategory.images.length}`}
                fill
                sizes="(max-width: 1200px) 100vw, 1152px"
                className="object-contain"
                priority
              />

              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="Lihat gambar sebelumnya"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-forest-900 shadow-lg transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-500/50 sm:left-4 sm:h-12 sm:w-12"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={showNextImage}
                aria-label="Lihat gambar berikutnya"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-forest-900 shadow-lg transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-500/50 sm:right-4 sm:h-12 sm:w-12"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-forest-950/80 px-3 py-1.5 text-xs font-black text-white backdrop-blur sm:hidden">
                {activeImageIndex + 1} / {selectedCategory.images.length}
              </span>
            </div>

            <div className="shrink-0 border-t border-forest-700/10 bg-white px-4 py-3 sm:px-6 sm:py-4">
              <div className="mb-2 hidden items-center justify-between sm:flex">
                <p className="text-sm font-black text-forest-900">
                  Pilih gambar
                </p>
                <p className="text-sm font-bold text-[#5F6F64]">
                  Gambar {activeImageIndex + 1} dari {selectedCategory.images.length}
                </p>
              </div>
              <div className="flex justify-center gap-2 overflow-x-auto pb-1 sm:gap-3">
                {selectedCategory.images.map((image, imageIndex) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImageIndex(imageIndex)}
                    aria-label={`Tampilkan gambar ${imageIndex + 1}`}
                    aria-current={imageIndex === activeImageIndex ? "true" : undefined}
                    className={`relative aspect-[3/2] w-[72px] shrink-0 overflow-hidden rounded-lg border-2 transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest-700/25 sm:w-28 ${
                      imageIndex === activeImageIndex
                        ? "border-forest-700 ring-2 ring-forest-700/20"
                        : "border-transparent opacity-65 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-1 right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-forest-950/80 px-1 text-[10px] font-black text-white">
                      {imageIndex + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
