import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ServiceCard } from "@/components/site/ServiceCard";
import { INITIAL_SERVICES } from "@/lib/mock-store";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "B2B Revenue Generation Services | RevGen IQ",
  description: "Explore RevGen IQ outbound services: B2B lead generation, cold calling, appointment setting, SDR pods, email outreach, and sales outsourcing.",
  canonicalUrlRelative: "/services",
});

export default function ServicesPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <SectionHeader
            badge="Solutions Portfolio"
            title="Outbound B2B Revenue Generation Services"
            description="Modular outbound capabilities engineered to plug directly into your sales motion or operate as a fully managed revenue pod."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {INITIAL_SERVICES.map((serv) => (
              <ServiceCard key={serv.id} service={serv} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
