"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const ProgressVariant = cva(
  "h-full w-full flex-1 bg-primary transition-all",
  {
    variants: {
        variant:{
          default: "bg-green-600",
          success: "bg-green-600"
        },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)


export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof ProgressVariant> {}

  type CombineProgressProps = ProgressProps & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>


const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
    CombineProgressProps
>(({ className, value, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(ProgressVariant({ variant }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
