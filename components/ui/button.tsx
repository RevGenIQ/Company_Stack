import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * RevGen IQ Button — gold-accent design system.
 * Variants: default (gold gradient) · outline · ghost · destructive · glow · link
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.75_0.15_75)] focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.12_0.028_252)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        /** Solid gold gradient — primary CTA */
        default:
          "bg-gradient-to-r from-[oklch(0.82_0.13_78)] to-[oklch(0.68_0.15_72)] text-[oklch(0.11_0.028_252)] shadow hover:from-[oklch(0.88_0.12_80)] hover:to-[oklch(0.72_0.16_74)] border border-[oklch(0.75_0.15_75/0.25)]",
        /** Destructive / danger */
        destructive:
          "bg-rose-600 text-white shadow-sm hover:bg-rose-500",
        /** Navy outline with gold hover */
        outline:
          "border border-[oklch(0.22_0.025_252)] bg-[oklch(0.16_0.028_252/0.5)] text-[oklch(0.96_0.008_90)] shadow-sm hover:bg-[oklch(0.20_0.028_252)] hover:text-white hover:border-[oklch(0.75_0.15_75/0.4)]",
        /** Muted secondary */
        secondary:
          "bg-[oklch(0.20_0.028_252)] text-[oklch(0.96_0.008_90)] shadow-sm hover:bg-[oklch(0.24_0.025_252)]",
        /** Ghost — no background */
        ghost:
          "hover:bg-[oklch(0.20_0.028_252)] hover:text-[oklch(0.75_0.15_75)] text-[oklch(0.80_0.012_90)]",
        /** Text link */
        link:
          "text-[oklch(0.75_0.15_75)] underline-offset-4 hover:underline hover:text-[oklch(0.88_0.12_80)]",
        /** Gold glow — hero / book-a-call CTAs */
        glow:
          "bg-[oklch(0.75_0.15_75)] text-[oklch(0.11_0.028_252)] font-bold shadow-[0_0_22px_oklch(0.75_0.15_75/0.50)] hover:bg-[oklch(0.82_0.13_78)] hover:shadow-[0_0_30px_oklch(0.75_0.15_75/0.65)] border border-[oklch(0.90_0.10_83/0.3)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm:      "h-8 rounded-md px-3 text-xs",
        lg:      "h-12 rounded-md px-8 text-base",
        icon:    "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
