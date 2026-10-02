"use client";

import { useState } from "react";
import { INITIAL_TESTIMONIALS } from "@/lib/mock-store";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);

  const handleDelete = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast.success("Testimonial removed");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Testimonials Management</h1>
          <p className="text-slate-400 text-xs mt-1">Manage client quotes, executive endorsements, and social proof.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
            <p className="text-slate-300 text-xs italic leading-relaxed">"{t.text}"</p>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-xs">{t.author}</p>
                <p className="text-slate-400 text-[11px]">{t.company}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}>
                <Trash2 className="w-4 h-4 text-rose-400" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
