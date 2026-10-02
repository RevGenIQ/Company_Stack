import { getStatusBadgeColor } from "@/lib/utils";
import { LeadStatus } from "@/types/database";

export function StatusBadge({ status }: { status: LeadStatus | string }) {
  const { bg, text, border } = getStatusBadgeColor(status);
  const formattedText = status.replace(/_/g, " ");

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${bg} ${text} ${border}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {formattedText}
    </span>
  );
}
