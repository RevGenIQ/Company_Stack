"use client";

import { useState } from "react";
import Link from "next/link";
import { INITIAL_CASE_STUDIES } from "@/lib/mock-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Briefcase, Plus, Edit, Trash2, Eye } from "lucide-react";

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState(INITIAL_CASE_STUDIES);

  const handleDelete = (id: string) => {
    if (confirm("Delete this case study?")) {
      setCaseStudies((prev) => prev.filter((c) => c.id !== id));
      toast.success("Case study deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Case Studies CMS</h1>
          <p className="text-slate-400 text-xs mt-1">Manage client outcome stories, pipeline lift metrics, and testimonials.</p>
        </div>

        <Link href="/admin/case-studies/new">
          <Button variant="glow" size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Create Case Study
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="p-4">Client & Industry</th>
                <th className="p-4">Title</th>
                <th className="p-4">Primary Metric</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {caseStudies.map((cs) => (
                <tr key={cs.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-white text-sm block">{cs.client}</span>
                    <span className="text-slate-400 text-[11px]">{cs.industry}</span>
                  </td>
                  <td className="p-4 text-slate-200">{cs.title}</td>
                  <td className="p-4">
                    <span className="text-cyan-400 font-bold">
                      {cs.metrics[0]?.value} ({cs.metrics[0]?.label})
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Published
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link href={`/case-studies/${cs.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" title="Preview">
                        <Eye className="w-4 h-4 text-slate-400" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(cs.id)} title="Delete">
                      <Trash2 className="w-4 h-4 text-rose-400" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
