"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Banknote,
  ChevronRight,
  CheckCircle2,
  CreditCard,
  Leaf,
  MapPin,
  MessageCircle,
  Package,
  QrCode,
  ShieldCheck,
  ShoppingCart,
  Star,
  Store,
  Truck,
  WalletCards,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const products = [
  {
    id: "tepung-sagu-konawe",
    name: "Tepung Sagu Konawe",
    price: "Rp18.000",
    image: "/images/products/Tepung%20sagu-konawe.png",
    area: "Konawe",
    stock: 60,
    description:
      "Tepung sagu pilihan dari petani Konawe dengan tekstur halus dan kualitas terjaga. Cocok diolah menjadi papeda, kue tradisional, dan aneka pangan rumahan.",
    reviews: [
      "Tepungnya bersih dan mudah diolah.",
      "Teksturnya halus dan kualitasnya bagus.",
      "Cocok untuk membuat papeda dan kue.",
    ],
  },
  {
    id: "tepung-sagu-konawe-selatan",
    name: "Tepung Sagu Konawe Selatan",
    price: "Rp20.000",
    image: "/images/products/Tepung%20sagu-konawe%20selatan.png",
    area: "Konawe Selatan",
    stock: 45,
    description:
      "Tepung sagu lokal Konawe Selatan yang diproses untuk menghasilkan bahan pangan berkualitas. Siap digunakan untuk berbagai masakan dan produk olahan sagu.",
    reviews: [
      "Kualitasnya baik dan terasa alami.",
      "Produk dikemas dengan rapi.",
      "Hasil olahannya lembut dan enak.",
    ],
  },
  {
    id: "songgi-rumput-laut",
    name: "Songgi Rumput Laut",
    price: "Rp30.000",
    image: "/images/products/songgi-produk.png",
    area: "Kendari",
    stock: 22,
    description:
      "Perpaduan sagu instan dan cita rasa rumput laut khas pesisir. Dibuat untuk pembeli yang ingin rasa lebih segar dan bernuansa maritim.",
    reviews: [
      "Rasanya unik dan tetap ringan.",
      "Produk datang aman, gambar sesuai.",
      "Cocok buat yang suka rasa laut.",
    ],
  },
];

const shippingOptions = [
  {
    id: "hemat",
    name: "Hemat Kargo",
    eta: "3 - 5 hari",
    price: 0,
    note: "Gratis ongkir untuk wilayah Sultra",
  },
  {
    id: "reguler",
    name: "Reguler",
    eta: "2 - 3 hari",
    price: 12000,
    note: "Pengiriman lebih cepat",
  },
];

const paymentMethods = [
  {
    id: "qris",
    name: "QRIS",
    description: "DANA, GoPay, OVO, mobile banking",
    icon: QrCode,
  },
  {
    id: "transfer",
    name: "Transfer Bank",
    description: "BCA, BRI, Mandiri, dan bank lainnya",
    icon: CreditCard,
  },
  {
    id: "cod",
    name: "COD",
    description: "Bayar saat produk diterima",
    icon: Banknote,
  },
  {
    id: "ewallet",
    name: "E-Wallet",
    description: "DANA, GoPay, ShopeePay",
    icon: WalletCards,
  },
];

function priceToNumber(price: string) {
  return Number(price.replace(/[^\d]/g, ""));
}

function formatCurrency(value: number) {
  return `Rp${value.toLocaleString("id-ID")}`;
}

