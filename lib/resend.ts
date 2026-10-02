import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface LeadEmailNotification {
  fullName: string;
  company: string;
  businessEmail: string;
  phone?: string;
  serviceInterest: string;
  companySize?: string;
  message?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export async function sendLeadNotificationEmail(lead: LeadEmailNotification) {
  if (!resend) {
    console.log("[Resend Mock] Email notification triggered for lead:", lead.businessEmail);
    return { success: true, mock: true };
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || "leads@revgeniq.com";

  try {
    const data = await resend.emails.send({
      from: "RevGen IQ Leads <notifications@revgeniq.com>",
      to: [notificationEmail],
      subject: `⚡ New B2B Lead Captured: ${lead.fullName} (${lead.company})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f3f4f6; padding: 24px; border-radius: 8px;">
          <h2 style="color: #06b6d4; border-bottom: 1px solid #1f2937; padding-bottom: 12px;">New Lead Received</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px; color: #9ca3af;">Name:</td><td style="padding: 8px; font-weight: bold;">${lead.fullName}</td></tr>
            <tr><td style="padding: 8px; color: #9ca3af;">Company:</td><td style="padding: 8px; font-weight: bold;">${lead.company}</td></tr>
            <tr><td style="padding: 8px; color: #9ca3af;">Email:</td><td style="padding: 8px; font-weight: bold; color: #3b82f6;">${lead.businessEmail}</td></tr>
            <tr><td style="padding: 8px; color: #9ca3af;">Phone:</td><td style="padding: 8px;">${lead.phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; color: #9ca3af;">Service:</td><td style="padding: 8px; font-weight: bold; color: #22d3ee;">${lead.serviceInterest}</td></tr>
            <tr><td style="padding: 8px; color: #9ca3af;">Company Size:</td><td style="padding: 8px;">${lead.companySize || 'N/A'}</td></tr>
          </table>

          ${lead.message ? `
            <div style="margin-top: 20px; padding: 12px; background: #111827; border-radius: 6px; border-left: 3px solid #06b6d4;">
              <strong style="color: #9ca3af; display: block; margin-bottom: 4px;">Message:</strong>
              ${lead.message}
            </div>
          ` : ''}

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1f2937; font-size: 12px; color: #6b7280;">
            <strong>Attribution:</strong> Source: ${lead.utmSource || 'direct'} | Medium: ${lead.utmMedium || 'none'} | Campaign: ${lead.utmCampaign || 'none'}
          </div>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send Resend email:", error);
    return { success: false, error };
  }
}
