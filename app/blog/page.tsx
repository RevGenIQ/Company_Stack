"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { BlogCard } from "@/components/site/BlogCard";
import { INITIAL_BLOG_POSTS } from "@/lib/mock-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Clock, Search, Sparkles } from "lucide-react";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Strategy", "Playbooks", "Cold Calling", "Email", "Sales Ops"];

  const featuredPost = INITIAL_BLOG_POSTS.find((p) => p.is_featured) || INITIAL_BLOG_POSTS[0];

  const filteredPosts = INITIAL_BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      post.category?.name.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-16 pb-20">
      <section className="py-12 bg-grid-pattern bg-glow-gradient">
        <Container size="xl">
          <SectionHeader
            badge="B2B Revenue Insights"
            title="Outbound Sales Playbooks & Research"
            description="Proven strategies, deliverability benchmarks, cold calling talk tracks, and pipeline frameworks from the RevGen IQ team."
          />

          {/* Featured Article Banner */}
          {featuredPost && (
            <div className="mb-16 rounded-3xl border border-border bg-card/80 backdrop-blur-xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Featured Article
                  </span>
                  <span className="text-xs text-muted-foreground/80 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {featuredPost.reading_time_minutes} min read
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-amber-400 transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground/80 font-medium">
                    Published {formatDate(featuredPost.published_at)} by {featuredPost.author_name}
                  </span>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button variant="glow" size="sm" className="gap-2">
                      Read Featured Post
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 h-64 lg:h-full rounded-2xl overflow-hidden relative">
                {featuredPost.featured_image ? (
                  <img
                    src={featuredPost.featured_image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-slate-950 flex items-center justify-center p-6 text-center">
                    <Sparkles className="w-12 h-12 text-amber-400" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-card/60 border border-border">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-background text-muted-foreground/80 border border-border hover:text-foreground"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-muted-foreground/80 absolute left-3 top-3" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background/80 border-border text-xs"
              />
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-muted-foreground/80 border border-border rounded-2xl bg-card/40">
              <p>No articles found matching your criteria.</p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
