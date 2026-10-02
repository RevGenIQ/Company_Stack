"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  Layers,
  Building,
  MessageSquare,
  Image as ImageIcon,
  UserCheck,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Lead Pipeline", icon: Users },
  { href: "/admin/blog", label: "Blog CMS", icon: FileText },
  { href: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/industries", label: "Industries", icon: Building },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/users", label: "User Roles", icon: UserCheck },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 flex flex-col justify-between shrink-0 min-h-screen border-r"
      style={{
        backgroundColor: "oklch(0.11 0.028 252)",
        borderColor: "oklch(0.20 0.025 252)",
      }}
    >
      <div className="p-6 space-y-6">

        <div
          className="pt-4 border-t"
          style={{ borderColor: "oklch(0.20 0.025 252)" }}
        >
          <span
            className="text-[10px] font-extrabold uppercase tracking-widest block mb-3 px-2"
            style={{ color: "oklch(0.45 0.015 252)" }}
          >
            Internal CMS Platform
          </span>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors"
                  style={
                    isActive
                      ? {
                        background: "oklch(0.75 0.15 75 / 0.12)",
                        color: "oklch(0.75 0.15 75)",
                        border: "1px solid oklch(0.75 0.15 75 / 0.30)",
                        fontWeight: 600,
                      }
                      : {
                        color: "oklch(0.60 0.018 252)",
                      }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.96 0.008 90)";
                      (e.currentTarget as HTMLElement).style.background = "oklch(0.16 0.028 252)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.60 0.018 252)";
                      (e.currentTarget as HTMLElement).style.background = "";
                    }
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div
        className="p-4 border-t"
        style={{ borderColor: "oklch(0.20 0.025 252)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors"
          style={{ color: "oklch(0.55 0.015 252)" }}
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Exit to Public Site</span>
        </Link>
      </div>
    </aside>
  );
}
