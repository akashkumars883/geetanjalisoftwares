import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const subscriberEmail = email.trim().toLowerCase();

    // 1. Try storing in Supabase 'subscribers' table
    try {
      await supabaseAdmin.from("subscribers").upsert([
        { email: subscriberEmail, created_at: new Date().toISOString(), status: "active" }
      ], { onConflict: "email" });
    } catch (err) {
      console.log("Supabase subscribers table notice:", err?.message);
    }

    // 2. Store in Supabase 'leads' table as a subscriber record for instant Admin Panel visibility
    const leadRecord = {
      name: "Newsletter Subscriber",
      email: subscriberEmail,
      service: "Blog Newsletter Subscription",
      message: "Subscribed to receive instant notifications when new blog articles are published.",
      status: "new",
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert([leadRecord])
      .select();

    if (error) {
      console.error("Error saving subscriber to leads table:", error.message);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! You will receive instant notifications when new blog posts are published.",
      email: subscriberEmail,
    });
  } catch (err) {
    console.error("API newsletter POST error:", err);
    return NextResponse.json(
      { error: "Failed to process subscription request." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Attempt fetching from subscribers table
    let subscribers = [];
    const { data: subData } = await supabaseAdmin.from("subscribers").select("*");
    if (subData && subData.length > 0) {
      subscribers = subData.map((s) => s.email);
    }

    // Also fetch from leads table subscribers
    const { data: leadData } = await supabaseAdmin
      .from("leads")
      .select("email")
      .ilike("service", "%Newsletter%");

    if (leadData) {
      const leadEmails = leadData.map((l) => l.email);
      subscribers = Array.from(new Set([...subscribers, ...leadEmails]));
    }

    return NextResponse.json({ subscribers, total: subscribers.length });
  } catch (err) {
    console.error("API newsletter GET error:", err);
    return NextResponse.json({ subscribers: [], total: 0 });
  }
}
