import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

const variants = {
  primary:
    "bg-forest-700 text-white shadow-card hover:bg-forest-600 focus-visible:outline-forest-700",
  secondary:
    "border border-forest-700 bg-warm-50 text-forest-700 hover:bg-forest-700 hover:text-white focus-visible:outline-forest-700",
  gold:
    "bg-gold-500 text-forest-900 shadow-card hover:bg-gold-400 focus-visible:outline-gold-600",
  ghost:
    "text-forest-700 hover:bg-forest-700/10 focus-visible:outline-forest-700",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-6 text-base",
};

export function Button(props: ButtonProps | LinkProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    ...rest
  } = props;

  const buttonClass = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <a className={buttonClass} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClass} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
