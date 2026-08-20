"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CircleUserRound,
  Menu,
  ShoppingBag,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const [activeId, setActiveId] = useState(navItems[0].id);

  useEffect(() => {
    const closeMobileMenuOnOutsideClick = (event: PointerEvent) => {
      const mobileMenu = mobileMenuRef.current;

      if (
        mobileMenu?.open &&
        event.target instanceof Node &&
        !mobileMenu.contains(event.target)
      ) {
        mobileMenu.open = false;
      }
    };

    document.addEventListener("pointerdown", closeMobileMenuOnOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", closeMobileMenuOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    const updateActiveFromHash = () => {
      const hashId = window.location.hash.replace("#", "");
      const matchingItem = navItems.find((item) => item.id === hashId);

      if (matchingItem) {
        setActiveId(matchingItem.id);
      }
    };

    updateActiveFromHash();
    window.addEventListener("hashchange", updateActiveFromHash);

    return () => {
      window.removeEventListener("hashchange", updateActiveFromHash);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-forest-700/10 bg-[#FFFDF7]/95 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between gap-4 xl:gap-6">
        <Link
          href="/#beranda"
          className="flex items-center gap-0.5"
          aria-label="Saguta Sultra"
          onClick={() => setActiveId("beranda")}
        >
          <BrandLogo className="h-16 w-[5.25rem]" priority />
          <span className="leading-tight">
            <span className="block text-2xl font-black tracking-[0] text-forest-700">
              SAGUTA
            </span>
            <span className="block text-xs font-semibold text-forest-900/70">
              Satu ekosistem, untuk sagu Sultra
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-forest-900 xl:flex 2xl:gap-8">
          {navItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "border-b-2 pb-2 transition-colors",
                  isActive
                    ? "border-forest-700 text-forest-700"
                    : "border-transparent hover:border-forest-700/40 hover:text-forest-700",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Button href="/marketplace" variant="primary" size="sm">
            Marketplace <ShoppingBag className="h-4 w-4" />
          </Button>
          <Button href="/gabung-petani" variant="secondary" size="sm">
            Gabung Petani <CircleUserRound className="h-4 w-4" />
          </Button>
        </div>

        <details ref={mobileMenuRef} className="group relative xl:hidden">
          <summary
            className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-full border border-forest-700/20 text-forest-700 [&::-webkit-details-marker]:hidden"
            aria-label="Buka navigasi"
          >
            <Menu className="h-6 w-6" />
          </summary>
          <nav className="absolute right-0 top-14 w-64 overflow-hidden rounded-3xl border border-forest-700/10 bg-warm-50 p-2 shadow-soft">
            {navItems.map((item) => {
              const isActive = activeId === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm font-bold",
                    isActive
                      ? "bg-[#EAF6E8] text-forest-700"
                      : "text-forest-900 hover:bg-[#EAF6E8] hover:text-forest-700",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="mt-2 grid gap-2 border-t border-forest-700/10 p-2">
              <Button href="/marketplace" variant="primary" size="sm" className="w-full">
                Marketplace <ShoppingBag className="h-4 w-4" />
              </Button>
              <Button href="/gabung-petani" variant="secondary" size="sm" className="w-full">
                Gabung Petani <CircleUserRound className="h-4 w-4" />
              </Button>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
