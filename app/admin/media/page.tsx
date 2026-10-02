"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Upload, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function AdminMediaPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const sampleMedia = [
    { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800", name: "outbound-strategy.jpg", size: "340 KB" },
    { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800", name: "icp-workshop.jpg", size: "420 KB" },
    { url: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=800", name: "cold-calling-pod.jpg", size: "290 KB" },
    { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800", name: "analytics-dashboard.jpg", size: "510 KB" },
  ];

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    toast.success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Media Library & Supabase Storage</h1>
          <p className="text-slate-400 text-xs mt-1">Upload and manage images for blog posts, case studies, and brand assets.</p>
        </div>

        <Button variant="glow" size="sm" className="gap-2">
          <Upload className="w-4 h-4" /> Upload New Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sampleMedia.map((m, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="h-40 rounded-xl overflow-hidden bg-slate-950">
              <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold text-white truncate">{m.name}</p>
              <p className="text-[11px] text-slate-500">{m.size}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(m.url, idx)}
              className="w-full text-xs gap-1.5"
            >
              {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedIndex === idx ? "Copied!" : "Copy Image URL"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
