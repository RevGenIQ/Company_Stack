import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[oklch(0.45_0.015_252)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.75_0.15_75/0.5)] focus-visible:border-[oklch(0.75_0.15_75/0.6)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors border-[oklch(0.22_0.025_252)] bg-[oklch(0.13_0.028_252/0.8)] text-[oklch(0.96_0.008_90)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
