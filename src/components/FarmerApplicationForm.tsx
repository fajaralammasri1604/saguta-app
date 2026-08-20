"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const productOptions = [
  "Sagu basah",
  "Sagu kering",
  "Tepung sagu",
  "Produk olahan",
];

const supportOptions = [
  "Akses pasar",
  "Peningkatan kualitas",
  "Pengemasan produk",
  "Pembayaran digital",
];

const fieldClass =
  "mt-2 h-12 w-full rounded-2xl border border-forest-700/15 bg-white px-4 text-sm font-semibold text-forest-900 outline-none transition placeholder:font-normal placeholder:text-[#8A978E] focus:border-forest-700 focus:ring-4 focus:ring-forest-700/10";

function valuesOf(formData: FormData, key: string) {
  return formData.getAll(key).map(String).join(", ") || "Belum dipilih";
}

export function FarmerApplicationForm() {
  const [whatsappUrl, setWhatsappUrl] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = [
      "Halo Saguta, saya ingin mendaftar sebagai Mitra Petani.",
      "",
      `Nama: ${formData.get("name")}`,
      `Nomor WhatsApp: ${formData.get("phone")}`,
      `Desa/Kelurahan: ${formData.get("village")}`,
      `Kecamatan: ${formData.get("district")}`,
      `Kabupaten/Kota: ${formData.get("regency")}`,
      `Kelompok tani: ${formData.get("farmerGroup") || "-"}`,
      `Lama bertani sagu: ${formData.get("experience")}`,
      `Luas/kapasitas lahan: ${formData.get("landArea") || "-"}`,
      `Produk: ${valuesOf(formData, "products")}`,
      `Pendampingan yang dibutuhkan: ${valuesOf(formData, "support")}`,
      "",
      "Mohon informasi untuk proses verifikasi selanjutnya. Terima kasih.",
    ].join("\n");
    const url = `https://wa.me/6285256448193?text=${encodeURIComponent(message)}`;

    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-forest-700/10 bg-warm-50 shadow-soft">
      <div className="border-b border-forest-700/10 bg-[#EAF6E8] px-6 py-5 sm:px-8">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-forest-700 text-white">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-black text-forest-900 sm:text-2xl">
              Formulir minat petani
            </h2>
            <p className="mt-1 text-sm leading-6 text-[#5F6F64]">
              Isi sekitar 3 menit. Data akan diteruskan langsung ke tim Saguta melalui WhatsApp.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
          <FormField label="Nama lengkap" htmlFor="name" required>
            <input id="name" name="name" required autoComplete="name" placeholder="Contoh: La Ode Rahman" className={fieldClass} />
          </FormField>
          <FormField label="Nomor WhatsApp aktif" htmlFor="phone" required>
            <input id="phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="Contoh: 0812 3456 7890" className={fieldClass} />
          </FormField>
          <FormField label="Desa / kelurahan" htmlFor="village" required>
            <input id="village" name="village" required autoComplete="address-level4" placeholder="Nama desa atau kelurahan" className={fieldClass} />
          </FormField>
          <FormField label="Kecamatan" htmlFor="district" required>
            <input id="district" name="district" required autoComplete="address-level3" placeholder="Nama kecamatan" className={fieldClass} />
          </FormField>
          <FormField label="Kabupaten / kota" htmlFor="regency" required>
            <div className="relative">
              <select id="regency" name="regency" required defaultValue="" className={`${fieldClass} appearance-none pr-11`}>
                <option value="" disabled>Pilih wilayah</option>
                <option>Konawe</option>
                <option>Konawe Selatan</option>
                <option>Konawe Utara</option>
                <option>Kolaka</option>
                <option>Kolaka Timur</option>
                <option>Kolaka Utara</option>
                <option>Bombana</option>
                <option>Muna</option>
                <option>Muna Barat</option>
                <option>Buton</option>
                <option>Kota Kendari</option>
                <option>Lainnya di Sulawesi Tenggara</option>
              </select>
              <ChevronDown className="pointer-events-none absolute bottom-3.5 right-4 h-5 w-5 text-forest-700" />
            </div>
          </FormField>
          <FormField label="Nama kelompok tani" htmlFor="farmerGroup" hint="Opsional">
            <input id="farmerGroup" name="farmerGroup" placeholder="Jika tergabung dalam kelompok" className={fieldClass} />
          </FormField>
          <FormField label="Lama bertani sagu" htmlFor="experience" required>
            <div className="relative">
              <select id="experience" name="experience" required defaultValue="" className={`${fieldClass} appearance-none pr-11`}>
                <option value="" disabled>Pilih pengalaman</option>
                <option>Baru memulai</option>
                <option>Kurang dari 2 tahun</option>
                <option>2–5 tahun</option>
                <option>6–10 tahun</option>
                <option>Lebih dari 10 tahun</option>
              </select>
              <ChevronDown className="pointer-events-none absolute bottom-3.5 right-4 h-5 w-5 text-forest-700" />
            </div>
          </FormField>
          <FormField label="Luas / kapasitas lahan" htmlFor="landArea" hint="Opsional">
            <input id="landArea" name="landArea" placeholder="Contoh: 2 hektare" className={fieldClass} />
          </FormField>
        </div>

        <fieldset className="mt-7">
          <legend className="text-sm font-black text-forest-900">Produk yang dihasilkan</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {productOptions.map((option) => (
              <CheckOption key={option} name="products" value={option} />
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-7">
          <legend className="text-sm font-black text-forest-900">Pendampingan yang paling dibutuhkan</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {supportOptions.map((option) => (
              <CheckOption key={option} name="support" value={option} />
            ))}
          </div>
        </fieldset>

        <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl bg-cream-100 p-4 text-sm leading-6 text-[#46564B]">
          <input type="checkbox" required className="mt-1 h-4 w-4 accent-[#0B5D2A]" />
          <span>
            Saya bersedia dihubungi tim Saguta untuk verifikasi data dan penjelasan program kemitraan.
          </span>
        </label>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs font-bold text-[#5F6F64]">
            <ShieldCheck className="h-4 w-4 text-forest-700" />
            Data digunakan hanya untuk proses kemitraan.
          </p>
          <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 text-sm font-black text-forest-900 shadow-card transition hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600">
            Kirim via WhatsApp
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {whatsappUrl && (
          <div role="status" className="mt-5 flex flex-col gap-3 rounded-2xl border border-forest-700/15 bg-[#EAF6E8] p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm font-bold text-forest-900">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-forest-700" />
              Ringkasan siap dikirim. Selesaikan pengiriman di WhatsApp.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-black text-forest-700 underline underline-offset-4">
              Buka kembali
            </a>
          </div>
        )}
      </form>
    </div>
  );
}

function FormField({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-black text-forest-900">
        {label} {required && <span className="text-[#D84E1F]">*</span>}
        {hint && <span className="ml-2 text-xs font-semibold text-[#7A887E]">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function CheckOption({ name, value }: { name: string; value: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-forest-700/10 bg-white p-3.5 text-sm font-bold text-forest-900 transition hover:border-forest-700/30 hover:bg-[#F7FBF5]">
      <input type="checkbox" name={name} value={value} className="h-4 w-4 accent-[#0B5D2A]" />
      {value}
    </label>
  );
}
