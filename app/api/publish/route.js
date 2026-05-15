import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('--- NEW PUBLISH REQUEST ---');
    console.log('Subdomain:', body.subdomain);
    console.log('Business Name:', body.business_name);
    console.log('Stats:', body.stats);
    console.log('Features:', body.features);
    console.log('---------------------------');
    const { 
      subdomain, 
      business_name, 
      tagline, 
      whatsapp, 
      address,
      theme, 
      services,
      hero_title,
      hero_description,
      about_headline,
      about_body,
      services_list,
      testimonials,
      faqs,
      stats,
      features
    } = body;

    if (!subdomain) {
      return NextResponse.json({ error: 'Subdomain is required' }, { status: 400 });
    }

    // Check if subdomain is already claimed
    const { data: existing, error: checkError } = await supabaseAdmin
      .from('user_websites')
      .select('subdomain')
      .eq('subdomain', subdomain);

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'This subdomain is already claimed. Please try another name!' }, { status: 400 });
    }

    // Insert new website configuration with AI-enhanced data
    const { data, error: insertError } = await supabaseAdmin
      .from('user_websites')
      .insert([
        {
          subdomain,
          business_name: business_name || 'My Premium Business',
          tagline: tagline || '',
          whatsapp: whatsapp || '919955123456',
          address: address || 'India',
          theme: theme || 'orange',
          services: services || ['Expert Consultation', 'Quality Execution'],
          hero_title,
          hero_description,
          about_headline,
          about_body,
          services_list,
          testimonials,
          faqs,
          stats,
          features
        }
      ])
      .select();

    if (insertError) {
      console.error('Supabase Publish Insert Error:', insertError);
      return NextResponse.json({ error: insertError.message || 'Error publishing website.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Publish API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to publish website', details: error.message },
      { status: 500 }
    );
  }
}
