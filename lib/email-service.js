import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadAutoReply(lead) {
  try {
    const { name, email, service } = lead;

    const { data, error } = await resend.emails.send({
      from: 'Geetanjali Softwares <hello@geetanjalisoftwares.com>', 
      to: [email],
      subject: `Thank you for contacting Geetanjali Softwares, ${name}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #ff7b3e;">Hi ${name}!</h1>
          <p>Thank you for reaching out to **Geetanjali Softwares**.</p>
          <p>We've received your inquiry regarding **${service}**. Our team of experts is already looking into your requirements and will get back to you within the next 24 hours.</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0; border: 1px solid #eee;">
            <p style="margin: 0; font-size: 14px; color: #666;"><strong>Your Inquiry Details:</strong></p>
            <p style="margin: 5px 0 0 0;">Service: ${service}</p>
          </div>

          <p>In the meantime, feel free to explore our latest projects or chat with us directly on WhatsApp.</p>
          
          <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #999;">
            Best Regards,<br>
            <strong>The Geetanjali Softwares Team</strong><br>
            Premium Web Development & Marketing
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Customer Reply Error:', error.message, error);
      return { success: false, error };
    }

    console.log('Resend Customer Reply Sent:', data.id);
    return { success: true, data };
  } catch (error) {
    console.error('Email Service Logic Error:', error);
    return { success: false, error };
  }
}

export async function sendAdminNotification(lead) {
  try {
    const { name, email, service, message } = lead;

    const { data, error } = await resend.emails.send({
      from: 'Lead Alert <onboarding@resend.dev>',
      to: ['geetanjalisoftwares@gmail.com'], 
      subject: `New Lead: ${name} - ${service}`,
      html: `
        <h2>You have a new lead!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 10px; background: #f0f0f0;">${message}</div>
      `,
    });

    if (error) {
      console.error('Resend Admin Notification Error:', error.message, error);
    } else {
      console.log('Resend Admin Notification Sent:', data.id);
    }
  } catch (error) {
    console.error('Admin Notification Logic Error:', error);
  }
}

export async function sendCandidateAutoReply(candidate) {
  try {
    const { name, email, role } = candidate;

    const { data, error } = await resend.emails.send({
      from: 'Geetanjali Softwares Careers <hello@geetanjalisoftwares.com>',
      to: [email],
      subject: `Application Received: ${role} - Geetanjali Softwares`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #ff7b3e;">Hi ${name}!</h1>
          <p>Thank you for your interest in joining **Geetanjali Softwares**.</p>
          <p>We've successfully received your application for the position of <strong>${role}</strong>. Our HR team is currently reviewing resumes and portfolios of all candidates to find the best fit.</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0; border: 1px solid #eee;">
            <p style="margin: 0; font-size: 14px; color: #666;"><strong>Your Submitted Details:</strong></p>
            <p style="margin: 5px 0 0 0;">Applied Role: ${role}</p>
            <p style="margin: 5px 0 0 0;">Status: Under Review</p>
          </div>

          <p>If your profile matches our requirements, we will reach out to you within the next 3 to 5 business days to schedule an initial interview round.</p>
          
          <p>We appreciate your time and wish you the very best of luck!</p>
          
          <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #999;">
            Best Regards,<br>
            <strong>The HR Team</strong><br>
            <strong>Geetanjali Softwares</strong><br>
            Premium Software & Web Development Agency
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Candidate Auto Reply Error:', error.message, error);
      return { success: false, error };
    }

    console.log('Resend Candidate Auto Reply Sent:', data.id);
    return { success: true, data };
  } catch (error) {
    console.error('Candidate Email Auto Reply Logic Error:', error);
    return { success: false, error };
  }
}

export async function sendAdminCandidateNotification(candidate) {
  try {
    const { name, email, phone, role, experience, portfolio, resume_url, message } = candidate;

    const { data, error } = await resend.emails.send({
      from: 'Job Application <onboarding@resend.dev>',
      to: ['geetanjalisoftwares@gmail.com'],
      subject: `New Job Application: ${name} - ${role}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #333;">
          <h2 style="color: #111; border-bottom: 2px solid #ff7b3e; padding-bottom: 10px;">New Job Applicant Alert</h2>
          <p><strong>Candidate Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Position Applied:</strong> ${role}</p>
          <p><strong>Experience Level:</strong> ${experience}</p>
          ${portfolio ? `<p><strong>Portfolio/GitHub:</strong> <a href="${portfolio}" target="_blank">${portfolio}</a></p>` : ''}
          <p><strong>Resume/CV Link:</strong> <a href="${resume_url}" target="_blank" style="display: inline-block; padding: 8px 12px; background: #ff7b3e; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 13px;">View Candidate Resume</a></p>
          
          <p><strong>Cover Letter / Message:</strong></p>
          <div style="padding: 15px; background: #f5f5f5; border-radius: 8px; font-style: italic; color: #555;">
            ${message ? message.replace(/\n/g, '<br>') : 'No cover letter provided.'}
          </div>
          
          <p style="margin-top: 25px; font-size: 11px; color: #999;">
            This application was submitted via Geetanjali Softwares Careers portal.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Admin Candidate Notification Error:', error.message, error);
    } else {
      console.log('Resend Admin Candidate Notification Sent:', data.id);
    }
  } catch (error) {
    console.error('Admin Candidate Notification Logic Error:', error);
  }
}
