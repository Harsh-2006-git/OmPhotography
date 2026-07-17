"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function EmailTemplatesPreview() {
  const [activeTab, setActiveTab] = useState<"admin" | "client">("admin");
  const [formData, setFormData] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    date: "2026-11-18",
    location: "Udaipur, Rajasthan",
    message: "Hi Om Photography team, we love your candid portfolio! We are planning a 3-day royal palace wedding in Udaipur and would love to discuss a custom package including cinematography films, drone shoots, and a couple pre-wedding session.",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate Admin Email HTML
  const getAdminMailHtml = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Lead Inquiry</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #18352F; background-color: #FCFAF6; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #E2EBE7; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(15, 92, 77, 0.04); }
          .header { background-color: #ffffff; padding: 25px 20px; text-align: center; border-bottom: 2px solid #C89B5D; }
          .content { padding: 30px 25px; }
          .intro { font-family: 'Georgia', serif; font-size: 16px; line-height: 1.6; color: #18352F; margin-bottom: 25px; }
          .details-table { width: 100%; margin-bottom: 25px; }
          .details-table td { padding: 12px 10px; border-bottom: 1px solid #EAEAEA; font-size: 14px; vertical-align: top; }
          .details-table td.label { font-weight: bold; color: #0F5C4D; width: 30%; text-transform: uppercase; font-size: 11px; letter-spacing: 0.8px; }
          .details-table td.value { color: #23322F; word-break: break-word; overflow-wrap: break-word; }
          .message-box { background-color: #F5FBF8; border-left: 3px solid #0F5C4D; padding: 18px; border-radius: 8px; font-style: italic; font-size: 14px; line-height: 1.6; color: #23322F; word-break: break-word; overflow-wrap: break-word; margin-top: 10px; }
          .footer { background-color: #F5FBF8; padding: 25px 20px; text-align: center; font-size: 11px; color: #6E6E6E; border-top: 1px solid #E2EBE7; }
          .footer p { margin: 6px 0; }
          .footer a { color: #0F5C4D; text-decoration: none; font-weight: bold; }
          .btn-container { text-align: center; margin: 25px 0; }
          .btn { background-color: #C89B5D; color: #ffffff !important; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 12.5px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; display: inline-block; }
          @media screen and (max-width: 480px) {
            .content { padding: 25px 15px; }
            .details-table td { display: block; width: 100% !important; box-sizing: border-box; }
            .details-table td.label { border-bottom: none; padding-bottom: 2px; }
            .details-table td.value { padding-top: 2px; }
          }
        </style>
      </head>
      <body>
        <div style="background-color: #FCFAF6; padding: 20px 10px;">
          <div class="container">
            <div class="header">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; text-align: center; margin: 0 auto;">
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; text-align: left;">
                      <tr>
                        <!-- Circular Logo container similar to the website header -->
                        <td style="padding-right: 12px; vertical-align: middle;">
                          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                            <tr>
                              <td style="width: 48px; height: 48px; border-radius: 50%; background-color: #0F5C4D; text-align: center; vertical-align: middle; padding: 0;">
                                <img src="/logo-circle.png" alt="Om Logo" style="width: 48px; height: 48px; border-radius: 50%; display: block; border: 0;" />
                              </td>
                            </tr>
                          </table>
                        </td>
                        <!-- Text Brand Name -->
                        <td style="vertical-align: middle; text-align: left;">
                          <div style="font-family: 'Georgia', serif; font-size: 20px; font-weight: bold; color: #0F5C4D; text-transform: uppercase; line-height: 1.1; letter-spacing: 0.5px; margin: 0;">Om</div>
                          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8px; font-weight: 900; color: #18352F; letter-spacing: 2.5px; text-transform: uppercase; margin-top: 3px; line-height: 1;">PHOTOGRAPHY</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <div class="content">
              <div style="background-color: #F5FBF8; border: 1px solid #E2EBE7; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; text-align: center;">
                <h2 style="font-family: 'Georgia', serif; font-size: 18px; color: #1E4A3A; font-weight: normal; margin: 0; text-transform: uppercase; letter-spacing: 1px;">New Booking Inquiry</h2>
                <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 9px; color: #C89B5D; margin: 4px 0 0 0; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">Admin Notification</p>
              </div>
              <p class="intro">Hello Om,</p>
              <p class="intro" style="font-size: 15px; color: #5E6C66;">A new booking lead has requested a consultation through the website booking form. Here are the wedding details:</p>
              
              <table class="details-table" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="label">Name</td>
                  <td class="value"><strong>${formData.name}</strong></td>
                </tr>
                <tr>
                  <td class="label">Email</td>
                  <td class="value"><a href="mailto:${formData.email}" style="color: #0F5C4D; text-decoration: none;">${formData.email}</a></td>
                </tr>
                <tr>
                  <td class="label">Phone</td>
                  <td class="value"><a href="tel:${formData.phone}" style="color: #0F5C4D; text-decoration: none;">${formData.phone}</a></td>
                </tr>
                <tr>
                  <td class="label">Date</td>
                  <td class="value">${formData.date}</td>
                </tr>
                <tr>
                  <td class="label">Location</td>
                  <td class="value">${formData.location}</td>
                </tr>
              </table>

              <h3 style="font-family: 'Georgia', serif; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #0F5C4D; margin: 25px 0 5px 0; font-weight: normal;">Requirements / Message:</h3>
              <div class="message-box">
                "${formData.message || 'No custom message details provided.'}"
              </div>

              <div class="btn-container">
                <a href="#" class="btn" style="pointer-events: none;">View Admin Portal</a>
              </div>
            </div>
            <div class="content" style="padding-top: 0; text-align: center; border-top: 1px dashed #EAEAEA;">
              <p style="font-size: 12px; color: #5E6C66; margin-top: 20px;">
                Link to Website: <a href="#" style="color: #0F5C4D; text-decoration: underline; font-weight: bold; pointer-events: none;">omphotography.com</a>
              </p>
            </div>
            <div class="footer">
              <p>This automated message was dispatched by the website contact service.</p>
              <p>&copy; ${new Date().getFullYear()} Om Photography Studio. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Generate Client Email HTML
  const getClientMailHtml = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>We've Received Your Inquiry</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #18352F; background-color: #FCFAF6; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #E2EBE7; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(15, 92, 77, 0.04); }
          .header { background-color: #ffffff; padding: 25px 20px; text-align: center; border-bottom: 2px solid #C89B5D; }
          .content { padding: 40px 30px; }
          .intro-title { font-family: 'Georgia', serif; font-size: 20px; font-weight: normal; color: #1E4A3A; margin-bottom: 15px; line-height: 1.4; }
          .intro { font-size: 14.5px; line-height: 1.7; color: #5E6C66; margin-bottom: 22px; }
          .card { background-color: #F5FBF8; border: 1px solid #E3ECE8; padding: 22px; border-radius: 12px; margin-bottom: 25px; }
          .card h3 { margin-top: 0; font-family: 'Georgia', serif; font-size: 14px; text-transform: uppercase; letter-spacing: 0.8px; color: #0F5C4D; border-bottom: 1px solid #E3ECE8; padding-bottom: 10px; margin-bottom: 14px; font-weight: normal; }
          .details-list { list-style: none; padding: 0; margin: 0; }
          .details-list li { padding: 8px 0; font-size: 13.5px; border-bottom: 1px dashed #E3ECE8; color: #23322F; }
          .details-list li:last-child { border-bottom: none; }
          .details-list span { font-weight: bold; color: #0F5C4D; display: inline-block; width: 130px; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px; }
          .quote { font-family: 'Georgia', serif; font-style: italic; text-align: center; color: #C89B5D; font-size: 15px; margin: 30px 0; font-weight: normal; line-height: 1.5; }
          .footer { background-color: #F5FBF8; padding: 30px 20px; text-align: center; font-size: 11.5px; color: #6E6E6E; border-top: 1px solid #E2EBE7; }
          .footer p { margin: 6px 0; line-height: 1.5; }
          .footer a { color: #0F5C4D; text-decoration: none; font-weight: bold; }
          @media screen and (max-width: 480px) {
            .content { padding: 30px 15px; }
            .card { padding: 15px; }
            .details-list span { display: block; margin-bottom: 3px; }
          }
        </style>
      </head>
      <body>
        <div style="background-color: #FCFAF6; padding: 20px 10px;">
          <div class="container">
            <div class="header">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; text-align: center; margin: 0 auto;">
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; text-align: left;">
                      <tr>
                        <!-- Circular Logo container similar to the website header -->
                        <td style="padding-right: 12px; vertical-align: middle;">
                          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                            <tr>
                              <td style="width: 48px; height: 48px; border-radius: 50%; background-color: #0F5C4D; text-align: center; vertical-align: middle; padding: 0;">
                                <img src="/logo-circle.png" alt="Om Logo" style="width: 48px; height: 48px; border-radius: 50%; display: block; border: 0;" />
                              </td>
                            </tr>
                          </table>
                        </td>
                        <!-- Text Brand Name -->
                        <td style="vertical-align: middle; text-align: left;">
                          <div style="font-family: 'Georgia', serif; font-size: 20px; font-weight: bold; color: #0F5C4D; text-transform: uppercase; line-height: 1.1; letter-spacing: 0.5px; margin: 0;">Om</div>
                          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8px; font-weight: 900; color: #18352F; letter-spacing: 2.5px; text-transform: uppercase; margin-top: 3px; line-height: 1;">PHOTOGRAPHY</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <div class="content">
              <div style="background-color: #F5FBF8; border: 1px solid #E2EBE7; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px; text-align: center;">
                <h2 style="font-family: 'Georgia', serif; font-size: 18px; color: #1E4A3A; font-weight: normal; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Inquiry Confirmation</h2>
                <p style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 9px; color: #C89B5D; margin: 4px 0 0 0; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">Capture Love &amp; Legacies</p>
              </div>
              <h2 class="intro-title">Thank you for reaching out, ${formData.name}!</h2>
              <p class="intro">
                We have successfully received your wedding photography inquiry. It is a true privilege to be considered to document the memories and legacy of your wedding.
              </p>
              <p class="intro">
                Our studio coordinator is checking our availability for your event date. We will get back to you via email or phone within the next 24 hours with package catalogs and pricing.
              </p>
              
              <div class="card">
                <h3>Summary of details received</h3>
                <ul class="details-list">
                  <li><span>Inquiry Date</span> ${formData.date}</li>
                  <li><span>Inquiry Location</span> ${formData.location}</li>
                  <li><span>Your Mobile</span> ${formData.phone}</li>
                </ul>
              </div>

              <p class="quote">
                "Memories fade, but legacy stories last forever."
              </p>
            </div>
            <div class="footer">
              <p><strong>Om Photography Studio</strong></p>
              <p>Umaria, Madhya Pradesh, India</p>
              <p>Mobile: <a href="tel:+916265303386">+91 62653 03386</a> | Website: <a href="#" style="pointer-events: none;">omphotography.com</a></p>
              <p style="margin-top: 20px; font-size: 10px; color: #999;">&copy; ${new Date().getFullYear()} Om Photography. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const activeHtml = activeTab === "admin" ? getAdminMailHtml() : getClientMailHtml();

  return (
    <div className="min-h-screen bg-[#F5FBF8]/30 text-[#18352F] flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        {/* Page Title */}
        <div className="text-center mb-8">
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] font-bold text-[#0F5C4D] uppercase font-sans">
            DEVELOPER TOOLBOX
          </span>
          <h1 className="font-serif text-[28px] sm:text-[36px] text-[#18352F] font-normal leading-tight mt-1 mb-2">
            Automated Email Templates
          </h1>
          <p className="text-[#5E6C66] text-[13.5px] max-w-[550px] mx-auto leading-relaxed">
            Preview and customize the automated transactional HTML emails sent to both you (as Admin) and your clients.
          </p>
        </div>

        {/* Control Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Form Editor Controls */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            
            {/* View Mode Tabs */}
            <div className="bg-white border border-[#D9E6E0] rounded-[16px] p-2.5 flex space-x-2 shadow-sm">
              <button
                onClick={() => setActiveTab("admin")}
                className={`flex-1 py-3 text-[12px] font-semibold tracking-wider uppercase rounded-[10px] transition-all ${
                  activeTab === "admin"
                    ? "bg-[#0F5C4D] text-white shadow-md"
                    : "text-[#5E6C66] hover:bg-[#F5FBF8] hover:text-[#0F5C4D]"
                }`}
              >
                Admin Notify
              </button>
              <button
                onClick={() => setActiveTab("client")}
                className={`flex-1 py-3 text-[12px] font-semibold tracking-wider uppercase rounded-[10px] transition-all ${
                  activeTab === "client"
                    ? "bg-[#0F5C4D] text-white shadow-md"
                    : "text-[#5E6C66] hover:bg-[#F5FBF8] hover:text-[#0F5C4D]"
                }`}
              >
                Client Receipt
              </button>
            </div>

            {/* Live Data Customizer */}
            <div className="bg-white border border-[#D9E6E0] rounded-[20px] p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-[17px] text-[#18352F] border-b border-[#D9E6E0] pb-2 mb-2 font-normal">
                Edit Sample Lead Data
              </h3>
              
              <div className="flex flex-col space-y-3.5">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-[#5E6C66] tracking-[0.5px] mb-1">Client Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full h-[38px] border border-[#D9E6E0] rounded-[6px] px-3 text-[12.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-[#5E6C66] tracking-[0.5px] mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-[38px] border border-[#D9E6E0] rounded-[6px] px-3 text-[12.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-[#5E6C66] tracking-[0.5px] mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full h-[38px] border border-[#D9E6E0] rounded-[6px] px-3 text-[12.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-[#5E6C66] tracking-[0.5px] mb-1">Event Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full h-[38px] border border-[#D9E6E0] rounded-[6px] px-3 text-[12.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-[#5E6C66] tracking-[0.5px] mb-1">Event Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full h-[38px] border border-[#D9E6E0] rounded-[6px] px-3 text-[12.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-[#5E6C66] tracking-[0.5px] mb-1">Message Box</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border border-[#D9E6E0] rounded-[6px] p-3 text-[12.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D] resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Back Button */}
            <Link
              href="/contact"
              className="text-center py-3 bg-[#FCFAF6] hover:bg-[#F5FBF8] border border-[#D9E6E0] hover:border-[#0F5C4D] text-[#0F5C4D] text-[12px] font-semibold tracking-wider uppercase rounded-[16px] transition-all shadow-sm"
            >
              &larr; Back to Contact Form
            </Link>
          </div>

          {/* Right Column: Live Iframe Preview Rendering */}
          <div className="lg:col-span-8 flex flex-col h-full min-h-[500px]">
            <div className="bg-white border border-[#D9E6E0] rounded-[24px] overflow-hidden flex flex-col h-full shadow-md flex-1">
              <div className="bg-[#F5FBF8] border-b border-[#D9E6E0] px-5 py-3.5 flex items-center justify-between shrink-0">
                <span className="text-[11px] font-semibold text-[#5E6C66] tracking-wider uppercase">
                  Live Responsive HTML Email Sandbox
                </span>
                <div className="flex items-center space-x-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335]/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#34A853]/30" />
                </div>
              </div>
              <div className="flex-1 w-full bg-[#FCFAF6] p-4 flex justify-center items-stretch h-full">
                <iframe
                  title="Email Template Render Frame"
                  srcDoc={activeHtml}
                  className="w-full h-full min-h-[550px] border border-[#D9E6E0] rounded-[12px] bg-white shadow-inner flex-1"
                />
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
