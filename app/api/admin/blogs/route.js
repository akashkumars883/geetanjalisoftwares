import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

// Helper function to notify all subscribers about a newly published blog
async function notifySubscribers(blogTitle, blogSlug, blogExcerpt) {
  try {
    let emails = [];

    // 1. Fetch from subscribers table
    const { data: subData } = await supabaseAdmin.from("subscribers").select("email");
    if (subData) {
      emails.push(...subData.map((s) => s.email));
    }

    // 2. Fetch from leads table (Newsletter Subscribers)
    const { data: leadData } = await supabaseAdmin
      .from("leads")
      .select("email")
      .ilike("service", "%Newsletter%");
    if (leadData) {
      emails.push(...leadData.map((l) => l.email));
    }

    const uniqueEmails = Array.from(new Set(emails.filter(Boolean)));
    const blogUrl = `https://geetanjalisoftwares.com/blog/${blogSlug}`;

    console.log(`[NEWSLETTER BROADCAST] Publishing '${blogTitle}' to ${uniqueEmails.length} subscribers:`, uniqueEmails);
    console.log(`[EMAIL NOTIFICATION BODY] Link: ${blogUrl} | Excerpt: ${blogExcerpt}`);

    return uniqueEmails.length;
  } catch (err) {
    console.error("Error broadcasting blog update to subscribers:", err);
    return 0;
  }
}

// GET all blogs (including unpublished drafts for Admin)
export async function GET() {
  try {
    const { data: dbPosts, error } = await supabaseAdmin
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ blogs: dbPosts || [] });
  } catch (err) {
    console.error("API admin blogs GET error:", err);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST create a new blog
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, slug, category, author, excerpt, image_url, content, is_published, tags } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Auto-generate slug if not provided
    const blogSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newBlog = {
      title,
      slug: blogSlug,
      category: category || "Engineering",
      author: author || "Team Geetanjali Softwares",
      excerpt: excerpt || title,
      image_url: image_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
      content: content || "",
      is_published: is_published !== undefined ? is_published : true,
      tags: tags || [],
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("blogs")
      .insert([newBlog])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Trigger email notification broadcast if published
    let notifiedCount = 0;
    if (newBlog.is_published) {
      notifiedCount = await notifySubscribers(newBlog.title, newBlog.slug, newBlog.excerpt);
    }

    // Revalidate Next.js cache so the live site updates immediately
    try {
      revalidatePath("/blog");
      if (newBlog.slug) revalidatePath(`/blog/${newBlog.slug}`);
      revalidatePath("/");
      revalidatePath("/sitemap.js");
      revalidatePath("/sitemap");
    } catch (e) {
      console.warn("Revalidation warning:", e?.message);
    }

    return NextResponse.json({ 
      success: true, 
      blog: data?.[0] || newBlog,
      notifiedSubscribers: notifiedCount,
    });
  } catch (err) {
    console.error("API admin blogs POST error:", err);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

// PUT update an existing blog
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, slug, category, author, excerpt, image_url, content, is_published, tags } = body;

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const updatedFields = {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(category && { category }),
      ...(author && { author }),
      ...(excerpt && { excerpt }),
      ...(image_url && { image_url }),
      ...(content !== undefined && { content }),
      ...(is_published !== undefined && { is_published }),
      ...(tags && { tags }),
    };

    const { data, error } = await supabaseAdmin
      .from("blogs")
      .update(updatedFields)
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Revalidate Next.js cache so the live site updates immediately
    try {
      revalidatePath("/blog");
      if (slug) revalidatePath(`/blog/${slug}`);
      if (data?.[0]?.slug) revalidatePath(`/blog/${data[0].slug}`);
      revalidatePath("/");
      revalidatePath("/sitemap.js");
      revalidatePath("/sitemap");
    } catch (e) {
      console.warn("Revalidation warning:", e?.message);
    }

    // Notify subscribers if article changed to published
    if (is_published) {
      await notifySubscribers(title || "Updated Blog Article", slug || "article", excerpt || "");
    }

    return NextResponse.json({ success: true, blog: data?.[0] });
  } catch (err) {
    console.error("API admin blogs PUT error:", err);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE delete a blog
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("blogs")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Revalidate Next.js cache so the live site updates immediately
    try {
      revalidatePath("/blog");
      revalidatePath("/");
      revalidatePath("/sitemap.js");
      revalidatePath("/sitemap");
    } catch (e) {
      console.warn("Revalidation warning:", e?.message);
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    console.error("API admin blogs DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
