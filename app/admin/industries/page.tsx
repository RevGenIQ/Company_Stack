"use client";

import { useState } from "react";
import { INITIAL_INDUSTRIES } from "@/lib/mock-store";
import { Button } from "@/components/ui/button";
import { Building, Plus } from "lucide-react";

export default function AdminIndustriesPage() {
  const [industries] = useState(INITIAL_INDUSTRIES);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Industries Management</h1>
          <p className="text-slate-400 text-xs mt-1">Configure vertical industry pages and market-specific sales challenges.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind) => (
          <div key={ind.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xl font-bold text-white">{ind.name}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">{ind.blurb}</p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {ind.challenges.map((c, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
