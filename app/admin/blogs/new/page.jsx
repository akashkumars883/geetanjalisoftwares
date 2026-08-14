"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Upload, X, Check } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState("file"); // "file" or "url"

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Engineering",
    author: "Team Geetanjali Softwares",
    excerpt: "",
    image_url: "",
    content: "",
    is_published: true,
  });

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      title,
      slug: generatedSlug,
    }));
  };

  // Convert computer file upload to Data URL / Base64
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, image_url: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Article Title is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        alert("Blog article published successfully!");
        router.push("/admin/blogs");
      } else {
        alert(result.error || "Failed to create blog post.");
      }
    } catch (err) {
      console.error("Error creating blog post:", err);
      alert("Error submitting blog post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-full space-y-8 font-sans block">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-black transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Articles
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Create New Blog Post
          </h1>
          <p className="text-xs text-stone-500 font-light">
            Fill in the details below to add a new article directly to your database and website sitemap.
          </p>
        </div>
      </div>

      {/* Form Card - 100% Full Width */}
      <form onSubmit={handleSubmit} className="w-full bg-white border border-stone-200 rounded-md p-6 sm:p-10 space-y-6 block">
        {/* Title */}
        <div className="space-y-1.5 w-full">
          <label htmlFor="blog-title" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Article Title <span className="text-red-500">*</span>
          </label>
          <input
            id="blog-title"
            type="text"
            required
            placeholder="e.g. Custom Software Development for Businesses in 2026"
            value={formData.title}
            onChange={handleTitleChange}
            className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-3 text-sm text-stone-900 font-semibold focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Slug & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div className="space-y-1.5 w-full">
            <label htmlFor="blog-slug" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              URL Slug (Auto-generated)
            </label>
            <input
              id="blog-slug"
              type="text"
              required
              placeholder="article-url-slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-xs text-stone-800 font-mono focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="space-y-1.5 w-full">
            <label htmlFor="blog-category" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              Category
            </label>
            <select
              id="blog-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors cursor-pointer"
            >
              <option value="Engineering">Engineering</option>
              <option value="Web Development">Web Development</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="SEO & Growth">SEO & Growth</option>
              <option value="Business Automation">Business Automation</option>
              <option value="Custom Software">Custom Software</option>
            </select>
          </div>
        </div>

        {/* Author Name */}
        <div className="space-y-1.5 w-full">
          <label htmlFor="blog-author" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Author Name
          </label>
          <input
            id="blog-author"
            type="text"
            placeholder="Team Geetanjali Softwares"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Cover Image Upload Options (Computer File vs URL) */}
        <div className="space-y-3 w-full">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 text-orange-600" /> Article Cover Image
            </label>

            {/* Toggle Tabs */}
            <div className="inline-flex rounded-md bg-stone-100 p-0.5 text-[10px] font-semibold">
              <button
                type="button"
                onClick={() => setUploadType("file")}
                className={`px-3 py-1 rounded-md transition-all ${
                  uploadType === "file" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Upload from Computer
              </button>
              <button
                type="button"
                onClick={() => setUploadType("url")}
                className={`px-3 py-1 rounded-md transition-all ${
                  uploadType === "url" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Paste Image URL
              </button>
            </div>
          </div>

          {uploadType === "file" ? (
            <div className="relative border-2 border-dashed border-stone-200 rounded-md p-6 text-center bg-stone-50/50 hover:bg-stone-50 hover:border-stone-400 transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2 pointer-events-none">
                <div className="h-10 w-10 rounded-md bg-white border border-stone-200 flex items-center justify-center mx-auto text-stone-600">
                  <Upload className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-xs font-semibold text-stone-800">
                  Click to select image file from computer or drag &amp; drop
                </div>
                <p className="text-[10px] text-stone-400">PNG, JPG, WEBP or GIF up to 5MB</p>
              </div>
            </div>
          ) : (
            <input
              type="text"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors"
            />
          )}

          {/* Image Preview Window */}
          {formData.image_url && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
                <span className="flex items-center gap-1 text-green-600">
                  <Check className="h-3.5 w-3.5" /> Cover Image Ready
                </span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image_url: "" })}
                  className="text-red-500 hover:text-red-700 text-[11px] font-bold flex items-center gap-1"
                >
                  <X className="h-3.5 w-3.5" /> Remove Image
                </button>
              </div>
              <div className="h-56 w-full rounded-md overflow-hidden bg-stone-100 border border-stone-200 relative">
                <img
                  src={formData.image_url}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Excerpt / Summary */}
        <div className="space-y-1.5 w-full">
          <label htmlFor="blog-excerpt" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Short Summary / Excerpt
          </label>
          <textarea
            id="blog-excerpt"
            rows={2}
            placeholder="A brief 1-2 sentence description of the article..."
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-md px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors resize-none"
          />
        </div>

        {/* Full Article Content Editor with Toolbar */}
        <div className="space-y-2 w-full">
          <div className="flex items-center justify-between w-full">
            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Full Article Body (Rich Text Toolbar Enabled)
            </label>
            <span className="text-[10px] text-stone-400">Click toolbar buttons to insert H1, H2, H3, Bold, Lists, Links, Quotes</span>
          </div>

          <RichTextEditor
            value={formData.content}
            onChange={(val) => setFormData({ ...formData, content: val })}
            placeholder="Write your article content here. Use the toolbar buttons above to format H1, H2, H3 headings, bold text, bullet lists, blockquotes..."
            rows={16}
          />
        </div>

        {/* Publish Status Toggle & Submit */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-100 w-full">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
            />
            <span className="text-xs font-semibold text-stone-700">
              Publish immediately on website &amp; sitemap
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
          >
            <Save className="h-4 w-4" />
            <span>{loading ? "Publishing..." : "Publish Article"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
