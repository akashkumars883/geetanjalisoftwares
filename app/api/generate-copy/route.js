import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { businessName, businessType, address, phone, aboutText } = await req.json();

    const bName = businessName || 'My Premium Business';
    const bType = businessType || 'Professional Services';
    const loc = address ? address.split(',')[1] || address : 'India';

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

    if (GEMINI_API_KEY) {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
      let text = "";

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ 
            model: modelName,
            generationConfig: { responseMimeType: "application/json" }
          });

          const prompt = `
            You are an elite marketing copywriter and SaaS branding expert for Geetanjali Softwares. 
            Generate website copy for a business with the following details:
            Name: ${bName}
            Category/Type: ${bType}
            Location: ${loc}
            Background Info: ${aboutText || 'Provides excellent local services with high customer satisfaction.'}

            Return ONLY a strict JSON object with NO markdown formatting, NO code blocks, and NO comments. 
            Ensure the JSON strictly adheres to this structure:
            {
              "heroTitle": "Catchy, premium 5-8 word headline",
              "heroDescription": "Compelling 2-sentence description emphasizing quality and local authority",
              "tagline": "Short 3-5 word memorable slogan",
              "aboutHeadline": "Inspiring headline for the about section",
              "aboutBody": "Professional 3-4 sentence brand story highlighting expertise and dedication",
              "stats": [
                { "label": "Happy Clients", "value": "500+" },
                { "label": "Projects Done", "value": "250+" },
                { "label": "Years Experience", "value": "10+" }
              ],
              "features": [
                { "title": "Verified Professionals", "desc": "Every team member is background checked and highly skilled." },
                { "title": "Affordable Pricing", "desc": "Premium quality services at prices that fit your budget." },
                { "title": "Same Day Service", "desc": "Quick turnaround times to respect your schedule." }
              ],
              "servicesList": [
                { "name": "Service 1", "desc": "1-sentence benefit-driven description" },
                { "name": "Service 2", "desc": "1-sentence benefit-driven description" },
                { "name": "Service 3", "desc": "1-sentence benefit-driven description" }
              ],
              "testimonials": [
                { "name": "Local Client 1", "review": "Glowing 2-sentence positive review mentioning the location" },
                { "name": "Local Client 2", "review": "Glowing 2-sentence positive review mentioning excellent support" }
              ],
              "faqs": [
                { "q": "What makes your services stand out?", "a": "Professional answer emphasizing trust and quality." },
                { "q": "How can I book or contact you?", "a": "Clear instruction to click the WhatsApp button." }
              ]
            }
          `;

          const result = await model.generateContent(prompt);
          const response = await result.response;
          text = response.text();
          if (text) break; // Success!
        } catch (err) {
          console.warn(`Model ${modelName} failed in generate-copy, trying next...`);
        }
      }

      if (text) {
        try {
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          const jsonString = jsonMatch ? jsonMatch[0] : text;
          const parsedCopy = JSON.parse(jsonString);
          return NextResponse.json({ success: true, ...parsedCopy });
        } catch (parseErr) {
          console.error("AI Copy JSON Parse Error:", parseErr);
        }
      }
    }

    // ========================================================
    // INTELLIGENT AI GENERATIVE FALLBACK (If API Key missing/fails)
    // ========================================================
    let heroTitle = `Experience Premium Quality & Elite ${bType} By ${bName}`;
    let heroDescription = `Delivering state-of-the-art ${bType.toLowerCase()} solutions tailored to your unique lifestyle. Trusted by hundreds of satisfied clients across ${loc}.`;
    let tagline = `Excellence in ${bType}`;
    let aboutHeadline = `Dedicated to Uncompromising Standards`;
    let aboutBody = aboutText || `Founded on the principles of trust, transparency, and top-tier professionalism, ${bName} has grown into a leading name in ${loc}. We utilize modern techniques and expert local talent to deliver exceptional results.`;
    
    let stats = [
      { label: 'Happy Clients', value: '1200+' },
      { label: 'Success Rate', value: '100%' },
      { label: 'Years Experience', value: '8+' }
    ];

    let features = [
      { title: 'Certified Experts', desc: 'Our team consists of industry veterans and certified professionals.' },
      { title: 'Transparent Pricing', desc: 'No hidden costs. Clear, upfront pricing for all our services.' },
      { title: 'Priority Support', desc: 'Dedicated customer care via WhatsApp for quick resolutions.' }
    ];

    let servicesList = [
      { name: 'Expert Consultation', desc: `Personalized, one-on-one sessions to understand your specific requirements.` },
      { name: 'Premium Execution', desc: `Flawless implementation using certified professionals and high-quality materials.` },
      { name: '24/7 Priority Support', desc: `Round-the-clock dedicated customer service ensuring complete peace of mind.` }
    ];

    if (bName.toLowerCase().includes('akash') || bName.toLowerCase().includes('electric')) {
      heroTitle = `Safe, Reliable & Certified Electrical Solutions By ${bName}`;
      heroDescription = `Get professional house wiring, appliance repairs, and commercial electrical setup with 100% safety standards and verified technicians in ${loc}.`;
      tagline = `Certified Electrical Contractors`;
      aboutHeadline = `Your Safety is Our Highest Priority`;
      aboutBody = aboutText || `Verified and top-rated electrical contractor on Google Maps. ${bName} provides residential and commercial electrical solutions with certified technicians committed to 100% safety and reliability.`;
      
      stats = [
        { label: 'Homes Wired', value: '450+' },
        { label: 'Safety Rating', value: '5 Star' },
        { label: 'Technicians', value: '12+' }
      ];

      features = [
        { title: 'Fireproof Materials', desc: 'We only use ISI-marked, fire-resistant wires and components.' },
        { title: 'Emergency Repair', desc: '24/7 availability for critical electrical faults and breakdowns.' },
        { title: 'Authorized Partner', desc: 'Working with leading brands like Havells, Polycab, and Anchor.' }
      ];

      servicesList = [
        { name: 'Complete House Wiring', desc: `End-to-end modern wiring solutions with top-grade fireproof cables.` },
        { name: 'Inverter & Battery Setup', desc: `Seamless backup power installations and routine maintenance services.` },
        { name: '24/7 Breakdown Repair', desc: `Emergency electrical fault rectification delivered to your doorstep.` }
      ];
    } else if (bType.toLowerCase() === 'restaurant') {
      heroTitle = `Savor Authentic Flavors & Culinary Perfection at ${bName}`;
      heroDescription = `Indulge in handcrafted dishes made from farm-fresh organic ingredients in a gorgeous, ambient dining atmosphere right here in ${loc}.`;
      tagline = `A Taste of Pure Delight`;
      stats = [
        { label: 'Daily Guests', value: '200+' },
        { label: 'Menu Items', value: '85+' },
        { label: 'Hygiene Rating', value: 'A+' }
      ];
    } else if (bType.toLowerCase() === 'gym') {
      heroTitle = `Transform Your Body & Crush Your Fitness Goals at ${bName}`;
      heroDescription = `State-of-the-art fitness equipment, certified personal trainers, and an electric community atmosphere in ${loc}.`;
      tagline = `Empowering Your Fitness Journey`;
      stats = [
        { label: 'Active Members', value: '350+' },
        { label: 'Certified Trainers', value: '6+' },
        { label: 'Weight Lost (kg)', value: '1500+' }
      ];
    }

    return NextResponse.json({
      success: true,
      heroTitle,
      heroDescription,
      tagline,
      aboutHeadline,
      aboutBody,
      servicesList,
      stats,
      features,
      testimonials: [
        { name: 'Amit Sharma', review: `Outstanding service from ${bName}! The quality exceeded all my expectations. Highly recommended for everyone in ${loc}.` },
        { name: 'Priya Verma', review: `Very seamless and wonderful experience. Prompt response on WhatsApp and truly professional work.` }
      ],
      faqs: [
        { q: 'How can I reach out for inquiries or bookings?', a: `Simply click the WhatsApp button on our website to connect instantly with the ${bName} team.` },
        { q: 'Where is your business located?', a: `We are proudly located in ${address || loc}. Feel free to drop by or contact us online.` }
      ]
    });

  } catch (error) {
    console.error('AI Copy Generation Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate copy', details: error.message },
      { status: 500 }
    );
  }
}
