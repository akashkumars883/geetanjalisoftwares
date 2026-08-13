import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request) {
  try {
    let body;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = {
        name: formData.get("name") || "",
        email: formData.get("email") || "",
        service: formData.get("service") || "",
        budget: formData.get("budget") || "",
        message: formData.get("message") || "",
      };
    }

    const { name, email, service, budget, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and Email are required" },
        { status: 400 }
      );
    }

    // Insert directly into Supabase 'leads' table
    const leadData = {
      name,
      email,
      service: service || "General Consultation",
      message: message || (budget ? `Budget: ${budget}` : ""),
      status: "new",
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert([leadData])
      .select();

    if (error) {
      console.error("Supabase leads insert error:", error.message);
    }

    // Redirect if form submit
    if (!contentType.includes("application/json")) {
      return NextResponse.redirect(new URL("/contact?success=true", request.url), 303);
    }

    return NextResponse.json({ success: true, message: "Lead submitted successfully", data: data?.[0] || leadData });
  } catch (err) {
    console.error("API contact submission error:", err);
    return NextResponse.json({ error: "Server processing error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Supabase fetch leads error:", error?.message);
      return NextResponse.json({ inquiries: [] });
    }

    return NextResponse.json({ inquiries: data });
  } catch (err) {
    console.error("API contact GET error:", err);
    return NextResponse.json({ inquiries: [] });
  }
}
