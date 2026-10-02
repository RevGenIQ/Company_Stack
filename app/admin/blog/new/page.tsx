"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
import { INITIAL_BLOG_POSTS } from "@/lib/mock-store";
import { toast } from "sonner";
import { ArrowLeft, Save, Sparkles } from "lucide-react";

export default function AdminNewBlogPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("<p>Start writing your B2B revenue article here...</p>");
  const [authorName, setAuthorName] = useState("RevGen IQ Team");
  const [categoryName, setCategoryName] = useState("Strategy");
  const [featuredImage, setFeaturedImage] = useState("");
  const [readingTime, setReadingTime] = useState(5);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(slugify(val));
    if (!seoTitle) setSeoTitle(val);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug) {
      toast.error("Please provide an article title and slug.");
      return;
    }

    const newPost = {
      id: `post-${Date.now()}`,
      title,
      slug,
      excerpt,
      content,
      author_name: authorName,
      category: { id: `cat-${Date.now()}`, slug: slugify(categoryName), name: categoryName },
      featured_image: featuredImage || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
      reading_time_minutes: Number(readingTime),
      is_featured: isFeatured,
      is_published: isPublished,
      published_at: new Date().toISOString(),
      seo_title: seoTitle || title,
      seo_description: seoDescription || excerpt,
    };

    INITIAL_BLOG_POSTS.unshift(newPost as any);
    toast.success("Article successfully created!");
    router.push("/admin/blog");
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto pb-16">
      <div className="flex items-center justify-between">
        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground/80 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Articles List
        </Link>

        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
            Cancel
          </Button>
          <Button type="submit" variant="glow" className="gap-2">
            <Save className="w-4 h-4" /> Publish Article
          </Button>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-card/80 border border-border space-y-6">
        <h1 className="text-2xl font-extrabold text-foreground">Create New Article</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Article Title *</label>
            <Input
              placeholder="e.g. 7 Cold Call Openers That Earn the Next 30 Seconds"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">URL Slug</label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Category</label>
              <select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="flex h-10 w-full rounded-md border border-border bg-background/70 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
              >
                <option value="Strategy">Strategy</option>
                <option value="Playbooks">Playbooks</option>
                <option value="Cold Calling">Cold Calling</option>
                <option value="Email">Email Outreach</option>
                <option value="Sales Ops">Sales Ops</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Excerpt Summary</label>
            <Textarea
              rows={2}
              placeholder="Short summary displayed on cards & social shares..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Featured Image URL</label>
            <Input
              placeholder="https://images.unsplash.com/photo-..."
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
            />
          </div>

          {/* TipTap Rich Text Editor */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-2">Article Body Content (TipTap Editor)</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* SEO Metadata Settings */}
        <div className="pt-6 border-t border-border space-y-4">
          <h3 className="text-base font-bold text-foreground">SEO & Publishing Options</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">SEO Title Tag</label>
              <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">SEO Meta Description</label>
              <Input value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded bg-background border-border text-cyan-500"
              />
              Publish Immediately
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded bg-background border-border text-cyan-500"
              />
              Set as Featured Article
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
