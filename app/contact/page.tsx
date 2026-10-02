import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LeadForm } from "@/components/site/LeadForm";
import { constructMetadata } from "@/lib/seo";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export const metadata = constructMetadata({
  title: "Contact Sales & Growth Team | RevGen IQ",
  description: "Get in touch with RevGen IQ B2B outbound strategists to discuss lead generation, cold calling, and SDR pods.",
  canonicalUrlRelative: "/contact",
});

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <SectionHeader
            badge="Direct Communication"
            title="Contact Our Sales Strategy Team"
            description="Have questions about custom target account list building, caller pod deployment, or deliverability setup?"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-2xl bg-card/60 border border-border space-y-6">
                <h3 className="text-xl font-bold text-foreground">Headquarters & Inquiries</h3>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Email Us</p>
                      <p className="text-muted-foreground/80">hello@revgeniq.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Call Sales Direct</p>
                      <p className="text-muted-foreground/80">+1 (800) REV-GEN1</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">San Francisco Office</p>
                      <p className="text-muted-foreground/80">One Market Tower, Suite 1900, San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground/80">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>NDAs signed prior to custom account strategy disclosure.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <LeadForm title="Send Us a Direct Message" subtitle="Fill out the form below and an outbound strategist will respond within 4 business hours." />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
