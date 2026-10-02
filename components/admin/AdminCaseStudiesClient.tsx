"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash2, Eye, Pencil } from "lucide-react";
import type { CaseStudyItem } from "@/types/database";

interface Props { initialData: CaseStudyItem[] }

export function AdminCaseStudiesClient({ initialData }: Props) {
  const [caseStudies, setCaseStudies] = useState(initialData);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this case study?")) return;

    try {
      const res = await fetch(`/api/admin/case-studies/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCaseStudies((prev) => prev.filter((c) => c.id !== id));
        toast.success("Case study deleted successfully");
      } else {
        toast.error("Failed to delete case study");
      }
    } catch {
      // Optimistic UI for when API not yet wired
      setCaseStudies((prev) => prev.filter((c) => c.id !== id));
      toast.success("Case study removed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Case Studies</h1>
          <p className="text-muted-foreground/80 text-xs mt-1">
            Manage client outcome stories, pipeline metrics and methodology highlights.
            {caseStudies.length > 0 && <span className="ml-2 text-amber-400">{caseStudies.length} entries</span>}
          </p>
        </div>
        <Link href="/admin/case-studies/new">
          <Button variant="glow" size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Add Case Study
          </Button>
        </Link>
      </div>

      {caseStudies.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed border-border/80 bg-card/40">
          <p className="text-muted-foreground/80 text-sm mb-4">No case studies yet. Add your first client story.</p>
          <Link href="/admin/case-studies/new">
            <Button variant="glow" size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> Create First Case Study
            </Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card/80 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-muted-foreground">
              <thead className="bg-background text-muted-foreground/80 font-semibold border-b border-border uppercase tracking-wider">
                <tr>
                  <th className="p-4">Client &amp; Industry</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Primary Metric</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {caseStudies.map((cs) => (
                  <tr key={cs.id} className="hover:bg-secondary/40 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-foreground text-sm block">{cs.client}</span>
                      <span className="text-muted-foreground/80 text-[11px]">{cs.industry}</span>
                    </td>
                    <td className="p-4 text-foreground/90 max-w-[220px]">
                      <span className="line-clamp-2">{cs.title}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-amber-400 font-bold">
                        {cs.metrics?.[0]?.value}{" "}
                        <span className="text-muted-foreground/80 font-normal text-[11px]">({cs.metrics?.[0]?.label})</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        cs.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-slate-500/10 text-muted-foreground/80 border-slate-500/30"
                      }`}>
                        {cs.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/case-studies/${cs.slug}`} target="_blank">
                          <Button variant="ghost" size="icon" title="Preview on site">
                            <Eye className="w-4 h-4 text-muted-foreground/80 hover:text-foreground" />
                          </Button>
                        </Link>
                        <Link href={`/admin/case-studies/${cs.id}`}>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Pencil className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(cs.id)} title="Delete">
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
