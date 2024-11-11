import { Icon, LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const backgroundVariants = cva(
  "rounded-full items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-sky-100",
        success: "bg-emerald-100",
        purple: "bg-purple-100"
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-sky-700",
        success: "text-emerald-700",
          purple: "text-purple-900"
      },
      size: {
        default: "h-8 w-8",
        sm: "h-4 w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps {
  icon: LucideIcon;
  backgroundVariant: BackgroundVariantsProps['variant'];
  iconVariant: IconVariantProps['variant'];
  size: BackgroundVariantsProps['size'] & IconVariantProps['size'];
};

export const IconBadge = ({
  icon: Icon,
  backgroundVariant,
  iconVariant,
  size,
}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant: backgroundVariant, size }))}>
      <Icon className={cn(iconVariants({ variant: iconVariant, size }))} />
    </div>
  );
};