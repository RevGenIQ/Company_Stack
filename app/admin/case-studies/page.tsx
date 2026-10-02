import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminCaseStudiesClient } from "@/components/admin/AdminCaseStudiesClient";

export default async function AdminCaseStudiesPage() {
  const supabase = await createServerSupabaseClient();
  let caseStudies: any[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: false });
    if (data && data.length > 0) caseStudies = data;
  }

  return <AdminCaseStudiesClient initialData={caseStudies} />;
}
