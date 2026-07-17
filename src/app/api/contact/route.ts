import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, date, location, message } = await request.json();

    // Verify SMTP Config
    const smtpUser = process.env.SMTP_USER || "om.photography.2003@gmail.com";
    // Strip quotes or whitespace from password in case they were added to .env
    const smtpPass = (process.env.SMTP_PASS || "kggq lbqq vroh mvgm").replace(/^["']|["']$/g, "").trim();

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "Email configuration missing." },
        { status: 500 }
      );
    }

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 1. Email template for ADMIN
    const adminMailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Georgia', serif; color: #18352F; background-color: #FCFAF6; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #D9E6E0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(15,92,77,0.03); }
          .header { background-color: #1E4A3A; padding: 30px; text-align: center; color: #ffffff; border-bottom: 3px solid #C89B5D; }
          .header h1 { margin: 0; font-size: 24px; font-weight: normal; letter-spacing: 2px; text-transform: uppercase; }
          .header p { margin: 5px 0 0 0; font-size: 12px; color: #C89B5D; letter-spacing: 3px; text-transform: uppercase; }
          .content { padding: 40px 30px; }
          .intro { font-size: 16px; line-height: 1.6; margin-bottom: 30px; }
          .details-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .details-table td { padding: 12px 15px; border-bottom: 1px solid #F0F5F2; font-size: 14px; }
          .details-table td.label { font-weight: bold; color: #0F5C4D; width: 30%; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
          .details-table td.value { color: #23322F; }
          .message-box { background-color: #F5FBF8; border-left: 3px solid #0F5C4D; padding: 20px; border-radius: 4px; font-style: italic; font-size: 14px; line-height: 1.6; }
          .footer { background-color: #F5FBF8; padding: 20px; text-align: center; font-size: 11px; color: #6E6E6E; border-top: 1px solid #D9E6E0; }
          .footer a { color: #0F5C4D; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>OM PHOTOGRAPHY</h1>
            <p>New Lead Inquiry Received</p>
          </div>
          <div class="content">
            <p class="intro">Hello Om,</p>
            <p class="intro">A new booking inquiry has been submitted through your website contact form. Here are the wedding details:</p>
            
            <table class="details-table">
              <tr>
                <td class="label">Client Name</td>
                <td class="value">${name}</td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone Number</td>
                <td class="value"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td class="label">Event Date</td>
                <td class="value">${date}</td>
              </tr>
              <tr>
                <td class="label">Event Location</td>
                <td class="value">${location}</td>
              </tr>
            </table>

            <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #0F5C4D; margin-bottom: 10px;">Message &amp; Requirements</h3>
            <div class="message-box">
              "${message || 'No custom message provided.'}"
            </div>
          </div>
          <div class="footer">
            <p>This inquiry was automatically generated from your website contact form.</p>
            <p>&copy; ${new Date().getFullYear()} Om Photography Studio. All Rights Reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Email template for CLIENT
    const clientMailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Georgia', serif; color: #18352F; background-color: #FCFAF6; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #D9E6E0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(15,92,77,0.03); }
          .header { background-color: #1E4A3A; padding: 40px 30px; text-align: center; color: #ffffff; border-bottom: 3px solid #C89B5D; }
          .header h1 { margin: 0; font-size: 26px; font-weight: normal; letter-spacing: 3px; text-transform: uppercase; }
          .header p { margin: 8px 0 0 0; font-size: 11px; color: #C89B5D; letter-spacing: 4px; text-transform: uppercase; }
          .content { padding: 40px 30px; }
          .intro-title { font-size: 20px; font-weight: normal; color: #1E4A3A; margin-bottom: 20px; }
          .intro { font-size: 14px; line-height: 1.7; color: #5e6c66; margin-bottom: 30px; }
          .card { background-color: #F5FBF8; border: 1px solid #E3ECE8; padding: 25px; border-radius: 12px; margin-bottom: 30px; }
          .card h3 { margin-top: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #0F5C4D; border-bottom: 1px solid #D9E6E0; padding-bottom: 8px; }
          .details-list { list-style: none; padding: 0; margin: 0; }
          .details-list li { padding: 8px 0; font-size: 13.5px; border-bottom: 1px dashed #E3ECE8; }
          .details-list li:last-child { border-bottom: none; }
          .details-list span { font-weight: bold; color: #18352F; display: inline-block; width: 120px; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px; }
          .footer { background-color: #F5FBF8; padding: 30px 20px; text-align: center; font-size: 11px; color: #6E6E6E; border-top: 1px solid #D9E6E0; }
          .footer p { margin: 6px 0; }
          .footer a { color: #0F5C4D; text-decoration: none; font-weight: bold; }
          .gold-text { color: #C89B5D; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>OM PHOTOGRAPHY</h1>
            <p>Capture Love &amp; Legacies</p>
          </div>
          <div class="content">
            <h2 class="intro-title">Thank you for reaching out, ${name}!</h2>
            <p class="intro">
              We have successfully received your wedding photography inquiry. It is an honor to be considered for documenting one of the most significant chapters of your life.
            </p>
            <p class="intro">
              Our studio coordinator is currently reviewing your event details and checking our availability. You can expect a personalized response or call from us within the next 24 hours.
            </p>
            
            <div class="card">
              <h3>Summary of Your Inquiry</h3>
              <ul class="details-list">
                <li><span>Event Date:</span> ${date}</li>
                <li><span>Event Location:</span> ${location}</li>
                <li><span>Your Contact:</span> ${phone}</li>
              </ul>
            </div>

            <p class="intro" style="font-style: italic; text-align: center; color: #C89B5D; font-weight: bold;">
              "Memories fade, but legacy stories last forever."
            </p>
          </div>
          <div class="footer">
            <p><strong>Om Photography Studio</strong></p>
            <p>Umaria, Madhya Pradesh, India</p>
            <p>Phone: <a href="tel:+916265303386">+91 62653 03386</a> | Email: <a href="mailto:hello@omphotography.com">hello@omphotography.com</a></p>
            <p style="margin-top: 15px; font-size: 10px; color: #999;">&copy; ${new Date().getFullYear()} Om Photography. All Rights Reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send Mail to Admin
    await transporter.sendMail({
      from: `"Om Photography Website" <${smtpUser}>`,
      to: smtpUser,
      replyTo: email,
      subject: `✨ New Wedding Inquiry from ${name} (${location})`,
      html: adminMailHtml,
    });

    // Send Mail to Client (if email is provided)
    if (email) {
      await transporter.sendMail({
        from: `"Om Photography Studio" <${smtpUser}>`,
        to: email,
        subject: `💖 We've received your inquiry! - Om Photography`,
        html: clientMailHtml,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