export default function MarketplacePage() {
  const [selectedId, setSelectedId] = useState(products[0].id);
  const [cartCount, setCartCount] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedShippingId, setSelectedShippingId] = useState(shippingOptions[0].id);
  const [selectedPaymentId, setSelectedPaymentId] = useState(paymentMethods[0].id);
  const [buyerNote, setBuyerNote] = useState("");

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedId) ?? products[0],
    [selectedId],
  );

  const selectedShipping = useMemo(
    () => shippingOptions.find((option) => option.id === selectedShippingId) ?? shippingOptions[0],
    [selectedShippingId],
  );
  const selectedPayment = useMemo(
    () => paymentMethods.find((method) => method.id === selectedPaymentId) ?? paymentMethods[0],
    [selectedPaymentId],
  );

  if (isCheckoutOpen) {
    return (
      <CheckoutView
        product={selectedProduct}
        selectedShipping={selectedShipping}
        selectedShippingId={selectedShippingId}
        selectedPayment={selectedPayment}
        selectedPaymentId={selectedPaymentId}
        buyerNote={buyerNote}
        onBack={() => setIsCheckoutOpen(false)}
        onNoteChange={setBuyerNote}
        onPaymentChange={setSelectedPaymentId}
        onShippingChange={setSelectedShippingId}
      />
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <section className="relative overflow-hidden bg-cream-100 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(107,191,89,0.18),transparent_18rem),radial-gradient(circle_at_86%_8%,rgba(245,184,46,0.22),transparent_18rem),linear-gradient(180deg,#FFFDF7_0%,#FFF8E8_100%)]" />
        <div className="section-shell relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/#beranda" className="flex items-center gap-3" aria-label="Saguta Sultra">
              <BrandLogo className="h-14 w-[4.75rem]" priority />
              <span className="leading-tight">
                <span className="block text-xl font-black text-forest-700">SAGUTA</span>
                <span className="block text-xs font-semibold text-forest-900/70">
                  Ekosistem Digital Sagu Sultra
                </span>
              </span>
            </Link>
            <Link href="/#beranda" className="inline-flex items-center gap-2 text-sm font-black text-forest-700">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </div>
          <div className="mt-8 grid gap-6 xl:grid-cols-[0.8fr_1.2fr] xl:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#EAF6E8] px-4 py-2 text-sm font-black text-forest-700 shadow-card">
                <Store className="h-4 w-4" />
                Marketplace Saguta
              </p>
              <h1 className="mt-5 text-4xl font-black leading-tight text-forest-900 sm:text-5xl">
                Belanja produk sagu lokal Sulawesi Tenggara
              </h1>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#5F6F64]">
              Pilih produk untuk melihat deskripsi, daerah asal, stok, dan review pembeli. Checkout akan menampilkan rincian pembelian terlebih dahulu sebelum pesanan dikonfirmasi.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-6 py-12 xl:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            {products.map((product) => {
              const isSelected = selectedProduct.id === product.id;

              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setSelectedId(product.id)}
                  className={cn(
                    "group overflow-hidden rounded-3xl border bg-warm-50 text-left shadow-card transition",
                    isSelected
                      ? "border-forest-700 ring-4 ring-forest-700/10"
                      : "border-forest-700/10 hover:-translate-y-1 hover:border-forest-700/30",
                  )}
                >
                  <div className="relative h-60 bg-[#FFF7E8]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(98,148,61,0.14),transparent_10rem),linear-gradient(180deg,#FFFDF6_0%,#FFF1D6_100%)]" />
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-contain p-8 drop-shadow-[0_16px_24px_rgba(85,31,13,0.18)] transition group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-black text-forest-900">{product.name}</h2>
                        <p className="mt-2 flex items-center gap-2 text-sm font-bold text-[#5F6F64]">
                          <MapPin className="h-4 w-4 text-forest-700" />
                          {product.area}
                        </p>
                      </div>
                      <p className="rounded-full bg-gold-500 px-3 py-1 text-sm font-black text-forest-900">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="xl:sticky xl:top-24 xl:self-start">
          <div className="overflow-hidden rounded-3xl border border-forest-700/10 bg-warm-50 shadow-soft">
            <div className="relative h-72 bg-[#FFF7E8]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_14%,rgba(98,148,61,0.14),transparent_11rem),radial-gradient(circle_at_30%_78%,rgba(220,80,30,0.10),transparent_10rem),linear-gradient(180deg,#FFFDF6_0%,#FFF1D6_100%)]" />
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                sizes="(min-width: 1280px) 420px, 100vw"
                className="object-contain p-8 drop-shadow-[0_18px_28px_rgba(85,31,13,0.22)]"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-forest-900">{selectedProduct.name}</h2>
                  <p className="mt-2 text-xl font-black text-forest-700">{selectedProduct.price}</p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EAF6E8] text-forest-700">
                  <Leaf className="h-6 w-6" />
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-[#2F3E35]">{selectedProduct.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <InfoTile icon={MapPin} label="Daerah" value={selectedProduct.area} />
                <InfoTile icon={Package} label="Stok" value={`${selectedProduct.stock} pcs`} />
              </div>

              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-sm font-black text-forest-900">
                  <Star className="h-4 w-4 fill-gold-500 text-gold-500" />
                  Review Pembeli
                </h3>
                <div className="mt-3 space-y-3">
                  {selectedProduct.reviews.map((review) => (
                    <p key={review} className="rounded-2xl bg-[#EAF6E8] px-4 py-3 text-sm font-semibold leading-6 text-[#2F3E35]">
                      {review}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <Button type="button" variant="secondary" onClick={() => setCartCount((count) => count + 1)}>
                  Keranjang {cartCount > 0 ? `(${cartCount})` : ""}
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button type="button" variant="primary" onClick={() => setIsCheckoutOpen(true)}>
                  Checkout
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <footer className="bg-[#063D1D] py-8 text-cream-100">
        <div className="section-shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-12 w-16" />
            <p className="text-lg font-black">SAGUTA Marketplace</p>
          </div>
          <p className="text-sm text-cream-200">Rincian pesanan ditampilkan sebelum konfirmasi WhatsApp.</p>
        </div>
      </footer>
    </main>
  );
}

function CheckoutView({
  product,
  selectedShipping,
  selectedShippingId,
  selectedPayment,
  selectedPaymentId,
  buyerNote,
  onBack,
  onNoteChange,
  onPaymentChange,
  onShippingChange,
}: {
  product: (typeof products)[number];
  selectedShipping: (typeof shippingOptions)[number];
  selectedShippingId: string;
  selectedPayment: (typeof paymentMethods)[number];
  selectedPaymentId: string;
  buyerNote: string;
  onBack: () => void;
  onNoteChange: (value: string) => void;
  onPaymentChange: (value: string) => void;
  onShippingChange: (value: string) => void;
}) {
  const productPrice = priceToNumber(product.price);
  const quantity = 1;
  const packagingFee = 2000;
  const serviceFee = 1000;
  const subtotal = productPrice * quantity;
  const total = subtotal + selectedShipping.price + packagingFee + serviceFee;
  const orderText = encodeURIComponent(
    [
      "Halo Saguta, saya ingin membuat pesanan:",
      `Produk: ${product.name}`,
      `Jumlah: ${quantity}`,
      `Subtotal: ${formatCurrency(subtotal)}`,
      `Pengiriman: ${selectedShipping.name} (${formatCurrency(selectedShipping.price)})`,
      `Metode pembayaran: ${selectedPayment.name}`,
      `Total: ${formatCurrency(total)}`,
      buyerNote ? `Catatan: ${buyerNote}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return (
    <main className="min-h-screen bg-cream-100 pb-28">
      <section className="sticky top-0 z-40 border-b border-forest-700/10 bg-[#FFFDF7]/95 backdrop-blur-xl">
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-black text-forest-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Checkout
          </button>
          <BrandLogo className="h-12 w-16" priority />
        </div>
      </section>

      <section className="section-shell grid gap-5 py-8 xl:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <CheckoutCard>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#EAF6E8] text-forest-700">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-black text-forest-900">Alamat Pengiriman</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-[#2F3E35]">
                  Saguta Customer
                </p>
                <p className="text-sm leading-6 text-[#5F6F64]">
                  Desa Galu, Kec. Anggalomoare, Kab. Konawe, Sulawesi Tenggara
                </p>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 shrink-0 text-forest-700/45" />
            </div>
          </CheckoutCard>

          <CheckoutCard>
            <div className="flex items-center gap-2 text-sm font-black text-forest-700">
              <Store className="h-5 w-5" />
              SAGUTA Marketplace
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-[120px_1fr_auto]">
              <div className="relative h-28 overflow-hidden rounded-2xl bg-[#FFF7E8]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="120px"
                  className="object-contain p-4"
                />
              </div>
              <div>
                <h2 className="text-lg font-black text-forest-900">{product.name}</h2>
                <p className="mt-2 text-sm leading-6 text-[#5F6F64]">{product.description}</p>
                <p className="mt-3 text-sm font-bold text-forest-700">Stok {product.stock} pcs dari {product.area}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xl font-black text-forest-700">{product.price}</p>
                <p className="mt-2 text-sm font-bold text-[#5F6F64]">x{quantity}</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-[#EAF6E8] p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-forest-700" />
                <div>
                  <p className="text-sm font-black text-forest-900">Perlindungan Kemasan</p>
                  <p className="text-xs leading-5 text-[#5F6F64]">Produk dikemas aman untuk menjaga kualitas selama pengiriman.</p>
                </div>
                <p className="ml-auto shrink-0 text-sm font-black text-forest-700">{formatCurrency(packagingFee)}</p>
              </div>
            </div>
          </CheckoutCard>

          <CheckoutCard>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-black text-forest-900">Opsi Pengiriman</h2>
              <Truck className="h-5 w-5 text-forest-700" />
            </div>
            <div className="mt-4 grid gap-3">
              {shippingOptions.map((option) => {
                const isSelected = selectedShippingId === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onShippingChange(option.id)}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition",
                      isSelected
                        ? "border-forest-700 bg-[#EAF6E8] ring-4 ring-forest-700/10"
                        : "border-forest-700/10 bg-white hover:border-forest-700/30",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-black text-forest-900">{option.eta}</p>
                        <p className="mt-1 text-sm font-bold text-[#2F3E35]">{option.name}</p>
                        <p className="mt-1 text-xs leading-5 text-[#5F6F64]">{option.note}</p>
                      </div>
                      <p className="font-black text-forest-700">
                        {option.price === 0 ? "Gratis" : formatCurrency(option.price)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CheckoutCard>

          <CheckoutCard>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-black text-forest-900">Pesan untuk Penjual</h2>
              <span className="text-xs font-bold text-[#5F6F64]">Opsional</span>
            </div>
            <textarea
              value={buyerNote}
              onChange={(event) => onNoteChange(event.target.value)}
              rows={3}
              placeholder="Contoh: mohon dikemas rapi untuk oleh-oleh."
              className="mt-4 w-full resize-none rounded-2xl border border-forest-700/10 bg-white p-4 text-sm font-semibold text-forest-900 outline-none transition placeholder:text-[#5F6F64]/60 focus:border-forest-700 focus:ring-4 focus:ring-forest-700/10"
            />
          </CheckoutCard>

          <CheckoutCard>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-black text-forest-900">Metode Pembayaran</h2>
              <span className="text-xs font-bold text-forest-700">Pilih satu</span>
            </div>
            <div className="mt-4 divide-y divide-forest-700/10">
              {paymentMethods.map((method) => {
                const isSelected = selectedPaymentId === method.id;

                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => onPaymentChange(method.id)}
                    className="flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
                      isSelected ? "bg-forest-700 text-white" : "bg-[#EAF6E8] text-forest-700",
                    )}>
                      <method.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-black text-forest-900">{method.name}</span>
                      <span className="mt-1 block text-sm leading-5 text-[#5F6F64]">{method.description}</span>
                    </span>
                    <span className={cn(
                      "ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full border",
                      isSelected ? "border-forest-700 bg-forest-700 text-white" : "border-forest-700/20 bg-white",
                    )}>
                      {isSelected && <CheckCircle2 className="h-4 w-4" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </CheckoutCard>
        </div>

        <aside className="xl:sticky xl:top-28 xl:self-start">
          <CheckoutCard className="border-forest-700/15">
            <h2 className="text-xl font-black text-forest-900">Rincian Pembayaran</h2>
            <div className="mt-5 space-y-3 text-sm">
              <PaymentRow label="Subtotal Pesanan" value={formatCurrency(subtotal)} />
              <PaymentRow label="Perlindungan Kemasan" value={formatCurrency(packagingFee)} />
              <PaymentRow label="Subtotal Pengiriman" value={formatCurrency(selectedShipping.price)} />
              <PaymentRow label="Biaya Layanan" value={formatCurrency(serviceFee)} />
            </div>
            <div className="mt-5 border-t border-forest-700/10 pt-5">
              <PaymentRow label="Total Pembayaran" value={formatCurrency(total)} strong />
            </div>
            <div className="mt-5 rounded-2xl bg-[#EAF6E8] p-4 text-sm leading-6 text-[#2F3E35]">
              Pembayaran dipilih: <span className="font-black text-forest-900">{selectedPayment.name}</span>
            </div>
          </CheckoutCard>
        </aside>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-forest-700/10 bg-[#FFFDF7]/95 py-4 shadow-soft backdrop-blur-xl">
        <div className="section-shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="text-right">
            <p className="text-xs font-bold text-[#5F6F64]">Total</p>
            <p className="text-2xl font-black text-forest-700">{formatCurrency(total)}</p>
          </div>
          <Button href={`https://wa.me/6285256448193?text=${orderText}`} variant="primary" className="sm:min-w-44">
            Buat Pesanan
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
}

function CheckoutCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-3xl border border-forest-700/10 bg-warm-50 p-5 shadow-card md:p-6", className)}>
      {children}
    </section>
  );
}

function PaymentRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", strong ? "text-base font-black text-forest-900" : "text-[#5F6F64]")}>
      <span>{label}</span>
      <span className={cn(strong ? "text-forest-700" : "font-bold text-[#2F3E35]")}>{value}</span>
    </div>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-forest-700/10 bg-white p-4">
      <Icon className="h-5 w-5 text-forest-700" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0] text-[#5F6F64]">{label}</p>
      <p className="mt-1 text-sm font-black text-forest-900">{value}</p>
    </div>
  );
}
