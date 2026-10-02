"use client";

import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminHeader() {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="relative w-72">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <Input
          placeholder="Search leads, posts, accounts..."
          className="pl-9 bg-slate-900/80 border-slate-800 text-xs h-9"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1.5 right-1.5 animate-ping" />
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
            Welcome
          </div>
          <div className="hidden sm:block text-left text-xs">
            <p className="font-bold text-white">Sir</p>
            <p className="text-slate-500 text-[10px]">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
