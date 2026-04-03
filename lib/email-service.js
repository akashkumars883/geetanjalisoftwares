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
