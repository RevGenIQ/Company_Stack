"use client";

import { useState } from "react";
import Link from "next/link";
import { INITIAL_BLOG_POSTS } from "@/lib/mock-store";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, Plus, Edit, Trash2, Eye, Star } from "lucide-react";

export default function AdminBlogIndexPage() {
  const [posts, setPosts] = useState(INITIAL_BLOG_POSTS);

  const togglePublish = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, is_published: !p.is_published } : p
      )
    );
    toast.success("Article status updated");
  };

  const toggleFeatured = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, is_featured: !p.is_featured } : { ...p, is_featured: false }
      )
    );
    toast.success("Featured article updated");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Article deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Blog CMS Articles</h1>
          <p className="text-slate-400 text-xs mt-1">Manage articles, draft previews, featured status, and category tags.</p>
        </div>

        <Link href="/admin/blog/new">
          <Button variant="glow" size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Create New Post
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
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
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-white text-sm block">{post.title}</span>
                    <span className="text-slate-500 text-[11px] block">/blog/{post.slug} • {post.category?.name || "Uncategorized"}</span>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">{post.author_name}</td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePublish(post.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                        post.is_published
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
                      className={`p-1.5 rounded-lg border transition-colors ${
                        post.is_featured
                          ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                          : "text-slate-600 border-slate-800 hover:text-slate-400"
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="p-4 text-slate-400">{formatDate(post.published_at)}</td>
                  <td className="p-4 text-right space-x-2">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" title="Preview Live">
                        <Eye className="w-4 h-4 text-slate-400" />
                      </Button>
                    </Link>
                    <Link href={`/admin/blog/${post.id}`}>
                      <Button variant="ghost" size="icon" title="Edit Article">
                        <Edit className="w-4 h-4 text-cyan-400" />
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
