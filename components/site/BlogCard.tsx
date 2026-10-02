import Link from "next/link";
import { BlogPost } from "@/types/database";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Clock } from "lucide-react";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group glass-panel glass-panel-hover flex flex-col justify-between h-full overflow-hidden">
      {/* Featured image / placeholder */}
      <div
        className="relative h-48 w-full overflow-hidden"
        style={{ backgroundColor: "oklch(0.13 0.028 252)" }}
      >
        {post.featured_image ? (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center p-6 text-center"
            style={{ background: "linear-gradient(135deg, oklch(0.14 0.028 252), oklch(0.11 0.028 252))" }}
          >
            <span className="text-xl font-bold" style={{ color: "oklch(0.30 0.020 252)" }}>
              RevGen IQ Insights
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, oklch(0.12 0.028 252), oklch(0.12 0.028 252 / 0.3), transparent)" }}
        />
        {/* Category badge */}
        {post.category && (
          <div className="absolute top-4 left-4">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border"
              style={{
                background:  "oklch(0.75 0.15 75 / 0.18)",
                color:       "oklch(0.90 0.12 82)",
                borderColor: "oklch(0.75 0.15 75 / 0.40)",
              }}
            >
              {post.category.name}
            </span>
          </div>
        )}
      </div>

      <CardHeader className="space-y-2 pt-4">
        <div
          className="flex items-center gap-4 text-xs font-medium"
          style={{ color: "oklch(0.55 0.015 252)" }}
        >
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" style={{ color: "oklch(0.75 0.15 75)" }} />
            {post.reading_time_minutes} min read
          </span>
          <span>•</span>
          <span>{formatDate(post.published_at || post.created_at)}</span>
        </div>
        <CardTitle
          className="text-xl transition-colors line-clamp-2"
          style={{ color: "oklch(0.96 0.008 90)" }}
        >
          {post.title}
        </CardTitle>
        <CardDescription
          className="text-sm leading-relaxed line-clamp-2"
          style={{ color: "oklch(0.60 0.018 252)" }}
        >
          {post.excerpt}
        </CardDescription>
      </CardHeader>

      <CardFooter
        className="pt-4 border-t"
        style={{ borderColor: "oklch(0.22 0.025 252 / 0.6)" }}
      >
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold w-full justify-between transition-colors hover:text-[oklch(0.88_0.12_80)]"
          style={{ color: "oklch(0.75 0.15 75)" }}
        >
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
