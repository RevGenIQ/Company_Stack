import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { LeadForm } from "@/components/site/LeadForm";
import { INITIAL_BLOG_POSTS } from "@/lib/mock-store";
import { constructMetadata } from "@/lib/seo";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Clock, User } from "lucide-react";

export async function generateStaticParams() {
  return INITIAL_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return constructMetadata({ title: "Article Not Found" });

  return constructMetadata({
    title: `${post.seo_title || post.title} | RevGen IQ Insights`,
    description: post.seo_description || post.excerpt,
    canonicalUrlRelative: `/blog/${post.slug}`,
    ogImage: post.og_image || post.featured_image,
    type: "article",
  });
}

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = INITIAL_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleUrl = `https://revgeniq.com/blog/${post.slug}`;

  return (
    <div className="space-y-16 pb-20">
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={articleUrl}
        publishedAt={post.published_at || new Date().toISOString()}
        authorName={post.author_name}
        imageUrl={post.featured_image}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: post.title, item: `/blog/${post.slug}` },
        ]}
      />

      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground/80 hover:text-amber-400 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <article className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                {post.category && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {post.category.name}
                  </span>
                )}

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground/80 border-y border-border py-3">
                  <span className="flex items-center gap-1 text-foreground/90">
                    <User className="w-4 h-4 text-amber-400" />
                    {post.author_name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {post.reading_time_minutes} min read
                  </span>
                  <span>•</span>
                  <span>Published {formatDate(post.published_at)}</span>
                </div>
              </div>

              {post.featured_image && (
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-border">
                  <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Rich Text Body */}
              <div
                className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-base space-y-4 font-normal"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            <div className="lg:col-span-4 space-y-8">
              <LeadForm title="Turn Strategy into Pipeline" subtitle="Let RevGen IQ execute high-yield outbound campaigns for your sales organization." />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
