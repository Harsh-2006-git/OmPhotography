"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";



export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    location: "",
    message: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const pkg = params.get("package");
      const custom = params.get("custom");
      const details = params.get("details");

      if (custom && details) {
        setFormData((prev) => ({ ...prev, message: details }));
      } else if (pkg) {
        let pkgName = "";
        if (pkg === "classic") pkgName = "The Classic Wedding Story (₹50k)";
        else if (pkg === "keepsake") pkgName = "The Cinematic Keepsake (₹65k)";
        else if (pkg === "royal") pkgName = "The Royal Signature Experience (₹80k)";

        if (pkgName) {
          setFormData((prev) => ({
            ...prev,
            message: `Hi Om Photography, I'm interested in inquiring about ${pkgName} for our wedding! Please share your availability.`
          }));
        }
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setIsSubmitting(false);
      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", phone: "", date: "", location: "", message: "" });
        setTimeout(() => {
          setFormSubmitted(false);
        }, 4000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to send inquiry. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert("An error occurred. Please check your internet connection.");
    }
  };

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(8px)",
      y: 15,
      opacity: 0,
    },
  };

  return (
    <div className="min-h-screen bg-white text-[#18352F] overflow-x-hidden font-sans scroll-smooth flex flex-col justify-between">
      {/* 1. HEADER — Fixed floating navbar */}
      <Header />


      {/* 2. CONTACT CONTENT SECTION */}
      <main ref={sectionRef} className="flex-1 pb-16">

        {/* ====== HERO SECTION (matches Services page) ====== */}
        <section className="relative w-full h-[210px] sm:h-[240px] md:h-[48vh] md:min-h-[420px] md:max-h-[500px] mt-16 md:mt-0 pt-[var(--header-height)] flex items-center justify-center bg-[#F5FBF8] overflow-hidden border-b border-[#D9E6E0]">

        {/* Left Floral Image — blends seamlessly into hero bg */}
          <div className="absolute left-0 bottom-0 top-0 w-[220px] sm:w-[260px] md:w-[320px] lg:w-[400px] pointer-events-none z-0 select-none hidden md:flex items-end">
            <div className="relative w-full h-full">
              <Image
                src="/contact/floral-right.png"
                alt=""
                fill
                sizes="(max-width: 768px) 220px, 400px"
                priority
                className="object-contain object-bottom-left"
                style={{ mixBlendMode: "multiply" }}
              />
              {/* Fade right edge into hero bg */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F5FBF8]" />
              {/* Fade top edge into hero bg */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F5FBF8] via-transparent to-transparent" style={{ height: "40%" }} />
            </div>
          </div>

          {/* Right Floral Image — blends seamlessly into hero bg */}
          <div className="absolute right-0 bottom-0 top-0 w-[220px] sm:w-[260px] md:w-[320px] lg:w-[400px] pointer-events-none z-0 select-none hidden md:flex items-end">
            <div className="relative w-full h-full">
              <Image
                src="/contact/floral-left.png"
                alt=""
                fill
                sizes="(max-width: 768px) 220px, 400px"
                priority
                className="object-contain object-bottom-right"
                style={{ mixBlendMode: "multiply" }}
              />
              {/* Fade left edge into hero bg */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F5FBF8]" />
              {/* Fade top edge into hero bg */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F5FBF8] via-transparent to-transparent" style={{ height: "40%" }} />
            </div>
          </div>

          {/* Center Content */}
          <div className="relative z-10 max-w-[90%] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[850px] mx-auto px-4 text-center flex flex-col items-center justify-center">

            {/* Small Badge */}
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.25em] font-bold text-[#0F5C4D]">
                • GET IN TOUCH •
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-[24px] xs:text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] text-[#18352F] font-normal leading-tight tracking-tight mb-1">
              Contact &amp; Booking
            </h1>
            <div className="font-script text-[42px] xs:text-[50px] sm:text-[58px] md:text-[72px] lg:text-[80px] text-[#1F6F63] leading-none select-none mb-2 md:mb-3">
              Let&apos;s Connect.
            </div>

            {/* Gold Divider */}
            <div className="w-12 h-[1px] bg-[#C5A880]/60 my-2 md:my-3 mx-auto"></div>

            {/* Short Description */}
            <p className="hidden md:block text-[#5E6C66] md:text-[15px] lg:text-[17px] leading-relaxed max-w-[95%] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[700px] mx-auto mb-0 font-inter">
              Ready to begin your love story? Share your details below and we&apos;ll craft a bespoke package tailored to your vision and wedding day.
            </p>

          </div>

        </section>

        {/* Bottom Decorative Emblem */}
        <div className="relative w-full h-0 z-20 pointer-events-none select-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F5FBF8] px-5 py-2 border border-[#D9E6E0] rounded-full shadow-sm">
            <div className="w-1.5 h-1.5 bg-[#C5A880] rotate-45" />
            <div className="w-14 sm:w-20 md:w-32 h-[1px] bg-[#C5A880]/40 mx-2" />
            <div className="w-3 h-3 border border-[#0F5C4D] bg-white rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-[#0F5C4D]" />
            </div>
            <div className="w-14 sm:w-20 md:w-32 h-[1px] bg-[#C5A880]/40 mx-2" />
            <div className="w-1.5 h-1.5 bg-[#C5A880] rotate-45" />
          </div>
        </div>



        {/* ====== CONTACT CONTENT ====== */}
        <div className="px-4 sm:px-6 md:px-12 xl:px-24 max-w-[1440px] mx-auto w-full pt-14 md:pt-20 pb-10">

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* Left Column: Sidebar with Quick Action & Social Links */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-white border border-[#D9E6E0] rounded-[24px] p-4 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(15,92,77,0.03)] flex flex-col justify-between h-full space-y-6 md:space-y-8">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-serif text-[18px] md:text-[22px] text-[#18352F] font-normal tracking-tight border-b border-[#D9E6E0] pb-2.5 mb-5">
                    Contact Channels
                  </h2>
                  <div className="flex flex-col gap-3">
                    {/* WhatsApp Card */}
                    <div className="bg-white border border-[#D9E6E0] rounded-[12px] p-3 flex items-center justify-between gap-3 hover:border-[#25D366]/40 hover:shadow-[0_4px_12px_rgba(37,211,102,0.06)] hover:-translate-y-0.5 transition-all duration-300 group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shrink-0 shadow-[0_2px_8px_rgba(37,211,102,0.1)]">
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.11-2.884-6.974-1.862-1.865-4.337-2.893-6.979-2.895-5.438 0-9.866 4.42-9.869 9.866-.001 1.765.485 3.491 1.408 4.98l-.323 1.182.164.159c.775-.758 1.621-1.584 2.158-1.921zm10.594-5.28c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-serif text-[13.5px] font-bold text-[#222222] tracking-[0.3px]">WhatsApp Instant</span>
                          <span className="text-[10.5px] text-[#666666] leading-tight font-inter">Chat for quick support</span>
                        </div>
                      </div>
                      <a
                        href="https://wa.me/916265303386?text=Hi%20Om%20Photography,%20I'd%20like%20to%20inquire%20about%20your%20services!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center py-1.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-[10.5px] md:text-[11px] rounded-[6px] transition-all duration-300 shadow-sm shrink-0 font-sans"
                      >
                        Chat Now
                      </a>
                    </div>
                                        {/* Email Inquiry Card */}
                    <div className="bg-white border border-[#D9E6E0] rounded-[12px] p-3 flex items-center justify-between gap-3 hover:border-[#0F5C4D]/40 hover:shadow-[0_4px_12px_rgba(15,92,77,0.06)] hover:-translate-y-0.5 transition-all duration-300 group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] group-hover:bg-[#0F5C4D] group-hover:text-white transition-all duration-300 shrink-0 shadow-[0_2px_8px_rgba(15,92,77,0.08)]">
                          <svg className="w-5 h-5 fill-none stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="flex flex-col font-sans">
                          <span className="font-serif text-[13.5px] font-bold text-[#18352F] tracking-[0.3px]">Email Inquiry</span>
                          <div className="flex flex-col mt-0.5 leading-none">
                            <a href="mailto:om.photography.2003@gmail.com" className="text-[11px] text-[#5E6C66] hover:text-[#0F5C4D] transition-colors font-inter font-medium">om.photography.2003@gmail.com</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Studio Location Card */}
                    <div className="bg-white border border-[#D9E6E0] rounded-[12px] p-3 flex items-center justify-between gap-3 hover:border-[#0F5C4D]/45 hover:shadow-[0_4px_12px_rgba(15,92,77,0.06)] hover:-translate-y-0.5 transition-all duration-300 group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] group-hover:bg-[#0F5C4D] group-hover:text-white transition-all duration-300 shrink-0 shadow-[0_2px_8px_rgba(15,92,77,0.1)]">
                          <svg className="w-5 h-5 fill-none stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        </div>
                        <div className="flex flex-col font-sans">
                          <span className="font-serif text-[13.5px] font-bold text-[#18352F] tracking-[0.3px]">Umaria Studio</span>
                          <span className="text-[10.5px] text-[#5E6C66] leading-tight font-inter">Umaria, Madhya Pradesh, India</span>
                        </div>
                      </div>
                      <a
                        href="https://www.google.com/search?client=ms-android-xiaomi-rvo2b&sca_esv=598771579&sxsrf=ACQVn0-D-HT2u5mkksMuOOz7zgfWYIi8iA:1705402659306&q=om+photography+studio+umaria&ludocid=15290579333970816527&ibp=gwp;0,7&lsig=AB86z5WoWqUIwEp0XlGIRlX2IOa7&kgs=9f3f4c0e2129f922&shndl=-1&shem=lcsnce,lsp&source=sh/x/loc/act/m1/2&fbclid=PARlRTSAODu9tleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafMKLMGpgkVXFGnHl9WDfB8Hsbk8gj1Cx7fNUL8ViaIB6PjBW8rcjryHSnYxA_aem_9mav3X1IKAYqLf86BLoKSQ#lpg=cid:CgIgAQ%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center py-1.5 px-3 bg-white border border-[#0F5C4D] hover:bg-[#0F5C4D] hover:text-white text-[#0F5C4D] font-bold text-[10.5px] md:text-[11px] rounded-[6px] transition-all duration-300 shadow-sm shrink-0 font-sans"
                      >
                        Navigate
                      </a>
                    </div>

                    {/* Direct Call & Hours Card */}
                    <div className="bg-white border border-[#D9E6E0] rounded-[12px] p-3 flex items-center justify-between gap-3 hover:border-[#0F5C4D]/40 hover:shadow-[0_4px_12px_rgba(15,92,77,0.06)] hover:-translate-y-0.5 transition-all duration-300 group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] group-hover:bg-[#0F5C4D] group-hover:text-white transition-all duration-300 shrink-0 shadow-[0_2px_8px_rgba(15,92,77,0.08)]">
                          <svg className="w-5 h-5 fill-none stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="flex flex-col font-sans">
                          <span className="font-serif text-[13.5px] font-bold text-[#18352F] tracking-[0.3px]">Direct Call & Hours</span>
                          <div className="flex flex-col mt-0.5 leading-none">
                            <a href="tel:+916265303386" className="text-[12px] font-bold text-[#0F5C4D] hover:underline font-inter font-medium">+91 62653 03386</a>
                            <span className="text-[10px] text-[#5E6C66] mt-0.5 font-inter">10am – 7pm IST (Mon-Sat)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Profiles & Quick Navigation */}
              <div className="space-y-4 border-t border-[#D9E6E0] pt-4 flex flex-col items-center justify-center text-center">
                <div className="w-full flex flex-col items-center justify-center">
                  <h3 className="text-[10px] uppercase tracking-[2px] font-semibold text-[#5E6C66] mb-2 text-center w-full">Social Profiles</h3>
                  <div className="flex flex-wrap justify-center gap-3.5 w-full">
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/om_photography_03?igsh=eWxqdmxkazBiczV3&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#bc1888]/5 border border-[#D9E6E0] text-[#bc1888] hover:bg-[#bc1888] hover:text-white hover:shadow-[0_4px_12px_rgba(188,24,136,0.18)] hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    {/* Google Search Profile */}
                    <a
                      href="https://www.google.com/search?client=ms-android-xiaomi-rvo2b&sca_esv=598771579&sxsrf=ACQVn0-D-HT2u5mkksMuOOz7zgfWYIi8iA:1705402659306&q=om+photography+studio+umaria&ludocid=15290579333970816527&ibp=gwp;0,7&lsig=AB86z5WoWqUIwEp0XlGIRlX2IOa7&kgs=9f3f4c0e2129f922&shndl=-1&shem=lcsnce,lsp&source=sh/x/loc/act/m1/2&fbclid=PARlRTSAODu9tleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafMKLMGpgkVXFGnHl9WDfB8Hsbk8gj1Cx7fNUL8ViaIB6PjBW8rcjryHSnYxA_aem_9mav3X1IKAYqLf86BLoKSQ#lpg=cid:CgIgAQ%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#0F5C4D]/5 border border-[#D9E6E0] text-[#0F5C4D] hover:bg-[#0F5C4D] hover:text-white hover:shadow-[0_4px_12px_rgba(15,92,77,0.18)] hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </a>
                    {/* YouTube */}
                    <a
                      href="https://m.youtube.com/@omphotographystudio.official?fbclid=PAZnRzaAODu_NleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAac9p8kszjJx8y0vAuXY93OJy0jVchfefxxybdYoADD-1rke0ziUeEv6WUcqAQ_aem_4oboO1MZffI7ucoZx3GI4A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#FF0000]/5 border border-[#D9E6E0] text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:shadow-[0_4px_12px_rgba(255,0,0,0.18)] hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    {/* Playbook Portfolio */}
                    <a
                      href="https://www.playbook.com/s/om-photography-studio/qaRvyLkianwVsDc7af7s9beB?fbclid=PAZnRzaAODvBZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadt_floTsP79qOiPtl_cqlNNvQjJ9FB1z4e0hreXr38Ha4nie0xD-bFL2QsrA_aem_536eCA57LsptfeKiZ_AtvQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-[#0F5C4D]/5 border border-[#D9E6E0] text-[#0F5C4D] hover:bg-[#0F5C4D] hover:text-white hover:shadow-[0_4px_12px_rgba(15,92,77,0.18)] hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18a2.25 2.25 0 0 1 2.25 2.25v4.5A2.25 2.25 0 0 1 20.25 21.75h-16.5A2.25 2.25 0 0 1 1.5 19.5v-4.5a2.25 2.25 0 0 1 2.25-2.25m0-9h16.5A2.25 2.25 0 0 1 22.5 6v4.5a2.25 2.25 0 0 1-2.25 2.25h-16.5A2.25 2.25 0 0 1 1.5 10.5V6A2.25 2.25 0 0 1 3.75 3.75Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

                <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[11.5px] md:text-[12px] text-[#5E6C66] w-full text-center">
                  <span className="font-semibold text-[9.5px] uppercase tracking-wider text-[#18352F]/70 mr-0.5">Explore:</span>
                  <a href="/" className="hover:text-[#0F5C4D] transition-colors">Home</a>
                  <span className="text-[#D9E6E0]/60 select-none">•</span>
                  <a href="/#portfolio" className="hover:text-[#0F5C4D] transition-colors">Portfolio</a>
                  <span className="text-[#D9E6E0]/60 select-none">•</span>
                  <a href="/#services" className="hover:text-[#0F5C4D] transition-colors">Services</a>
                  <span className="text-[#D9E6E0]/60 select-none">•</span>
                  <a href="/#about" className="hover:text-[#0F5C4D] transition-colors">About Us</a>
                </div>
              </div>
            </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-white border border-[#D9E6E0] rounded-[24px] p-4 sm:p-6 md:p-8 lg:p-10 shadow-[0_8px_32px_rgba(15,92,77,0.03)] flex flex-col justify-between h-full">
              <div className="h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-[#D9E6E0] pb-2.5 mb-5 shrink-0">
                  <h2 className="font-serif text-[18px] md:text-[22px] text-[#18352F] font-normal tracking-tight">
                    Booking Inquiry
                  </h2>
                  <Link href="/email-templates" className="text-[10px] uppercase tracking-wider font-semibold text-[#0F5C4D] hover:underline">
                    Preview Templates &rarr;
                  </Link>
                </div>

                {isSubmitting ? (
                  <div className="w-full bg-white border border-[#D9E6E0] rounded-[20px] p-6 md:p-12 text-center shadow-sm flex-1 flex flex-col justify-center items-center animate-[fadeIn_0.3s_ease-out]">
                    <div className="w-12 h-12 rounded-full border-4 border-[#0F5C4D]/10 border-t-[#0F5C4D] animate-spin mb-4" />
                    <h3 className="font-serif text-[18px] md:text-[22px] text-[#18352F] mb-1">Sending Inquiry...</h3>
                    <p className="text-[#5E6C66] text-[12.5px] max-w-[320px] mx-auto leading-relaxed font-sans">
                      Please wait a moment while we process your request and connect with our studio coordinators.
                    </p>
                  </div>
                ) : formSubmitted ? (
                  <div className="w-full bg-white border border-[#0F5C4D]/30 rounded-[20px] p-6 md:p-12 text-center shadow-sm flex-1 flex flex-col justify-center items-center">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-[#0F5C4D] mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3 className="font-serif text-[20px] md:text-[24px] text-[#18352F] mb-2 leading-tight">Inquiry Received Successfully!</h3>
                    <p className="text-[#5E6C66] text-[12.5px] md:text-[13.5px] max-w-[380px] mx-auto leading-relaxed font-inter">
                      Thank you for reaching out to Om Photography. Our booking coordinators will review your event details and get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4 md:space-y-5 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {/* Name */}
                        <div className="flex flex-col">
                          <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#5E6C66] tracking-[1px] mb-1.5 font-sans">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full h-[42px] md:h-[46px] bg-white border border-[#D9E6E0] rounded-[8px] px-3.5 text-[12.5px] md:text-[13.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D] focus:bg-white focus:ring-[3px] focus:ring-[#0F5C4D]/10 transition-all font-sans"
                          />
                        </div>
                        {/* Email */}
                        <div className="flex flex-col">
                          <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#5E6C66] tracking-[1px] mb-1.5 font-sans">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. rahul@example.com"
                            className="w-full h-[42px] md:h-[46px] bg-white border border-[#D9E6E0] rounded-[8px] px-3.5 text-[12.5px] md:text-[13.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D] focus:bg-white focus:ring-[3px] focus:ring-[#0F5C4D]/10 transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {/* Phone */}
                        <div className="flex flex-col">
                          <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#5E6C66] tracking-[1px] mb-1.5 font-sans">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full h-[42px] md:h-[46px] bg-white border border-[#D9E6E0] rounded-[8px] px-3.5 text-[12.5px] md:text-[13.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D] focus:bg-white focus:ring-[3px] focus:ring-[#0F5C4D]/10 transition-all font-sans"
                          />
                        </div>
                        {/* Event Date */}
                        <div className="flex flex-col">
                          <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#5E6C66] tracking-[1px] mb-1.5 font-sans">Event Date</label>
                          <input
                            type="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full h-[42px] md:h-[46px] bg-white border border-[#D9E6E0] rounded-[8px] px-3.5 text-[12.5px] md:text-[13.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D] focus:bg-white focus:ring-[3px] focus:ring-[#0F5C4D]/10 transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:gap-5">
                        {/* Event Location */}
                        <div className="flex flex-col">
                          <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#5E6C66] tracking-[1px] mb-1.5 font-sans">Event Location (City)</label>
                          <input
                            type="text"
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g. Udaipur, Rajasthan"
                            className="w-full h-[42px] md:h-[46px] bg-white border border-[#D9E6E0] rounded-[8px] px-3.5 text-[12.5px] md:text-[13.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D] focus:bg-white focus:ring-[3px] focus:ring-[#0F5C4D]/10 transition-all font-sans"
                          />
                        </div>
                      </div>

                      {/* Message Box */}
                      <div className="flex flex-col flex-1">
                        <label className="text-[10px] md:text-[11px] uppercase font-semibold text-[#5E6C66] tracking-[1px] mb-1.5 font-sans">Event Details / Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us about your wedding ceremonies, style preferences, guest count, and specific requests..."
                          className="w-full flex-1 min-h-[90px] bg-white border border-[#D9E6E0] rounded-[8px] p-3.5 text-[12.5px] md:text-[13.5px] text-[#18352F] focus:outline-none focus:border-[#0F5C4D] focus:bg-white focus:ring-[3px] focus:ring-[#0F5C4D]/10 transition-all font-sans resize-y"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full h-[46px] md:h-[50px] bg-[#0F5C4D] rounded-[8px] flex items-center justify-center gap-2 text-white font-semibold text-[13px] md:text-[14px] tracking-[0.15em] uppercase shadow-[0_6px_20px_rgba(15,92,77,0.15)] hover:bg-[#176B5C] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer active:translate-y-0 mt-2"
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
        <section className="mt-12 md:mt-16 bg-white border border-[#D9E6E0] rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(15,92,77,0.02)] p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
            <div>
              <h3 className="font-serif text-[16px] sm:text-[20px] md:text-[24px] text-[#18352F] font-normal tracking-tight">Studio Map & Directions</h3>
              <p className="hidden sm:block text-[#5E6C66] text-[13px] md:text-[14px] mt-0.5 font-sans">Visit us for face-to-face consultation and album walkthroughs</p>
            </div>
            <a 
              href="https://www.google.com/search?client=ms-android-xiaomi-rvo2b&sca_esv=598771579&sxsrf=ACQVn0-D-HT2u5mkksMuOOz7zgfWYIi8iA:1705402659306&q=om+photography+studio+umaria&ludocid=15290579333970816527&ibp=gwp;0,7&lsig=AB86z5WoWqUIwEp0XlGIRlX2IOa7&kgs=9f3f4c0e2129f922&shndl=-1&shem=lcsnce,lsp&source=sh/x/loc/act/m1/2&fbclid=PARlRTSAODu9tleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafMKLMGpgkVXFGnHl9WDfB8Hsbk8gj1Cx7fNUL8ViaIB6PjBW8rcjryHSnYxA_aem_9mav3X1IKAYqLf86BLoKSQ#lpg=cid:CgIgAQ%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F5C4D] hover:bg-[#176B5C] text-white font-semibold text-[12.5px] uppercase tracking-wider rounded-[8px] shadow-[0_6px_20px_rgba(15,92,77,0.1)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Get Directions</span>
            </a>
          </div>
          
          {/* Map Iframe */}
          <div className="relative w-full h-[300px] md:h-[450px] rounded-[16px] overflow-hidden border border-[#D9E6E0] shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] bg-white">
            <iframe 
              src="https://maps.google.com/maps?q=om%20photography%20studio%20umaria&t=&z=15&ie=UTF8&iwloc=&output=embed" 
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
        </div>{/* ====== END CONTACT CONTENT ====== */}
      </main>

      {/* 3. FOOTER (Bottom Section) */}
      <Footer />
    </div>
  );
}
