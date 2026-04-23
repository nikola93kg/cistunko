// src/components/ui/pill-button.tsx
import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "whatsapp";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[50px] px-8 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-[#3cc0cc] to-[#189cb4] text-white shadow-md hover:shadow-lg hover:brightness-105",
  secondary:
    "border-2 border-[#3cc0cc] bg-transparent text-[#3cc0cc] hover:bg-[#f0fbfc]",
  whatsapp:
    "bg-gradient-to-br from-[#a0c850] to-[#7aab28] text-white shadow-md hover:shadow-lg hover:brightness-105",
};

type PillButtonProps = {
  variant?: Variant;
  href: string;
  className?: string;
  children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function PillButton({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: PillButtonProps) {
  return (
    <a href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
