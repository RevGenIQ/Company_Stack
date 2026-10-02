"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { INITIAL_BLOG_POSTS } from "@/lib/mock-store";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

export default function AdminEditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const existingPost = INITIAL_BLOG_POSTS.find((p) => p.id === id) || INITIAL_BLOG_POSTS[0];

  const [title, setTitle] = useState(existingPost ? existingPost.title : "");
  const [slug, setSlug] = useState(existingPost ? existingPost.slug : "");
  const [excerpt, setExcerpt] = useState(existingPost ? existingPost.excerpt : "");
  const [content, setContent] = useState(existingPost ? existingPost.content : "");
  const [authorName, setAuthorName] = useState(existingPost ? existingPost.author_name : "RevGen IQ Team");
  const [categoryName, setCategoryName] = useState(existingPost?.category?.name || "Strategy");
  const [featuredImage, setFeaturedImage] = useState(existingPost?.featured_image || "");
  const [isFeatured, setIsFeatured] = useState<boolean>(Boolean(existingPost?.is_featured));
  const [isPublished, setIsPublished] = useState<boolean>(Boolean(existingPost?.is_published));
  const [seoTitle, setSeoTitle] = useState(existingPost?.seo_title || "");
  const [seoDescription, setSeoDescription] = useState(existingPost?.seo_description || "");

  if (!existingPost) {
    return <div className="p-8 text-white">Post not found.</div>;
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    existingPost.title = title;
    existingPost.slug = slug;
    existingPost.excerpt = excerpt;
    existingPost.content = content;
    existingPost.author_name = authorName;
    existingPost.featured_image = featuredImage;
    existingPost.is_featured = isFeatured;
    existingPost.is_published = isPublished;
    existingPost.seo_title = seoTitle;
    existingPost.seo_description = seoDescription;

    toast.success("Article updated successfully!");
    router.push("/admin/blog");
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-8 max-w-5xl mx-auto pb-16">
      <div className="flex items-center justify-between">
        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Articles List
        </Link>

        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/blog")}>
            Cancel
          </Button>
          <Button type="submit" variant="glow" className="gap-2">
            <Save className="w-4 h-4" /> Update Article
          </Button>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Edit Article</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Article Title *</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
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
            <label className="block text-xs font-semibold text-slate-300 mb-1">Excerpt Summary</label>
            <Textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Featured Image URL</label>
            <Input value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Article Content (TipTap Editor)</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">SEO & Publishing Options</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SEO Title Tag</label>
              <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SEO Meta Description</label>
              <Input value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-cyan-500"
              />
              Is Published
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-cyan-500"
              />
              Set as Featured Article
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
