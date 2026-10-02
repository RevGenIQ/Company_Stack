"use client";

import { useState } from "react";
import { INITIAL_SERVICES } from "@/lib/mock-store";
import { Button } from "@/components/ui/button";
import { Layers, Plus, TrendingUp } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState(INITIAL_SERVICES);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Services Management</h1>
          <p className="text-muted-foreground/80 text-xs mt-1">Configure service offerings, process steps, and outcome metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="p-6 rounded-2xl bg-card/80 border border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 font-mono">/services/{s.slug}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {s.metric.value}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground">{s.name}</h3>
            <p className="text-muted-foreground/80 text-xs line-clamp-2 leading-relaxed">{s.short_description}</p>
            <div className="pt-2 border-t border-border flex justify-end">
              <Button variant="outline" size="sm" className="text-xs">
                Edit Offering
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
