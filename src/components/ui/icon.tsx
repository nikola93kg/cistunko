import {
  Armchair,
  Baby,
  Bed,
  Chair,
  ChatCircleText,
  CheckCircle,
  HeartStraight,
  InstagramLogo,
  Leaf,
  Phone,
  ShieldCheck,
  WhatsappLogo,
  Wind,
  Wrench,
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react";

export type IconName =
  | "Armchair"
  | "Baby"
  | "Bed"
  | "Chair"
  | "ChatCircleText"
  | "CheckCircle"
  | "HeartStraight"
  | "InstagramLogo"
  | "Leaf"
  | "Phone"
  | "ShieldCheck"
  | "WhatsappLogo"
  | "Wind"
  | "Wrench";

const ICON_REGISTRY: Record<IconName, PhosphorIcon> = {
  Armchair,
  Baby,
  Bed,
  Chair,
  ChatCircleText,
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
  weight?: IconWeight;
  className?: string;
  "aria-hidden"?: boolean;
};

export function Icon({ name, size = 24, weight = "regular", className, "aria-hidden": ariaHidden }: IconProps) {
  const Component = ICON_REGISTRY[name];
  if (!Component) return null;
  return <Component size={size} weight={weight} className={className} aria-hidden={ariaHidden} />;
}
