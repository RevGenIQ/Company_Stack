import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import { INITIAL_CASE_STUDIES } from "@/lib/mock-store";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Outbound B2B Case Studies & Results | RevGen IQ",
  description: "Explore real case studies showing how RevGen IQ tripled qualified pipeline and generated millions in new revenue for B2B clients.",
  canonicalUrlRelative: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <div className="space-y-16 pb-20">
      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <SectionHeader
            badge="Verified Results"
            title="Outbound B2B Revenue Case Studies"
            description="Detailed breakdowns of how our account mapping, cold calling, and SDR pods delivered pipeline growth."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {INITIAL_CASE_STUDIES.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
