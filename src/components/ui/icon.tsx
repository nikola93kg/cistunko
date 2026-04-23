// src/components/ui/icon.tsx
import {
  Armchair,
  Baby,
  Bed,
  Chair,
  CheckCircle,
  HeartStraight,
  InstagramLogo,
  Leaf,
  Phone,
  ShieldCheck,
  WhatsappLogo,
  Wind,
  Wrench,
} from "@phosphor-icons/react";

export type IconName =
  | "Armchair"
  | "Baby"
  | "Bed"
  | "Chair"
  | "CheckCircle"
  | "HeartStraight"
  | "InstagramLogo"
  | "Leaf"
  | "Phone"
  | "ShieldCheck"
  | "WhatsappLogo"
  | "Wind"
  | "Wrench";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_REGISTRY: Record<IconName, React.ComponentType<any>> = {
  Armchair,
  Baby,
  Bed,
  Chair,
  CheckCircle,
  HeartStraight,
  InstagramLogo,
  Leaf,
  Phone,
  ShieldCheck,
  WhatsappLogo,
  Wind,
  Wrench,
};

type IconProps = {
  name: IconName;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
  "aria-hidden"?: boolean;
};

export function Icon({ name, size = 24, weight = "regular", className, "aria-hidden": ariaHidden }: IconProps) {
  const Component = ICON_REGISTRY[name];
  return <Component size={size} weight={weight} className={className} aria-hidden={ariaHidden} />;
}
