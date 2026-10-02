import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Container({ children, className, size = "lg", ...props }: ContainerProps) {
  const maxWidths = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
  };

  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8 w-full", maxWidths[size], className)} {...props}>
      {children}
    </div>
  );
}
