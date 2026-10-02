"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminBlogIndexPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadPosts() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("blog_posts")
        .select("*, category:blog_categories(name)")
        .order("created_at", { ascending: false });
      
      if (data) setPosts(data);
      setLoading(false);
    }
    loadPosts();
  }, [supabase]);

  const togglePublish = async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (!post || !supabase) return;

    // Optimistic update
    setPosts((prev) =>
      prev.map((p) => p.id === id ? { ...p, is_published: !p.is_published } : p)
    );

    const { error } = await supabase
      .from("blog_posts")
      .update({ is_published: !post.is_published })
      .eq("id", id);
      
    if (error) {
      toast.error("Failed to update status");
      // Revert
      setPosts((prev) =>
        prev.map((p) => p.id === id ? { ...p, is_published: post.is_published } : p)
      );
    } else {
      toast.success("Article status updated");
    }
  };

  const toggleFeatured = async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (!post || !supabase) return;

    // Optimistic update
    setPosts((prev) =>
      prev.map((p) => p.id === id ? { ...p, is_featured: !p.is_featured } : { ...p, is_featured: false })
    );

    const { error } = await supabase
      .from("blog_posts")
      .update({ is_featured: !post.is_featured })
      .eq("id", id);

    // If making this one featured, un-feature others
    if (!post.is_featured) {
      await supabase.from("blog_posts").update({ is_featured: false }).neq("id", id);
    }

    if (error) {
      toast.error("Failed to update featured status");
    } else {
      toast.success("Featured article updated");
    }
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (confirm("Are you sure you want to delete this post?")) {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) {
        toast.error("Failed to delete article");
      } else {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Article deleted");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Blog CMS Articles</h1>
          <p className="text-muted-foreground/80 text-xs mt-1">Manage articles, draft previews, featured status, and category tags.</p>
        </div>

        <Link href="/admin/blog/new">
          <Button variant="glow" size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Create New Post
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-muted-foreground">
            <thead className="bg-background text-muted-foreground/80 font-semibold border-b border-border uppercase tracking-wider">
              <tr>
                <th className="p-4">Article Title & Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Published Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loading ? (
                 <tr><td colSpan={6} className="p-8 text-center text-muted-foreground/60">Loading articles...</td></tr>
              ) : posts.length === 0 ? (
                 <tr><td colSpan={6} className="p-8 text-center text-muted-foreground/60">No articles found. Create your first post!</td></tr>
              ) : posts.map((post) => (
                <tr key={post.id} className="hover:bg-secondary/40 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-foreground text-sm block">{post.title}</span>
                    <span className="text-muted-foreground/60 text-[11px] block">/blog/{post.slug} • {post.category?.name || "Uncategorized"}</span>
                  </td>
                  <td className="p-4 text-muted-foreground font-medium">{post.author_name}</td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(post.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${post.is_published
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleFeatured(post.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${post.is_featured
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                          : "text-slate-600 border-border hover:text-muted-foreground/80"
                        }`}
                      title="Toggle Featured"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="p-4 text-muted-foreground/80">{formatDate(post.published_at)}</td>
                  <td className="p-4 text-right space-x-2">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" title="Preview Live">
                        <Eye className="w-4 h-4 text-muted-foreground/80" />
                      </Button>
                    </Link>
                    <Link href={`/admin/blog/${post.id}`}>
                      <Button variant="ghost" size="icon" title="Edit Article">
                        <Edit className="w-4 h-4 text-amber-400" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} title="Delete Article">
                      <Trash2 className="w-4 h-4 text-rose-400" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
