import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminTestimonialsClient } from "@/components/admin/AdminTestimonialsClient";

export default async function AdminTestimonialsPage() {
  const supabase = await createServerSupabaseClient();
  let testimonials: any[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (data && data.length > 0) testimonials = data;
  }

  return <AdminTestimonialsClient initialData={testimonials} />;
}
