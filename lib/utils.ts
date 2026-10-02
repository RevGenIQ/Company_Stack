import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string | undefined | null): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(d);
  } catch {
    return dateString;
  }
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function getStatusBadgeColor(status: string): {
  bg: string;
  text: string;
  border: string;
} {
  switch (status.toUpperCase()) {
    case "NEW":
      return { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30" };
    case "CONTACTED":
      return { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" };
    case "QUALIFIED":
      return { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" };
    case "MEETING_BOOKED":
      return { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" };
    case "PROPOSAL":
      return { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" };
    case "WON":
      return { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" };
    case "LOST":
      return { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30" };
    case "NURTURE":
      return { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/30" };
    default:
      return { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/30" };
  }
}
