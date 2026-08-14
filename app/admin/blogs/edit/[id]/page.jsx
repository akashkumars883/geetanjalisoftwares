"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Upload, X, Check } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditBlogPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadType, setUploadType] = useState("file"); // "file" or "url"

  const [formData, setFormData] = useState({
    id: id,
    title: "",
    slug: "",
    category: "Engineering",
    author: "Team Geetanjali Softwares",
    excerpt: "",
    image_url: "",
    content: "",
    is_published: true,
  });

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch("/api/admin/blogs");
        const data = await res.json();
        const existing = (data.blogs || []).find((b) => String(b.id) === String(id));
        if (existing) {
          setFormData({
            id: existing.id,
            title: existing.title || "",
            slug: existing.slug || "",
            category: existing.category || "Engineering",
            author: existing.author || "Team Geetanjali Softwares",
            excerpt: existing.excerpt || "",
            image_url: existing.image_url || "",
            content: existing.content || "",
            is_published: existing.is_published !== false,
          });
        }
      } catch (err) {
        console.error("Error loading blog details for editing:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [id]);

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
    setSaving(true);
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        alert("Blog article updated successfully!");
        router.push("/admin/blogs");
      } else {
        alert(result.error || "Failed to update blog post.");
      }
    } catch (err) {
      console.error("Error updating blog post:", err);
      alert("Error updating blog post.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-stone-500 text-xs font-light">
        Loading article details for editing...
      </div>
    );
  }

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
            Edit Article: {formData.title}
          </h1>
          <p className="text-xs text-stone-500 font-light">
            Update content, metadata, or status for this article in your database.
          </p>
        </div>
      </div>

      {/* Form Card - 100% Full Width */}
      <form onSubmit={handleSubmit} className="w-full bg-white border border-stone-200 rounded-xl p-6 sm:p-10 space-y-6 block">
        {/* Title */}
        <div className="space-y-1.5 w-full">
          <label htmlFor="edit-title" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Article Title
          </label>
          <input
            id="edit-title"
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 font-semibold focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Slug & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div className="space-y-1.5 w-full">
            <label htmlFor="edit-slug" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              URL Slug
            </label>
            <input
              id="edit-slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-800 font-mono focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="space-y-1.5 w-full">
            <label htmlFor="edit-category" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              Category
            </label>
            <select
              id="edit-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors cursor-pointer"
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
          <label htmlFor="edit-author" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Author Name
          </label>
          <input
            id="edit-author"
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Cover Image Upload Options (Computer File vs URL) */}
        <div className="space-y-3 w-full">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 text-orange-600" /> Article Cover Image
            </label>

            {/* Toggle Tabs */}
            <div className="inline-flex rounded-lg bg-stone-100 p-0.5 text-[10px] font-semibold">
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
            <div className="relative border-2 border-dashed border-stone-200 rounded-xl p-6 text-center bg-stone-50/50 hover:bg-stone-50 hover:border-stone-400 transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2 pointer-events-none">
                <div className="h-10 w-10 rounded-full bg-white border border-stone-200 flex items-center justify-center mx-auto text-stone-600">
                  <Upload className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-xs font-semibold text-stone-800">
                  Click to select new image file from computer or drag &amp; drop
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
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors"
            />
          )}

          {/* Image Preview Window */}
          {formData.image_url && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
                <span className="flex items-center gap-1 text-green-600">
                  <Check className="h-3.5 w-3.5" /> Cover Image Active
                </span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image_url: "" })}
                  className="text-red-500 hover:text-red-700 text-[11px] font-bold flex items-center gap-1"
                >
                  <X className="h-3.5 w-3.5" /> Remove Image
                </button>
              </div>
              <div className="h-56 w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative">
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
          <label htmlFor="edit-excerpt" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Short Summary / Excerpt
          </label>
          <textarea
            id="edit-excerpt"
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-black transition-colors resize-none"
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
            placeholder="Edit your article content here..."
            rows={16}
          />
        </div>

        {/* Status Toggle & Save */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-100 w-full">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="h-4 w-4 rounded border-stone-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
            />
            <span className="text-xs font-semibold text-stone-700">
              Published on website &amp; sitemap
            </span>
          </label>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
