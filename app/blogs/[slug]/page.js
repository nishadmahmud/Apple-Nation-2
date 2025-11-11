import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchBlogs } from "../../../lib/api";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { MdArrowBack, MdCalendarToday, MdPerson } from "react-icons/md";

export const revalidate = 600; // Revalidate every 10 minutes

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Helper function to sanitize HTML (basic)
const sanitizeHTML = (html) => {
  if (!html) return "";
  // Remove HTML entities encoding
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

async function BlogDetailContent({ slug }) {
  try {
    // Fetch all blogs and find the one matching the slug
    const response = await fetchBlogs();
    
    if (!response?.success || !Array.isArray(response?.data)) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
              Blog Post Not Found
            </h1>
            <p className="mt-2 text-slate-600 dark:text-zinc-400">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/blogs"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              <MdArrowBack className="h-5 w-5" />
              Back to Blogs
            </Link>
          </div>
        </div>
      );
    }

    // Find the blog by slug or ID
    const blogs = response.data;
    const blog = blogs.find(
      (b) => 
        b.slug === slug || 
        String(b.id) === String(slug) ||
        b.slug?.toLowerCase() === slug?.toLowerCase()
    );

    if (!blog) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
              Blog Post Not Found
            </h1>
            <p className="mt-2 text-slate-600 dark:text-zinc-400">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/blogs"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              <MdArrowBack className="h-5 w-5" />
              Back to Blogs
            </Link>
          </div>
        </div>
      );
    }
    const cover = blog.image_path || blog.thumbnail || blog.cover_image || null;
    const content = sanitizeHTML(blog.description || blog.content || "");
    const dateLabel = formatDate(
      blog.published_at || blog.created_at || blog.updated_at
    );
    const author = blog.author || blog.author_name || "Apple Nation";

    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="mx-auto w-full max-w-4xl px-6 py-8 sm:px-10 lg:px-16">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <MdArrowBack className="h-5 w-5" />
            Back to Blogs
          </Link>

          {/* Blog Header */}
          <article className="space-y-8">
            {/* Cover Image */}
            {cover && (
              <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-amber-100/50 sm:h-96">
                <Image
                  src={cover}
                  alt={blog.title || "Blog post"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
            )}

            {/* Title and Meta */}
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:bg-amber-400/10 dark:text-amber-300">
                Insights & Stories
              </div>
              
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-zinc-100">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-zinc-400">
                {dateLabel && (
                  <div className="flex items-center gap-2">
                    <MdCalendarToday className="h-4 w-4" />
                    <span>{dateLabel}</span>
                  </div>
                )}
                {author && (
                  <div className="flex items-center gap-2">
                    <MdPerson className="h-4 w-4" />
                    <span>{author}</span>
                  </div>
                )}
              </div>

              {/* Excerpt/Short Description */}
              {(blog.short_description || blog.excerpt) && (
                <p className="text-lg leading-relaxed text-slate-700 dark:text-zinc-300">
                  {blog.short_description || blog.excerpt}
                </p>
              )}
            </div>

            {/* Blog Content */}
            {content && (
              <div className="rounded-xl border border-slate-200 bg-white/95 p-8 dark:border-zinc-700 dark:bg-zinc-800/90">
                <div
                  className="prose prose-slate max-w-none space-y-4 text-slate-700 dark:prose-invert dark:text-zinc-300 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:dark:text-zinc-100 [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:dark:text-zinc-100 [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:dark:text-zinc-100 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:mb-1 [&_strong]:font-semibold [&_strong]:text-slate-900 [&_strong]:dark:text-zinc-100 [&_img]:rounded-xl [&_img]:my-6 [&_a]:text-amber-600 [&_a]:underline [&_a]:hover:text-amber-700 [&_a]:dark:text-amber-400 [&_a]:dark:hover:text-amber-300"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            )}
          </article>

          {/* Related Blogs Section */}
          <div className="mt-16 border-t border-slate-200 pt-12 dark:border-zinc-700">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-zinc-100">
              More from Apple Nation
            </h2>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              View All Blogs
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
            Error Loading Blog
          </h1>
          <p className="mt-2 text-slate-600 dark:text-zinc-400">
            Something went wrong while loading the blog post.
          </p>
          <Link
            href="/blogs"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            <MdArrowBack className="h-5 w-5" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-zinc-900 dark:text-zinc-100">
          <div className="flex flex-col items-center gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-lg font-semibold text-slate-700 dark:text-zinc-300">
              Loading blog post...
            </p>
          </div>
        </div>
      }
    >
      <BlogDetailContent slug={slug} />
    </Suspense>
  );
}

