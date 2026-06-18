"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    location: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", date: "", location: "", message: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#222222] overflow-x-hidden font-sans scroll-smooth flex flex-col justify-between">
      {/* 1. HEADER — Fixed floating navbar */}
      <Header />


      {/* 2. CONTACT CONTENT SECTION */}
      <main className="flex-1 pt-[90px] md:pt-[120px] pb-16 px-4 sm:px-6 md:px-12 xl:px-24 max-w-[1440px] mx-auto w-full">
        {/* Intro Header */}
        <div className="text-center max-w-[800px] mx-auto mb-10 md:mb-14">
          <div className="font-script text-[32px] md:text-[46px] text-[#D4AF37] mb-1 select-none">Connect</div>
          <h1 className="font-serif text-[34px] sm:text-[44px] md:text-[52px] text-[#222222] font-normal leading-[1.15] tracking-tight mb-4">
            Let's Document Your Legacy
          </h1>
          <p className="text-[#666666] text-[13.5px] sm:text-[15px] md:text-[16px] leading-[1.7] max-w-[620px] mx-auto font-sans">
            Have questions or ready to book your session? Share your love story and wedding details below. We are excited to collaborate with you.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* Left Column: Sidebar with Quick Action & Social Links */}
          <div className="lg:col-span-5 flex flex-col h-full animate-[fadeIn_0.6s_ease-out]">
            <div className="bg-white border border-[#E8DCC2] rounded-[24px] p-4 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full space-y-6 md:space-y-8">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-serif text-[18px] md:text-[22px] text-[#222222] font-normal tracking-tight border-b border-[#E8DCC2] pb-2.5 mb-5">
                    Contact Channels
                  </h2>
                  <div className="flex flex-col gap-4">
                    {/* WhatsApp Card */}
                    <div className="bg-[#FEFCF8] border border-[#E8DCC2]/60 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#25D366]/40 hover:shadow-[0_4px_16px_rgba(37,211,102,0.04)] transition-all duration-300 group">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8.5 h-8.5 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shrink-0">
                            <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.11-2.884-6.974-1.862-1.865-4.337-2.893-6.979-2.895-5.438 0-9.866 4.42-9.869 9.866-.001 1.765.485 3.491 1.408 4.98l-.323 1.182.164.159c.775-.758 1.621-1.584 2.158-1.921zm10.594-5.28c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            </svg>
                          </div>
                          <span className="font-serif text-[13px] md:text-[14px] font-bold text-[#222222] tracking-[0.5px]">WhatsApp Instant</span>
                        </div>
                      </div>
                      <a
                        href="https://wa.me/911234567890?text=Hi%20Om%20Photography,%20I'd%20like%20to%20inquire%20about%20your%20services!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-1.5 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-[11px] md:text-[11.5px] rounded-[8px] transition-all duration-300 shadow-sm shrink-0"
                      >
                        Chat Now
                      </a>
                    </div>

                    {/* Email Inquiry Card */}
                    <div className="bg-[#FEFCF8] border border-[#E8DCC2]/60 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D4AF37]/40 hover:shadow-[0_4px_16px_rgba(212,175,55,0.04)] transition-all duration-300 group">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8.5 h-8.5 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#111111] transition-all duration-300 shrink-0">
                            <svg className="w-4.5 h-4.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                              <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="font-serif text-[13px] md:text-[14px] font-bold text-[#222222] tracking-[0.5px]">Email Inquiry</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1.5">
                        <a href="mailto:hello@omphotography.com" className="text-[11px] text-[#666666] hover:text-[#D4AF37] font-medium transition-colors">hello@omphotography.com</a>
                        <a href="mailto:bookings@omphotography.com" className="text-[11px] text-[#666666] hover:text-[#D4AF37] font-medium transition-colors">bookings@omphotography.com</a>
                      </div>
                    </div>

                    {/* Studio Location Card */}
                    <div className="bg-[#FEFCF8] border border-[#E8DCC2]/60 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D4AF37]/40 hover:shadow-[0_4px_16px_rgba(212,175,55,0.04)] transition-all duration-300 group">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8.5 h-8.5 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#111111] transition-all duration-300 shrink-0">
                            <svg className="w-4.5 h-4.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                          </div>
                          <span className="font-serif text-[13px] md:text-[14px] font-bold text-[#222222] tracking-[0.5px]">Udaipur Studio</span>
                        </div>
                      </div>
                      <a
                        href="https://maps.google.com/?q=102,+Royal+Lotus+Plaza,+Near+Lake+Pichola,+Udaipur,+Rajasthan,+India"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-1.5 px-4 bg-white border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#111111] text-[#222222] font-semibold text-[11px] md:text-[11.5px] rounded-[8px] transition-all duration-300 shadow-sm shrink-0"
                      >
                        Navigate
                      </a>
                    </div>

                    {/* Direct Call & Hours Card */}
                    <div className="bg-[#FEFCF8] border border-[#E8DCC2]/60 rounded-[16px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#D4AF37]/40 hover:shadow-[0_4px_16px_rgba(212,175,55,0.04)] transition-all duration-300 group">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8.5 h-8.5 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#111111] transition-all duration-300 shrink-0">
                            <svg className="w-4.5 h-4.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="font-serif text-[13px] md:text-[14px] font-bold text-[#222222] tracking-[0.5px]">Direct Call & Hours</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-right">
                        <a href="tel:+911234567890" className="block text-[11.5px] font-bold text-[#D4AF37] hover:underline">+91 12345 67890</a>
                        <p className="text-[10px] text-[#666666]">10am – 7pm IST (Mon-Sat)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Profiles & Quick Navigation */}
              <div className="space-y-4 border-t border-[#E8DCC2] pt-4">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[2px] font-semibold text-[#666666] mb-2">Social Profiles</h3>
                  <div className="flex flex-wrap gap-3.5">
                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#bc1888]/5 border border-[#E8DCC2]/60 text-[#bc1888] hover:bg-[#bc1888] hover:text-white hover:shadow-[0_4px_12px_rgba(188,24,136,0.18)] hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#1877F2]/5 border border-[#E8DCC2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:shadow-[0_4px_12px_rgba(24,119,242,0.18)] hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    {/* YouTube */}
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#FF0000]/5 border border-[#E8DCC2] text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:shadow-[0_4px_12px_rgba(255,0,0,0.18)] hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    {/* Pinterest */}
                    <a
                      href="https://pinterest.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#E60023]/5 border border-[#E8DCC2] text-[#E60023] hover:bg-[#E60023] hover:text-white hover:shadow-[0_4px_12px_rgba(230,0,35,0.18)] hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] md:text-[12px] text-[#666666]">
                  <span className="font-semibold text-[9.5px] uppercase tracking-wider text-[#222222]/70 mr-0.5">Explore:</span>
                  <a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a>
                  <span className="text-[#E8DCC2]/60 select-none">•</span>
                  <a href="/#portfolio" className="hover:text-[#D4AF37] transition-colors">Portfolio</a>
                  <span className="text-[#E8DCC2]/60 select-none">•</span>
                  <a href="/#services" className="hover:text-[#D4AF37] transition-colors">Services</a>
                  <span className="text-[#E8DCC2]/60 select-none">•</span>
                  <a href="/#about" className="hover:text-[#D4AF37] transition-colors">About Us</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-white border border-[#E8DCC2] rounded-[24px] p-4 sm:p-6 md:p-8 lg:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
              <div className="h-full flex flex-col justify-between">
                <h2 className="font-serif text-[18px] md:text-[22px] text-[#222222] font-normal tracking-tight border-b border-[#E8DCC2] pb-2.5 mb-5 shrink-0">
                  Booking Inquiry
                </h2>

                {formSubmitted ? (
                  <div className="w-full bg-[#FEFCF8] border border-[#D4AF37]/40 rounded-[20px] p-6 md:p-12 text-center shadow-sm flex-1 flex flex-col justify-center items-center">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-[#D4AF37] mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3 className="font-serif text-[20px] md:text-[24px] text-[#222222] mb-2 leading-tight">Inquiry Received Successfully!</h3>
                    <p className="text-[#666666] text-[12.5px] md:text-[13.5px] max-w-[380px] mx-auto leading-relaxed">
                      Thank you for reaching out to Om Photography. Our booking coordinators will review your event details and get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4 md:space-y-5 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {/* Name */}
                        <div className="flex flex-col">
                          <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#666666] tracking-[1px] mb-1.5 font-sans">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full h-[42px] md:h-[46px] bg-[#F7F5F2]/50 border border-[#E8DCC2] rounded-[8px] px-3.5 text-[12.5px] md:text-[13.5px] text-[#222222] focus:outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-[3px] focus:ring-[#D4AF37]/10 transition-all font-sans"
                          />
                        </div>
                        {/* Phone */}
                        <div className="flex flex-col">
                          <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#666666] tracking-[1px] mb-1.5 font-sans">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full h-[42px] md:h-[46px] bg-[#F7F5F2]/50 border border-[#E8DCC2] rounded-[8px] px-3.5 text-[12.5px] md:text-[13.5px] text-[#222222] focus:outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-[3px] focus:ring-[#D4AF37]/10 transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {/* Event Date */}
                        <div className="flex flex-col">
                          <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#666666] tracking-[1px] mb-1.5 font-sans">Event Date</label>
                          <input
                            type="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full h-[42px] md:h-[46px] bg-[#F7F5F2]/50 border border-[#E8DCC2] rounded-[8px] px-3.5 text-[12.5px] md:text-[13.5px] text-[#222222] focus:outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-[3px] focus:ring-[#D4AF37]/10 transition-all font-sans"
                          />
                        </div>
                        {/* Event Location */}
                        <div className="flex flex-col">
                          <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#666666] tracking-[1px] mb-1.5 font-sans">Event Location (City)</label>
                          <input
                            type="text"
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g. Udaipur, Rajasthan"
                            className="w-full h-[42px] md:h-[46px] bg-[#F7F5F2]/50 border border-[#E8DCC2] rounded-[8px] px-3.5 text-[12.5px] md:text-[13.5px] text-[#222222] focus:outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-[3px] focus:ring-[#D4AF37]/10 transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Message Box */}
                      <div className="flex flex-col flex-1">
                        <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#666666] tracking-[1px] mb-1.5 font-sans">Event Details / Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us about your wedding ceremonies, style preferences, guest count, and specific requests..."
                          className="w-full flex-1 min-h-[90px] bg-[#F7F5F2]/50 border border-[#E8DCC2] rounded-[8px] p-3.5 text-[12.5px] md:text-[13.5px] text-[#222222] focus:outline-none focus:border-[#D4AF37] focus:bg-white focus:ring-[3px] focus:ring-[#D4AF37]/10 transition-all font-sans resize-y"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full h-[46px] md:h-[50px] bg-[#E0B44C] rounded-[8px] flex items-center justify-center gap-2 text-[#222222] font-semibold text-[13px] md:text-[14px] tracking-[0.1em] uppercase shadow-sm hover:bg-[#D4AF37] hover:shadow-md transition-all duration-300 cursor-pointer active:scale-98 mt-2"
                    >
                      <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>SEND BOOKING INQUIRY</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. STUDIO LOCATION MAP */}
        <section id="studio-map" className="mt-12 md:mt-16 bg-white border border-[#E8DCC2] rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.02)] p-4 md:p-6 animate-[fadeIn_0.6s_ease-out]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
            <div>
              <h3 className="font-serif text-[20px] md:text-[24px] text-[#222222] font-normal tracking-tight">Studio Map & Directions</h3>
              <p className="text-[#666666] text-[13px] md:text-[14px] mt-0.5 font-sans">Visit us for face-to-face consultation and album walkthroughs</p>
            </div>
            <a 
              href="https://maps.google.com/?q=Lake+Pichola,+Udaipur" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E0C050] text-[#111111] font-semibold text-[12.5px] uppercase tracking-wider rounded-[8px] shadow-sm transition-all duration-300 active:scale-95"
            >
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Get Directions</span>
            </a>
          </div>
          
          {/* Map Iframe */}
          <div className="relative w-full h-[300px] md:h-[450px] rounded-[16px] overflow-hidden border border-[#E8DCC2]/60 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] bg-[#F0ECE7]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14513.782012436859!2d73.6811445778848!3d24.57388701041072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e56555555555%3A0x82db0e2bb6bc8eb1!2sLake%20Pichola!5e0!3m2!1sen!2sin!4v1718712345678!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </section>
      </main>

      {/* 3. FOOTER (Bottom Section) */}
      <Footer />
    </div>
  );
}
