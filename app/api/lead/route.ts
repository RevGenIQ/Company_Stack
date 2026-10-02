import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { sendLeadNotificationEmail } from "@/lib/resend";
import { INITIAL_LEADS } from "@/lib/mock-store";

const leadSchema = z.object({
  fullName: z.string().min(2),
  company: z.string().min(2),
  businessEmail: z.string().email(),
  phone: z.string().optional(),
  website: z.string().optional(),
  serviceInterest: z.string(),
  companySize: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  landing_page: z.string().optional(),
  referrer: z.string().optional(),
  page_url: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = leadSchema.parse(body);

    const supabase = createAdminSupabaseClient();

    let leadRecord;

    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .insert({
          full_name: validatedData.fullName,
          company: validatedData.company,
          business_email: validatedData.businessEmail,
          phone: validatedData.phone,
          website: validatedData.website,
          service_interest: validatedData.serviceInterest,
          company_size: validatedData.companySize,
          message: validatedData.message,
          consent: validatedData.consent,
          status: "NEW",
          utm_source: validatedData.utm_source,
          utm_medium: validatedData.utm_medium,
          utm_campaign: validatedData.utm_campaign,
          utm_term: validatedData.utm_term,
          utm_content: validatedData.utm_content,
          landing_page: validatedData.landing_page,
          referrer: validatedData.referrer,
          page_url: validatedData.page_url,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase lead insertion error:", error);
      } else {
        leadRecord = data;
      }
    }

    if (!leadRecord) {
      // Fallback in-memory lead creation
      leadRecord = {
        id: `lead-${Date.now()}`,
        full_name: validatedData.fullName,
        company: validatedData.company,
        business_email: validatedData.businessEmail,
        phone: validatedData.phone,
        service_interest: validatedData.serviceInterest,
        status: "NEW",
        created_at: new Date().toISOString(),
      };
      INITIAL_LEADS.unshift(leadRecord as any);
    }

    // Trigger email notification asynchronously via Resend
    await sendLeadNotificationEmail({
      fullName: validatedData.fullName,
      company: validatedData.company,
      businessEmail: validatedData.businessEmail,
      phone: validatedData.phone,
      serviceInterest: validatedData.serviceInterest,
      companySize: validatedData.companySize,
      message: validatedData.message,
      utmSource: validatedData.utm_source,
      utmMedium: validatedData.utm_medium,
      utmCampaign: validatedData.utm_campaign,
    });

    return NextResponse.json({
      success: true,
      message: "Lead successfully registered and notified.",
      lead: leadRecord,
    });
  } catch (err: any) {
    console.error("Lead API Route Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Invalid payload or server error",
      },
      { status: 400 }
    );
  }
}
