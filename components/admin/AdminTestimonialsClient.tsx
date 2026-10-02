"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash2, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props { initialData: any[] }

export function AdminTestimonialsClient({ initialData }: Props) {
  const [testimonials, setTestimonials] = useState(initialData);
  const supabase = createClient();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    if (!supabase) {
      // Optimistic UI for when Supabase is not available
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success("Testimonial removed");
      return;
    }

    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (!error) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        toast.success("Testimonial deleted successfully");
      } else {
        toast.error("Failed to delete testimonial");
      }
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Client Testimonials</h1>
          <p className="text-muted-foreground/80 text-xs mt-1">
            Manage quotes, endorsements, and social proof for the homepage and case studies.
            {testimonials.length > 0 && <span className="ml-2 text-amber-400">{testimonials.length} entries</span>}
          </p>
        </div>
        <Button variant="glow" size="sm" className="gap-2">
          <Plus className="w-4 h-4" /> Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border bg-card/40">
          <p className="text-muted-foreground/80 text-sm mb-4">No testimonials yet. Add a client quote.</p>
          <Button variant="glow" size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Create First Testimonial
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card/80 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-muted-foreground">
              <thead className="bg-background text-muted-foreground/80 font-semibold border-b border-border uppercase tracking-wider">
                <tr>
                  <th className="p-4">Author & Company</th>
                  <th className="p-4">Quote</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/80">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-secondary/40 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-foreground text-sm block">{t.author}</span>
                      <span className="text-muted-foreground/80 text-[11px]">{t.role && `${t.role} at `}{t.company}</span>
                    </td>
                    <td className="p-4 text-foreground/90 max-w-[300px]">
                      <span className="line-clamp-2 italic">&ldquo;{t.text}&rdquo;</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        t.is_featured
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-secondary text-muted-foreground/80 border-border"
                      }`}>
                        {t.is_featured ? "Featured" : "Standard"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" title="Edit">
                          <Pencil className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)} title="Delete">
                          <Trash2 className="w-4 h-4 text-rose-400 hover:text-rose-300" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
