import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function BrandLogo({
  className,
  imageClassName,
  priority = false,
}: BrandLogoProps) {
  return (
    <span className={cn("relative block h-14 w-20 shrink-0", className)}>
      <Image
        src="/images/branding/saguta-logo.png"
        alt="Logo Saguta"
        fill
        priority={priority}
        sizes="80px"
        className={cn("object-contain", imageClassName)}
      />
    </span>
  );
}
