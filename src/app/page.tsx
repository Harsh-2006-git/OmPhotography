"use client";

import { useState, useEffect } from "react";
import Image from "next/image";


// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`group border rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 ${open
        ? "border-[#D4AF37]/50 bg-white shadow-[0_8px_32px_rgba(212,175,55,0.12)]"
        : "border-[#E8DCC2] bg-[#FEFCF8] hover:border-[#D4AF37]/40 hover:shadow-[0_4px_20px_rgba(212,175,55,0.08)]"
        }`}
      onClick={() => setOpen((o) => !o)}
    >
      {/* Question row */}
      <div className="flex items-center justify-between px-4 py-3.5 md:px-6 md:py-5 select-none">
        <div className="flex items-center gap-2.5 md:gap-4">
          <span
            className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] md:text-[12px] font-bold font-serif transition-all duration-300 ${open ? "bg-[#D4AF37] text-white" : "bg-[#F5EDD8] text-[#D4AF37]"
              }`}
          >
            Q
          </span>
          <span className={`font-serif text-[14px] md:text-[16px] leading-snug transition-colors duration-300 ${open ? "text-[#C9A227]" : "text-[#222222] group-hover:text-[#C9A227]"}`}>
            {question}
          </span>
        </div>
        {/* Plus / Minus icon */}
        <div className={`w-6 h-6 md:w-7 md:h-7 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? "border-[#D4AF37] bg-[#D4AF37]/10 rotate-45" : "border-[#DDD0B3] group-hover:border-[#D4AF37]/60"
          }`}>
          <svg className={`w-3 h-3 md:w-3.5 md:h-3.5 transition-colors duration-300 ${open ? "text-[#D4AF37]" : "text-[#AAAAAA]"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>

      {/* Answer — smooth expand */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="px-4 pb-4 pl-12 md:px-6 md:pb-6 md:pl-[4.25rem]">
          <div className="w-full h-[1px] bg-[#E8DCC2] mb-3 md:mb-4" />
          <p className="text-[#555555] text-[13px] md:text-[14px] leading-[1.8] md:leading-[1.85] font-sans">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when sidebar or contact modal is open
  useEffect(() => {
    document.body.style.overflow = (menuOpen || contactModalOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, contactModalOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Form state
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

  // Carousel images
  const carouselImages = [
    "/carousel-1.png",
    "/carousel-2.png",
    "/carousel-3.png",
    "/carousel-4.png",
    "/carousel-5.png",
    "/carousel-6.png"
  ];

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const masonryGallery = [
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445793.jpg", category: "Wedding Story", title: "Portfolio Frame 01" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445797.jpg", category: "Wedding Story", title: "Portfolio Frame 02" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445798.jpg", category: "Bride Portrait", title: "Portfolio Frame 03" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445799.jpg", category: "Editorial Wedding", title: "Portfolio Frame 04" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445800.jpg", category: "Ceremony", title: "Portfolio Frame 05" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445802.jpg", category: "Candid Moment", title: "Portfolio Frame 06" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445803.jpg", category: "Rituals", title: "Portfolio Frame 07" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445804.jpg", category: "Bride Closeup", title: "Portfolio Frame 08" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445805.jpg", category: "Pre-Wedding", title: "Portfolio Frame 09" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445806.jpg", category: "Wedding Detail", title: "Portfolio Frame 10" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445807.jpg", category: "Couple Portrait", title: "Portfolio Frame 11" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445808.jpg", category: "Wedding Couple", title: "Portfolio Frame 12" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445809.jpg", category: "Cinematic Story", title: "Portfolio Frame 13" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445810.jpg", category: "Celebration", title: "Portfolio Frame 14" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445811.jpg", category: "Wedding Story", title: "Portfolio Frame 15" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445812.jpg", category: "Baraat", title: "Portfolio Frame 16" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445814.jpg", category: "Destination Wedding", title: "Portfolio Frame 17" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445815.jpg", category: "Candid Moment", title: "Portfolio Frame 18" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445816.jpg", category: "Wedding Detail", title: "Portfolio Frame 19" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445817.jpg", category: "Editorial Wedding", title: "Portfolio Frame 20" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-447046.jpg", category: "Pre-Wedding", title: "Portfolio Frame 21" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-447047.jpg", category: "Couple Portrait", title: "Portfolio Frame 22" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-447048.jpg", category: "Wedding Story", title: "Portfolio Frame 23" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-447049.jpg", category: "Bride Portrait", title: "Portfolio Frame 24" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-447050.jpg", category: "Ceremony", title: "Portfolio Frame 25" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-447051.jpg", category: "Destination Wedding", title: "Portfolio Frame 26" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-448068.jpg", category: "Groom Portrait", title: "Portfolio Frame 27" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-448095.jpg", category: "Black and White", title: "Portfolio Frame 28" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-448096.jpg", category: "Cinematic Story", title: "Portfolio Frame 29" },
    { url: "https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-451747.jpg", category: "Luxury Wedding", title: "Portfolio Frame 30" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#222222] overflow-x-hidden font-sans scroll-smooth">

      {/* 1. HEADER — Fixed floating navbar */}
      <header
        className={`fixed top-0 left-0 right-0 h-[60px] md:h-[70px] w-full px-4 md:px-12 flex items-center justify-between z-50 transition-all duration-500 bg-[#FEFCF8]/90 backdrop-blur-xl border-b border-[#D4AF37]/25 ${scrolled
          ? "shadow-[0_4px_30px_rgba(212,175,55,0.12)]"
          : ""
          }`}
      >
        {/* LOGO */}
        <div className="flex flex-col items-start leading-none select-none">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-[28px] font-bold text-[#D4AF37] tracking-wider">OM</span>
            <svg className="w-8 h-6 text-[#D4AF37] stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
          <span className="font-sans text-[7.5px] font-medium text-[#D4AF37] tracking-[0.45em] mt-0.5">PHOTOGRAPHY</span>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold tracking-wide font-sans">
          <a href="#" className="text-[#D4AF37] transition-colors">Home</a>
          <a href="#about" className="text-[#555555] hover:text-[#D4AF37] transition-colors">About</a>
          <a href="#portfolio" className="text-[#555555] hover:text-[#D4AF37] transition-colors">Portfolio</a>
          <a href="#services" className="text-[#555555] hover:text-[#D4AF37] transition-colors">Services</a>
          <a href="#booking" className="text-[#555555] hover:text-[#D4AF37] transition-colors">Contact</a>
        </nav>

        {/* RIGHT SIDE: Desktop Book Now + Mobile actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Book Now */}
          <a href="#booking" className="hidden md:flex h-[46px] w-[160px] bg-[#E0B44C] rounded-[8px] items-center justify-center gap-2 text-[#222222] font-semibold text-[15px] shadow-sm hover:bg-[#D4AF37] hover:shadow-md transition-all duration-300">
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>BOOK NOW</span>
          </a>

          {/* Mobile: compact Book Now */}
          <a
            href="#booking"
            className="md:hidden h-[34px] px-3.5 bg-[#D4AF37] rounded-[7px] flex items-center justify-center text-[#111111] font-semibold text-[11px] tracking-[1px] uppercase shadow-sm active:scale-95 transition-all duration-200"
          >
            Book Now
          </a>

          {/* Mobile Hamburger — styled icon */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-[34px] h-[34px] rounded-[7px] bg-[#111111]/8 border border-[#D4AF37]/40 flex flex-col items-center justify-center gap-[4px] transition-all duration-200 active:scale-95"
            aria-label="Open menu"
          >
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
              <rect y="0" width="18" height="2" rx="1" fill="#D4AF37" />
              <rect y="5.5" width="12" height="2" rx="1" fill="#D4AF37" />
              <rect y="11" width="18" height="2" rx="1" fill="#D4AF37" />
            </svg>
          </button>
        </div>
      </header>

      {/* ─── MOBILE FULL-SCREEN SIDEBAR ─────────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-400 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-full bg-[#0D0D0D] flex flex-col transition-transform duration-500 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Top Bar */}
        <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-white/10">
          {/* Logo in sidebar */}
          <div className="flex flex-col items-start leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-[26px] font-bold text-[#D4AF37] tracking-wider">OM</span>
              <svg className="w-7 h-5 text-[#D4AF37] stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
            <span className="font-sans text-[7px] font-medium text-[#D4AF37] tracking-[0.4em] mt-0.5">PHOTOGRAPHY</span>
          </div>
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-200"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Links — compact, left-aligned */}
        <nav className="flex flex-col px-6 pt-6 gap-0 flex-1 overflow-y-auto">
          {[
            { href: "#",          label: "Home",       num: "01" },
            { href: "#about",     label: "About",      num: "02" },
            { href: "#portfolio", label: "Portfolio",  num: "03" },
            { href: "#services",  label: "Services",   num: "04" },
            { href: "#faq",       label: "FAQ",        num: "05" },
            { href: "#booking",   label: "Contact",    num: "06" },
          ].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="group inline-flex items-center gap-3 py-3 border-b border-white/[0.07] transition-all duration-200 w-auto"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-[10px] text-[#D4AF37]/40 font-mono tracking-widest w-5 shrink-0">{item.num}</span>
              <span className="font-serif text-[18px] text-white/75 group-hover:text-[#D4AF37] transition-colors duration-200 leading-none">
                {item.label}
              </span>
              <svg className="w-3.5 h-3.5 text-[#D4AF37]/20 group-hover:text-[#D4AF37]/70 group-hover:translate-x-0.5 transition-all duration-200 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="px-6 py-6 border-t border-white/10 bg-white/[0.01]">
          {/* Brand highlights (smaller for mobile, not in hero) */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 mb-5 pb-5 border-b border-white/[0.08]">
            {/* Based in India */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white/90 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider leading-tight">Based in India</h4>
                <p className="text-white/40 text-[8px] sm:text-[9px] font-sans mt-0.5">Available Worldwide</p>
              </div>
            </div>

            {/* Cinematic Shoots */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white/95 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider leading-tight">Cinematic Shoots</h4>
                <p className="text-white/40 text-[8px] sm:text-[9px] font-sans mt-0.5">Timeless Stories</p>
              </div>
            </div>

            {/* 4.9/5 Rated */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white/95 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider leading-tight">4.9/5 Rated</h4>
                <p className="text-white/40 text-[8px] sm:text-[9px] font-sans mt-0.5">By Happy Clients</p>
              </div>
            </div>

            {/* +91 12345 67890 */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white/95 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider leading-tight">+91 12345 67890</h4>
                <p className="text-white/40 text-[8px] sm:text-[9px] font-sans mt-0.5">Let&apos;s Create Magic</p>
              </div>
            </div>
          </div>

          {/* Email row under highlights */}
          <div className="flex items-center gap-2 mb-5 text-white/50 text-[11px] font-sans justify-center">
            <svg className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            hello@omphotography.com
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5 mb-6">

            {/* Instagram */}
            <a href="#" aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-[#D4AF37]/25 bg-white/5 flex items-center justify-center text-[#D4AF37]/60 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all duration-250">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-[#D4AF37]/25 bg-white/5 flex items-center justify-center text-[#D4AF37]/60 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all duration-250">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" aria-label="YouTube"
              className="w-9 h-9 rounded-full border border-[#D4AF37]/25 bg-white/5 flex items-center justify-center text-[#D4AF37]/60 hover:bg-[#FF0000] hover:text-white hover:border-transparent transition-all duration-250">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a href="#" aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-[#D4AF37]/25 bg-white/5 flex items-center justify-center text-[#D4AF37]/60 hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all duration-250">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </a>

            {/* Pinterest */}
            <a href="#" aria-label="Pinterest"
              className="w-9 h-9 rounded-full border border-[#D4AF37]/25 bg-white/5 flex items-center justify-center text-[#D4AF37]/60 hover:bg-[#E60023] hover:text-white hover:border-transparent transition-all duration-250">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>

          </div>


          {/* Book Now CTA */}
          <a
            href="#booking"
            onClick={closeMenu}
            className="w-full h-[50px] bg-[#D4AF37] rounded-[10px] flex items-center justify-center gap-2 text-[#111111] font-semibold text-[14px] tracking-[1.5px] uppercase hover:bg-[#E0C050] transition-all duration-300 shadow-[0_0_24px_rgba(212,175,55,0.3)]"
          >
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book a Session
          </a>
        </div>
      </div>

      {/* 2. HERO SECTION / BANNER */}
      <section className="h-[100dvh] md:h-screen pt-[60px] md:pt-[70px] flex flex-col justify-between px-4 sm:px-6 md:px-12 py-3 md:py-3 max-w-[1920px] mx-auto w-full overflow-hidden">
        {/* Two columns section (Flex on mobile, Grid on desktop) */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-8 items-center justify-center flex-1 min-h-0 py-1.5 w-full">
          {/* Left Column (42%) */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center lg:pr-4 w-full flex-shrink-0">
            {/* Top Label with decorative gold lines */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 mb-4 max-w-full">
              <div className="flex items-center shrink-0">
                <span className="w-3 sm:w-6 h-[1px] bg-[#D4AF37]"></span>
                <svg className="w-2 h-2 text-[#D4AF37] -ml-0.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
                </svg>
              </div>
              <span className="text-[2.5vw] xs:text-[10.5px] sm:text-[10px] xl:text-[11px] uppercase tracking-[0.4px] xs:tracking-[1.2px] sm:tracking-[3px] font-semibold text-[#666666] font-sans whitespace-nowrap">
                Premium Wedding Photography & Cinematography
              </span>
              <div className="flex items-center shrink-0">
                <svg className="w-2 h-2 text-[#D4AF37] -mr-0.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
                </svg>
                <span className="w-3 sm:w-6 h-[1px] bg-[#D4AF37]"></span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-[38px] xs:text-[42px] sm:text-[44px] md:text-[46px] xl:text-[54px] leading-[1.12] text-[#222222] font-normal tracking-tight">
              Capturing Your<br />
              Lifetime Memories
            </h1>
            {/* Script word "Realistically" */}
            <div className="font-script text-[54px] xs:text-[60px] sm:text-[64px] md:text-[68px] xl:text-[76px] text-[#D4AF37] leading-none mt-1 pl-3 select-none transform -rotate-1 origin-left z-10">
              Realistically
            </div>

            {/* Description */}
            <p className="text-[#666666] text-[12.5px] xs:text-[13.5px] sm:text-[14px] xl:text-[16px] font-normal leading-[1.5] max-w-[460px] mt-2 md:mt-4 font-sans">
              We don't just click pictures, we capture emotions, moments and stories you'll cherish forever.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-6">
              {/* Button 1 */}
              <a href="#portfolio" className="h-[42px] md:h-[50px] px-4 md:w-[200px] bg-[#E0B44C] rounded-[8px] flex items-center justify-center gap-2 text-[#222222] font-semibold text-[12px] md:text-[14px] xl:text-[15px] hover:bg-[#D4AF37] hover:shadow-md transition-all duration-300">
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span>VIEW OUR WORK</span>
              </a>

              {/* Button 2 */}
              <a href="#booking" className="h-[42px] md:h-[50px] px-4 md:w-[190px] border-2 border-[#D4AF37] rounded-[8px] flex items-center justify-center gap-2 text-[#222222] font-semibold text-[12px] md:text-[14px] xl:text-[15px] hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>BOOK A SESSION</span>
              </a>
            </div>
          </div>

          {/* MOBILE/TABLET COLLAGE (shown only on mobile/tablet) */}
          <div 
            className="lg:hidden relative max-w-full mx-auto flex items-center justify-center mt-2.5 z-10"
            style={{ height: "33dvh", width: "calc(33dvh * 1.6)" }}
          >
            {/* Main Bigger Image */}
            <div className="relative w-[78%] h-[88%] rounded-[16px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.15)] border border-[#E8DCC2]/30">
              <Image
                src="/main_hero.png"
                alt="Premium wedding photography portrait of an Indian couple"
                fill
                priority
                sizes="75vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Smaller Overlay Image 1 (Bottom Left) */}
            <div className="absolute bottom-[2%] left-[2%] w-[42%] h-[48%] rounded-[12px] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.25)] border-[5px] border-[#F7F5F2] z-20">
              <Image
                src="/carousel-2.png"
                alt="Bridal portrait detail shoot"
                fill
                sizes="35vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Tiny Details Image 2 (Top Left - Floating accent) */}
            <div className="absolute top-[8%] left-[12%] w-[25%] h-[30%] rounded-[8px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.15)] border-[4px] border-[#F7F5F2] z-10 hidden sm:block">
              <Image
                src="/carousel-3.png"
                alt="Groom and couple smoke portrait"
                fill
                sizes="15vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* FLOATING STAT CARD */}
            <div className="absolute bottom-[6%] right-[6%] bg-white/90 backdrop-blur-md border border-[#E8DCC2]/60 rounded-[12px] p-2 sm:p-2.5 flex flex-col items-center justify-center shadow-lg text-center w-[90px] sm:w-[115px] z-30 transition-transform duration-300 hover:scale-105">
              <span className="font-serif text-[18px] sm:text-[24px] font-normal text-[#D4AF37] leading-none tracking-tight">100+</span>
              <span className="text-[7px] sm:text-[9px] font-bold tracking-[0.12em] text-[#222222] font-sans uppercase mt-1">WEDDINGS</span>
              <span className="text-[5.5px] sm:text-[7px] font-medium tracking-[0.08em] text-[#666666] font-sans uppercase">Captured</span>
              <div className="w-6 h-[1px] bg-[#E8DCC2]/80 my-1" />
              <span className="text-[5.5px] sm:text-[7px] font-bold tracking-[0.08em] text-[#D4AF37] font-sans uppercase">Memories For Life</span>
            </div>
          </div>

          {/* DESKTOP ORIGINAL IMAGE (shown only on desktop lg+) */}
          <div className="hidden lg:col-span-7 lg:flex relative w-full h-full max-h-[260px] sm:max-h-[320px] md:max-h-[380px] xl:max-h-[460px] items-center justify-end">
            <div className="relative w-full h-full rounded-[16px] overflow-hidden shadow-sm">
              <Image
                src="/main_hero.png"
                alt="Premium wedding photography portrait of an Indian couple"
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 15%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%)'
                }}
              />

              {/* FLOATING STAT CARD */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md border border-[#E8DCC2]/60 rounded-[12px] p-3 flex flex-col items-center justify-center shadow-lg text-center w-[130px] z-20 transition-transform duration-300 hover:scale-105">
                <span className="font-serif text-[28px] font-normal text-[#D4AF37] leading-none tracking-tight">100+</span>
                <span className="text-[9.5px] font-bold tracking-[0.15em] text-[#222222] font-sans uppercase mt-1">WEDDINGS</span>
                <span className="text-[7.5px] font-medium tracking-[0.1em] text-[#666666] font-sans uppercase">Captured</span>
                <div className="w-8 h-[1px] bg-[#E8DCC2]/80 my-1.5" />
                <span className="text-[7.5px] font-bold tracking-[0.08em] text-[#D4AF37] font-sans uppercase">Memories For Life</span>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE CAROUSEL CONTAINER (Height: 140px) */}
        <div className="relative w-full bg-white border border-[#D4AF37]/50 rounded-[12px] p-2 md:p-2.5 h-[80px] md:h-[140px] flex items-center justify-between flex-shrink-0 mt-1.5 md:mt-0">
          {/* Left Arrow */}
          <button onClick={handlePrevCarousel} className="absolute left-[-20px] w-[40px] h-[40px] rounded-full border border-[#D4AF37]/50 bg-white flex items-center justify-center text-[#D4AF37] shadow-md hover:bg-[#D4AF37] hover:text-white transition-all duration-300 z-10">
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Carousel Images */}
          <div className="flex items-center gap-2.5 w-full h-full overflow-hidden">
            {carouselImages.map((src, index) => {
              const shiftedIndex = (index + carouselIndex) % carouselImages.length;
              const imageSrc = carouselImages[shiftedIndex];
              return (
                <div key={index} className="relative flex-1 h-full rounded-[6px] overflow-hidden group cursor-pointer">
                  <Image
                    src={imageSrc}
                    alt={`Wedding moment ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button onClick={handleNextCarousel} className="absolute right-[-20px] w-[40px] h-[40px] rounded-full border border-[#D4AF37]/50 bg-white flex items-center justify-center text-[#D4AF37] shadow-md hover:bg-[#D4AF37] hover:text-white transition-all duration-300 z-10">
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* BOTTOM INFO ROW */}
        <div className="hidden md:grid md:grid-cols-4 gap-3 md:gap-4 py-3 border-t border-[#E8DCC2] mt-2 md:mt-3 flex-shrink-0 w-full">
          {/* Item 1 */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
              <svg className="w-4 h-4 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[#222222] text-[13px] font-sans">Based in India</h4>
              <p className="text-[#666666] text-[11px] font-sans">Available Worldwide</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
              <svg className="w-4 h-4 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[#222222] text-[13px] font-sans">Cinematic Shoots</h4>
              <p className="text-[#666666] text-[11px] font-sans">Timeless Stories</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
              <svg className="w-4 h-4 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[#222222] text-[13px] font-sans">4.9/5 Rated</h4>
              <p className="text-[#666666] text-[11px] font-sans">By Happy Clients</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
              <svg className="w-4 h-4 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[#222222] text-[13px] font-sans">+91 12345 67890</h4>
              <p className="text-[#666666] text-[11px] font-sans">Let's Create Magic</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT / INTRODUCTION SECTION */}
      <section id="about" className="bg-white border-t border-[#E8DCC2] py-8 md:py-20 px-4 sm:px-6 md:px-12 xl:px-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-16 items-center">
          
          {/* Heading (Mobile Only) */}
          <div className="lg:hidden w-full flex flex-col items-center text-center mb-4">
            <div className="font-script text-[24px] text-[#D4AF37] mb-1 select-none">
              Our Philosophy
            </div>
            <h2 className="font-serif text-[22px] sm:text-[30px] text-[#222222] font-normal leading-tight tracking-tight mb-2 px-2">
              Capturing Love in Its Purest, Most Authentic Form
            </h2>
          </div>

          {/* Left Side: Professional Photo */}
          <div className="lg:col-span-5 relative max-w-[450px] mx-auto w-full lg:max-w-none">
            <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-[16px] translate-x-2.5 translate-y-2.5 lg:translate-x-4 lg:translate-y-4 pointer-events-none z-0"></div>
            <div className="relative rounded-[16px] overflow-hidden aspect-[1.5/1] sm:aspect-[1.8/1] lg:aspect-[3/4] shadow-lg bg-gray-100 z-10">
              <Image
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80"
                alt="Om - Lead Photographer"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side: Introduction text */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left mt-4 lg:mt-0">
            {/* Heading (Desktop Only) */}
            <div className="hidden lg:flex flex-col items-start">
              <div className="font-script text-[36px] text-[#D4AF37] mb-1 select-none">
                Our Philosophy
              </div>
              <h2 className="font-serif text-[42px] text-[#222222] font-normal leading-tight tracking-tight mb-6">
                Capturing Love in Its Purest, Most Authentic Form
              </h2>
            </div>

            <p className="text-[#666666] text-[13px] md:text-[16px] leading-[1.65] md:leading-[1.8] font-sans mb-3 md:mb-6 px-1 lg:px-0">
              Hi, I am Om, the lead photographer and founder of Om Photography. With over a decade of capturing premium luxury weddings across India and worldwide, our vision is simple: <strong>to capture your lifetime memories realistically.</strong>
            </p>
            <p className="text-[#666666] text-[13px] md:text-[16px] leading-[1.65] md:leading-[1.8] font-sans mb-4 md:mb-8 px-1 lg:px-0">
              We specialize in candid emotions, dramatic lighting, and cinematic story-telling. We believe that a wedding isn't just an event; it's a legacy of emotions, laughter, and tears that you will pass down for generations. Our team operates with micro-precision, ensuring that every fleeting moment is immortalized with editorial elegance.
            </p>
            <div className="grid grid-cols-3 gap-2 md:gap-6 w-full pt-4 md:pt-6 border-t border-[#E8DCC2]">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="text-[18px] sm:text-[22px] md:text-[28px] font-serif font-bold text-[#D4AF37]">10+</div>
                <div className="text-[8.5px] sm:text-[10px] md:text-[12px] uppercase tracking-[1px] text-[#666666] mt-0.5">Years Experience</div>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="text-[18px] sm:text-[22px] md:text-[28px] font-serif font-bold text-[#D4AF37]">350+</div>
                <div className="text-[8.5px] sm:text-[10px] md:text-[12px] uppercase tracking-[1px] text-[#666666] mt-0.5">Weddings Shot</div>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="text-[18px] sm:text-[22px] md:text-[28px] font-serif font-bold text-[#D4AF37]">100%</div>
                <div className="text-[8.5px] sm:text-[10px] md:text-[12px] uppercase tracking-[1px] text-[#666666] mt-0.5">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PINTEREST-STYLE MASONRY GALLERY SECTION */}
      <section id="portfolio" className="bg-[#F8F5F0] border-t border-[#E8DCC2] py-24 px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="mx-auto max-w-[760px] text-center mb-16">
            <div className="text-[12px] uppercase tracking-[0.42em] text-[#D4AF37] font-semibold mb-4">OUR WORK</div>
            <h2 className="font-serif text-[42px] md:text-[56px] text-[#222222] font-normal leading-[1.08] tracking-tight mb-5">
              Stories Through Our Lens
            </h2>
            <p className="text-[#666666] text-[15px] md:text-[17px] leading-[1.8] font-sans">
              A collection of timeless moments, captured with elegance and emotion.
            </p>
          </div>

          <div className="masonry-gallery">
            {masonryGallery.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="masonry-card group"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="masonry-image"
                />
                <div className="masonry-overlay">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37] font-semibold">{item.category}</span>
                  <span className="mt-2 font-serif text-white text-[24px] leading-tight">{item.title}</span>
                  <span className="mt-4 text-white/85 text-[12px] uppercase tracking-[0.22em] font-semibold">View Project &rarr;</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES & EXPERIENCE SECTION */}
      <section id="services" className="bg-white border-t border-[#E8DCC2] py-8 md:py-20 px-4 sm:px-6 md:px-12 xl:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <div className="font-script text-[24px] md:text-[36px] text-[#D4AF37] mb-1">Our Services</div>
          <h2 className="font-serif text-[22px] sm:text-[34px] md:text-[42px] text-[#222222] font-normal tracking-tight text-center mb-6 md:mb-16">
            What We Specialize In
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 w-full">
            {/* Service 1 */}
            <div className="bg-[#F7F5F2] border border-[#E8DCC2] rounded-[16px] p-4 sm:p-5 md:p-8 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-4 md:mb-6 shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h3 className="font-serif text-[18px] md:text-[22px] text-[#222222] font-normal mb-2 md:mb-3">Candid Photography</h3>
              <p className="text-[#666666] text-[12.5px] md:text-[14px] leading-[1.6]">
                Capturing natural, unscripted emotions, stolen glances, and real laughter as it happens without forcing poses.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-[#F7F5F2] border border-[#E8DCC2] rounded-[16px] p-4 sm:p-5 md:p-8 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-4 md:mb-6 shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <h3 className="font-serif text-[18px] md:text-[22px] text-[#222222] font-normal mb-2 md:mb-3">Cinematic Films</h3>
              <p className="text-[#666666] text-[12.5px] md:text-[14px] leading-[1.6]">
                Creating bespoke cinematic wedding highlights, teasers, and documentary-style films of your royal celebrations.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-[#F7F5F2] border border-[#E8DCC2] rounded-[16px] p-4 sm:p-5 md:p-8 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-4 md:mb-6 shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3 className="font-serif text-[18px] md:text-[22px] text-[#222222] font-normal mb-2 md:mb-3">Drone Shoots</h3>
              <p className="text-[#666666] text-[12.5px] md:text-[14px] leading-[1.6]">
                Grand aerial cinematography capturing the scale, majesty, and breath-taking architecture of your wedding destination.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-[#F7F5F2] border border-[#E8DCC2] rounded-[16px] p-4 sm:p-5 md:p-8 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-4 md:mb-6 shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5V4.5z" />
                </svg>
              </div>
              <h3 className="font-serif text-[18px] md:text-[22px] text-[#222222] font-normal mb-2 md:mb-3">Premium Albums</h3>
              <p className="text-[#666666] text-[12.5px] md:text-[14px] leading-[1.6]">
                Handcrafted leather albums with gold gilded edges and flush mount pages, custom-designed to tell your unique love story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS / CLIENT REVIEWS */}
      <section className="bg-[#F7F5F2] border-t border-[#E8DCC2] py-8 md:py-20 px-4 sm:px-6 md:px-12 xl:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <div className="font-script text-[22px] md:text-[36px] text-[#D4AF37] mb-1">Testimonials</div>
          <h2 className="font-serif text-[22px] sm:text-[32px] md:text-[42px] text-[#222222] font-normal tracking-tight text-center mb-6 md:mb-16">
            Words From Our Beautiful Couples
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 w-full">
            {/* Review 1 */}
            <div className="bg-white border border-[#E8DCC2] rounded-[16px] p-4 sm:p-5 md:p-8 flex flex-col items-center text-center shadow-sm">
              <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 md:mb-4 border border-[#D4AF37]">
                <Image
                  src="https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445804.jpg"
                  alt="Aarav and Diya"
                  fill
                  sizes="(max-width: 768px) 56px, 80px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-1 mb-3 md:mb-4 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] text-[13px] md:text-[14px] leading-[1.7] md:leading-[1.8] italic mb-4 md:mb-6">
                "Om Photography ne hamari shaadi ko sach me yaadgaar bana diya! The team was so friendly and professional, they captured emotional candids and details that we didn't even notice. We absolutely love our wedding film and album!"
              </p>
              <h4 className="font-serif text-[16px] md:text-[18px] font-semibold text-[#222222]">Aarav & Diya</h4>
              <span className="text-[10px] md:text-[11px] text-[#D4AF37] uppercase tracking-[0.5px] md:tracking-[1px] mt-1 font-sans">Married in Udaipur</span>
            </div>

            {/* Review 2 */}
            <div className="bg-white border border-[#E8DCC2] rounded-[16px] p-4 sm:p-5 md:p-8 flex flex-col items-center text-center shadow-sm">
              <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 md:mb-4 border border-[#D4AF37]">
                <Image
                  src="https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-448068.jpg"
                  alt="Kabir and Meera"
                  fill
                  sizes="(max-width: 768px) 56px, 80px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-1 mb-3 md:mb-4 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] text-[13px] md:text-[14px] leading-[1.7] md:leading-[1.8] italic mb-4 md:mb-6">
                "We had our pre-wedding shoot in Jaisalmer and wedding in Jaipur. The team's cinematic visual storytelling is outstanding. They knew exactly how to make us feel relaxed, resulting in beautiful, organic memories. High-class service!"
              </p>
              <h4 className="font-serif text-[16px] md:text-[18px] font-semibold text-[#222222]">Kabir & Meera</h4>
              <span className="text-[10px] md:text-[11px] text-[#D4AF37] uppercase tracking-[0.5px] md:tracking-[1px] mt-1 font-sans">Married in Jaipur</span>
            </div>

            {/* Review 3 */}
            <div className="bg-white border border-[#E8DCC2] rounded-[16px] p-4 sm:p-5 md:p-8 flex flex-col items-center text-center shadow-sm">
              <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 md:mb-4 border border-[#D4AF37]">
                <Image
                  src="https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445808.jpg"
                  alt="Rohit and Anjali"
                  fill
                  sizes="(max-width: 768px) 56px, 80px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-1 mb-3 md:mb-4 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] text-[13px] md:text-[14px] leading-[1.7] md:leading-[1.8] italic mb-4 md:mb-6">
                "They don't just take pictures; they truly capture realistic emotions. Our family members are still praising their professional conduct and behavior during the event. The photos are absolute masterpieces of editorial art."
              </p>
              <h4 className="font-serif text-[16px] md:text-[18px] font-semibold text-[#222222]">Rohit & Anjali</h4>
              <span className="text-[10px] md:text-[11px] text-[#D4AF37] uppercase tracking-[0.5px] md:tracking-[1px] mt-1 font-sans">Married in Delhi</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION (BOOKING FORM) */}
      <section id="booking" className="bg-white border-t border-[#E8DCC2] py-8 md:py-20 px-4 sm:px-6 md:px-12 xl:px-24">
        <div className="max-w-[800px] mx-auto flex flex-col items-center">
          <div className="font-script text-[22px] md:text-[36px] text-[#D4AF37] mb-1">Get In Touch</div>
          <h2 className="font-serif text-[22px] sm:text-[34px] md:text-[42px] text-[#222222] font-normal tracking-tight text-center mb-3 md:mb-6">
            Let's Create Magic Together
          </h2>
          <p className="text-[#666666] text-[13px] md:text-[15px] text-center mb-6 md:mb-12 max-w-[500px] px-2 sm:px-0">
            Please share details of your event below. We will reach out to discuss how we can turn your real wedding into a timeless visual romance.
          </p>

          {formSubmitted ? (
            <div className="w-full bg-[#F7F5F2] border-2 border-[#D4AF37] rounded-[16px] p-6 md:p-12 text-center shadow-sm">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-[#D4AF37] mx-auto mb-3 md:mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="font-serif text-[20px] md:text-[24px] text-[#222222] mb-1 md:mb-2">Inquiry Received Successfully!</h3>
              <p className="text-[#666666] text-[13px] md:text-[14px]">
                Thank you for contacting Om Photography. We will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="w-full bg-[#F7F5F2] border border-[#E8DCC2] rounded-[16px] p-4 sm:p-6 md:p-8 xl:p-12 shadow-sm space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-[11px] md:text-[12px] uppercase font-semibold text-[#666666] tracking-[1px] mb-1.5 md:mb-2 font-sans">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full h-[46px] md:h-[50px] bg-white border border-[#E8DCC2] rounded-[8px] px-4 text-[13px] md:text-[14px] text-[#222222] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
                {/* Phone */}
                <div className="flex flex-col">
                  <label className="text-[11px] md:text-[12px] uppercase font-semibold text-[#666666] tracking-[1px] mb-1.5 md:mb-2 font-sans">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full h-[46px] md:h-[50px] bg-white border border-[#E8DCC2] rounded-[8px] px-4 text-[13px] md:text-[14px] text-[#222222] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Event Date */}
                <div className="flex flex-col">
                  <label className="text-[11px] md:text-[12px] uppercase font-semibold text-[#666666] tracking-[1px] mb-1.5 md:mb-2 font-sans">Event Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full h-[46px] md:h-[50px] bg-white border border-[#E8DCC2] rounded-[8px] px-4 text-[13px] md:text-[14px] text-[#222222] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
                {/* Event Location */}
                <div className="flex flex-col">
                  <label className="text-[11px] md:text-[12px] uppercase font-semibold text-[#666666] tracking-[1px] mb-1.5 md:mb-2 font-sans">Event Location (City)</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Udaipur, Rajasthan"
                    className="w-full h-[46px] md:h-[50px] bg-white border border-[#E8DCC2] rounded-[8px] px-4 text-[13px] md:text-[14px] text-[#222222] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              {/* Message Box */}
              <div className="flex flex-col">
                <label className="text-[11px] md:text-[12px] uppercase font-semibold text-[#666666] tracking-[1px] mb-1.5 md:mb-2 font-sans">Event Details / Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your wedding ceremonies, style preferences, and visual requests..."
                  className="w-full bg-white border border-[#E8DCC2] rounded-[8px] p-4 text-[13px] md:text-[14px] text-[#222222] focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[48px] md:h-[54px] bg-[#E0B44C] rounded-[8px] flex items-center justify-center gap-2 text-[#222222] font-semibold text-[15px] md:text-[16px] shadow-sm hover:bg-[#D4AF37] hover:shadow-md transition-all duration-300"
              >
                <svg className="w-4.5 h-4.5 md:w-5 md:h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>SEND BOOKING INQUIRY</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section id="faq" className="relative bg-[#FDFAF5] py-10 md:py-20 px-4 md:px-6 overflow-hidden">
        {/* Subtle warm dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]"
          style={{ backgroundImage: 'radial-gradient(circle, #D4AF3720 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        {/* Gold top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="max-w-[900px] mx-auto relative z-10">

          {/* Section header */}
          <div className="text-center mb-8 md:mb-14">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="w-8 md:w-10 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[10px] md:text-[11px] font-sans font-semibold tracking-[2px] md:tracking-[4px] uppercase">Got Questions?</span>
              <span className="w-8 md:w-10 h-[1px] bg-[#D4AF37]" />
            </div>
            <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[48px] font-bold text-[#1A1A1A] leading-tight">
              Frequently Asked <span className="text-[#D4AF37] italic">Questions</span>
            </h2>
            <p className="text-[#777777] text-[13.5px] md:text-[15px] mt-3 md:mt-4 max-w-[520px] mx-auto leading-relaxed font-sans px-2">
              Everything you need to know before booking your special day with us.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-2 md:space-y-3">
            {[
              {
                q: "How far in advance should I book?",
                a: "We recommend booking at least 6–12 months in advance for weddings, especially for peak season dates (November–March). For pre-wedding shoots, 2–3 months notice is usually sufficient. Popular dates fill up quickly, so early booking is always advisable."
              },
              {
                q: "What is included in your wedding photography packages?",
                a: "Our packages typically include a dedicated lead photographer, a second shooter for full-day coverage, professionally edited high-resolution images delivered via a private online gallery, print-quality files with full personal usage rights, and a beautiful USB keepsake drive. Premium packages also include a photobook and same-day highlight reel."
              },
              {
                q: "How long does it take to receive our photos?",
                a: "Edited wedding photos are delivered within 4–6 weeks after the event. For pre-wedding shoots, delivery is usually within 2–3 weeks. Rush delivery options are available for an additional fee. We ensure every image is colour-graded, retouched, and ready for print."
              },
              {
                q: "Do you travel for destination weddings?",
                a: "Absolutely! We love destination weddings. We have shot across Rajasthan, Goa, Kerala, and even internationally in Dubai and Bali. Travel and accommodation costs are billed separately and transparently — we provide a full breakdown before you confirm."
              },
              {
                q: "Can we customise our package?",
                a: "Yes — every couple is unique and we love tailoring our services to match your vision and budget. We can add or remove coverage hours, upgrade to cinematic film, include drone footage, or bundle albums and prints. Just reach out and we'll build your perfect package."
              },
              {
                q: "What happens if there is bad weather on our wedding day?",
                a: "We've shot in monsoon rains, scorching heat, and everything in between — and the results were always stunning. We come fully prepared with weather-sealed equipment and creative lighting solutions. Rain often makes for the most magical, dramatic photos!"
              },
              {
                q: "Do you offer videography as well?",
                a: "Yes! Our in-house cinematography team creates beautiful cinematic wedding films — from emotional highlights (5–10 min) to full feature-length films (60–90 min). Our photo and video teams work seamlessly together so nothing is missed and no moments are disturbed."
              }
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 md:mt-14 text-center">
            <p className="text-[#888888] text-[13px] md:text-[14px] font-sans mb-4 md:mb-5">Still have questions? We&apos;d love to hear from you.</p>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#111111] font-semibold text-[12px] md:text-[13px] tracking-[1.5px] md:tracking-[2px] uppercase px-5 py-3 md:px-8 md:py-3.5 rounded-[6px] hover:bg-[#E0C050] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.25)]"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ask Us Directly
            </a>
          </div>
        </div>
      </section>

      {/* 9. FOOTER (Bottom Section) */}
      <footer className="bg-[#0D0D0D] relative flex-shrink-0" style={{ fontSize: '13px' }}>

        {/* TOP SERVICE STRIP - Warm Ivory Light Theme */}
        <div className="bg-[#FEFCF8] border-t border-[#E8DCC2] border-b border-[#E8DCC2] py-2.5 md:py-5 px-4 md:px-8 xl:px-16 text-[#222222] relative z-10">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 lg:divide-x divide-[#E8DCC2]">

            {/* Service 1 */}
            <div className="flex items-center gap-2.5 md:gap-3 px-2 md:px-4 py-2 md:py-3 lg:py-0 first:pl-0 last:pr-0">
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full border border-[#D4AF37] bg-white flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[11px] md:text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Wedding Photography</h4>
                <p className="text-[#666666] text-[10px] md:text-[11px] mt-0.5 leading-tight font-sans">Capturing real emotions and beautiful moments</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex items-center gap-2.5 md:gap-3 px-2 md:px-4 py-2 md:py-3 lg:py-0">
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full border border-[#D4AF37] bg-white flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[11px] md:text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Cinematography</h4>
                <p className="text-[#666666] text-[10px] md:text-[11px] mt-0.5 leading-tight font-sans">Cinematic films that tell your story</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex items-center gap-2.5 md:gap-3 px-2 md:px-4 py-2 md:py-3 lg:py-0">
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full border border-[#D4AF37] bg-white flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[11px] md:text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Pre Wedding Shoots</h4>
                <p className="text-[#666666] text-[10px] md:text-[11px] mt-0.5 leading-tight font-sans">Romantic. Natural. Timeless.</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex items-center gap-2.5 md:gap-3 px-2 md:px-4 py-2 md:py-3 lg:py-0">
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full border border-[#D4AF37] bg-white flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[11px] md:text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Portrait Photography</h4>
                <p className="text-[#666666] text-[10px] md:text-[11px] mt-0.5 leading-tight font-sans">Your story. Your look. Our creativity.</p>
              </div>
            </div>

            {/* Service 5 */}
            <div className="flex items-center gap-2.5 md:gap-3 px-2 md:px-4 py-2 md:py-3 lg:py-0 last:pr-0">
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full border border-[#D4AF37] bg-white flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[11px] md:text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Destination Weddings</h4>
                <p className="text-[#666666] text-[10px] md:text-[11px] mt-0.5 leading-tight font-sans">Beautiful weddings in breathtaking destinations</p>
              </div>
            </div>

          </div>
        </div>

        {/* MAIN FOOTER CONTENT */}
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 py-6 md:py-8 px-6 md:px-8 xl:px-16 relative z-10">

          {/* Logo Column - 3 cols */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            <div className="flex flex-col items-start leading-none select-none mb-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-[28px] md:text-[34px] font-bold text-[#D4AF37] tracking-wider leading-none">OM</span>
                <svg className="w-7 h-6 md:w-8 md:h-7 text-[#D4AF37] stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <span className="font-sans text-[8.5px] md:text-[10px] font-medium text-[#D4AF37] tracking-[0.45em] mt-1">PHOTOGRAPHY</span>
            </div>
            <p className="text-white/50 text-[12px] md:text-[13px] leading-[1.65] max-w-[280px]">
              Capturing your lifetime memories realistically with modern editorial elegance and cinematic storytelling.
            </p>
          </div>

          {/* EXPLORE COLUMN */}
          <div className="hidden md:flex lg:col-span-2 flex-col">
            <h3 className="font-serif text-[13px] text-white/90 font-bold tracking-[1.5px] uppercase mb-4">EXPLORE</h3>
            <ul className="space-y-2 font-sans text-[12px] text-white/50">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Our Works</a></li>
              <li><a href="#testimonials" className="hover:text-[#D4AF37] transition-colors">Testimonials</a></li>
              <li><a href="#blog" className="hover:text-[#D4AF37] transition-colors">Blog</a></li>
              <li><a href="#booking" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* GALLERIES COLUMN */}
          <div className="hidden md:flex lg:col-span-2 flex-col">
            <h3 className="font-serif text-[13px] text-white/90 font-bold tracking-[1.5px] uppercase mb-4">GALLERIES</h3>
            <ul className="space-y-2 font-sans text-[12px] text-white/50">
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Weddings</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Pre Weddings</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Portraits</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Cinematic Films</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Events</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Behind The Scenes</a></li>
            </ul>
          </div>

          {/* INFORMATION COLUMN */}
          <div className="hidden md:flex lg:col-span-2 flex-col">
            <h3 className="font-serif text-[13px] text-white/90 font-bold tracking-[1.5px] uppercase mb-4">INFORMATION</h3>
            <ul className="space-y-2 font-sans text-[12px] text-white/50">
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Pricing & Packages</a></li>
              <li><a href="#booking" className="hover:text-[#D4AF37] transition-colors">Booking Process</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Client Guide</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* CONTACT & CTA COLUMN - 3 cols */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col items-start w-full mt-4 md:mt-0">
            <h3
              className="font-script text-[#D4AF37] leading-snug mb-3 whitespace-nowrap"
              style={{ fontSize: 'clamp(16px, 1.4vw, 22px)' }}
            >
              Let&apos;s Create Magic Together!
            </h3>

            <ul className="space-y-2 text-[11.5px] md:text-[12px] text-white/50 mb-4 font-sans flex flex-col items-start">
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>hello@omphotography.com</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="leading-tight">Based in India | Available Worldwide</span>
              </li>
            </ul>

            <a href="#booking" className="w-full max-w-[280px] h-[36px] md:h-[38px] border border-[#D4AF37] rounded-[5px] flex items-center justify-center gap-2 text-[#D4AF37] font-semibold text-[10px] md:text-[11px] tracking-[1.5px] uppercase bg-transparent hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-300">
              <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>CHECK AVAILABILITY</span>
            </a>
          </div>

        </div>

        {/* BACKGROUND DECORATION (Subtle faded silhouette on the far right) */}
        <div className="absolute right-0 bottom-0 top-0 w-[350px] md:w-[450px] pointer-events-none z-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=600&q=80"
            alt=""
            className="w-full h-full object-cover object-right grayscale opacity-[0.03] mix-blend-screen invert"
          />
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/[0.08] py-4 px-6 md:px-8 xl:px-16 bg-[#090909] relative z-10">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-bold text-white/40 tracking-[2px] uppercase flex items-center gap-2">
                FOLLOW US <span className="w-6 h-[1px] bg-[#D4AF37] inline-block"></span>
              </span>
              {/* Instagram */}
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/80 hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/80 hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/80 hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
                </svg>
              </a>
              {/* Pinterest */}
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/80 hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 22a9 9 0 0 1-5.18-16.36 9 9 0 0 1 14.82 4.96C17.64 16 14 22 8 22z" />
                  <circle cx="8" cy="10" r="3" />
                </svg>
              </a>
            </div>

            {/* Quotation */}
            <div className="flex flex-col items-center text-center md:items-end md:text-right max-w-[360px]">
              <div className="flex gap-1.5 text-[#D4AF37] select-none text-[18px] font-serif leading-none mb-0.5 justify-center md:justify-end">“</div>
              <p className="font-serif italic text-[12px] text-white/40 leading-relaxed">
                A photograph is the pause button of life&apos;s most beautiful moments.
              </p>
              <div className="flex gap-1.5 text-[#D4AF37] select-none text-[18px] font-serif leading-none mt-0.5 justify-center md:justify-end">”</div>
            </div>

          </div>
        </div>

      </footer>

      {/* ─── FLOATING CONTACT US BUTTON ──────────────────────────────────────── */}
      <div className="fixed bottom-6 left-6 z-[80]">
        <button
          onClick={() => setContactModalOpen(true)}
          className="relative group flex items-center gap-0 hover:gap-2.5 w-14 hover:w-auto h-14 px-4 rounded-full bg-[#D4AF37] text-[#111111] shadow-[0_8px_28px_rgba(212,175,55,0.45)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.6)] hover:bg-[#C9A227] active:scale-95 transition-all duration-300 overflow-hidden"
          aria-label="Open contact hub"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-[#D4AF37]/35 animate-ping pointer-events-none" />

          {/* Contact / headset icon */}
          <svg className="w-6 h-6 shrink-0 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {/* Expandable label */}
          <span className="font-bold text-[12px] tracking-[1.5px] uppercase whitespace-nowrap max-w-0 group-hover:max-w-[120px] overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
            Contact Us
          </span>
        </button>
      </div>

      {/* POPUP MODAL / LOCALIZED POPOVER */}
      {contactModalOpen && (
        <>
          {/* Backdrop — full-screen, dismisses on click */}
          <div
            onClick={() => setContactModalOpen(false)}
            className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-md"
          />

          {/* Centering wrapper */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-5 pointer-events-none">

          {/* Contact Card */}
          <div
            className="w-full max-w-[440px] bg-[#0E0E0E] border border-[#D4AF37]/35 rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-300 ease-out transform pointer-events-auto scale-100 opacity-100"
          >
            {/* Header section with cover gradient */}
            <div className="bg-gradient-to-r from-[#171717] to-[#0A0A0A] p-4.5 border-b border-white/[0.08] relative">
              {/* Close button */}
              <button
                onClick={() => setContactModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 active:scale-95 transition-all duration-200"
                aria-label="Close contact card"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Brand Logo inside contact card */}
              <div className="flex flex-col items-start leading-none select-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-[24px] font-bold text-[#D4AF37] tracking-wider leading-none">OM</span>
                  <svg className="w-6 h-4.5 text-[#D4AF37] stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <span className="font-sans text-[7.5px] font-medium text-[#D4AF37] tracking-[0.45em] mt-0.5">PHOTOGRAPHY</span>
              </div>
              <p className="text-[#D4AF37]/75 font-serif italic text-[12px] mt-2">
                Let&apos;s turn your dream moments into timeless visual art.
              </p>
            </div>

            {/* Body content */}
            <div className="p-5 space-y-4">
              {/* Quick Primary Actions */}
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp instant chat */}
                <a
                  href="https://wa.me/911234567890?text=Hi%20Om%20Photography,%20I'd%20like%20to%20inquire%20about%20your%20services!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-[10px] bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all duration-300 text-center group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.11-2.884-6.974-1.862-1.865-4.337-2.893-6.979-2.895-5.438 0-9.866 4.42-9.869 9.866-.001 1.765.485 3.491 1.408 4.98l-.323 1.182.164.159c.775-.758 1.621-1.584 2.158-1.921zm10.594-5.28c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    </svg>
                  </div>
                  <span className="font-bold text-[12px] text-white tracking-wide">WhatsApp Us</span>
                  <span className="text-[9.5px] text-white/40 mt-0.5">Instant chat reply</span>
                </a>

                {/* Direct call */}
                <a
                  href="tel:+911234567890"
                  className="flex flex-col items-center justify-center p-3 rounded-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 transition-all duration-300 text-center group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#0E0E0E] flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span className="font-bold text-[12px] text-white tracking-wide">Call Direct</span>
                  <span className="text-[9.5px] text-white/40 mt-0.5">+91 12345 67890</span>
                </a>
              </div>

              {/* Email card */}
              <a
                href="mailto:hello@omphotography.com"
                className="flex items-center gap-3 p-3 rounded-[10px] bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-[11.5px] font-bold text-white/90 font-sans uppercase tracking-wider">Email Address</h4>
                  <p className="text-[11px] text-white/50 mt-0.5">hello@omphotography.com</p>
                </div>
                <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* Reach Us / Location Map link */}
              <a
                href="https://maps.google.com/?q=Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-[10px] bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-[11.5px] font-bold text-white/90 font-sans uppercase tracking-wider">Reach Our Studio</h4>
                  <p className="text-[11px] text-white/50 mt-0.5 leading-snug">102, Royal Lotus Plaza, MG Road, Mumbai, India</p>
                </div>
                <span className="text-[7px] font-bold tracking-wider text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2 py-0.5 rounded-[4px] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-[#0E0E0E] transition-all duration-200 shrink-0">MAPS</span>
              </a>

              {/* Social Hub Grid */}
              <div>
                <h4 className="text-[9.5px] font-bold text-white/40 tracking-[2px] uppercase mb-2.5 text-left">Connect Socially</h4>
                <div className="grid grid-cols-4 gap-2">
                  {/* Instagram */}
                  <a href="#" className="flex flex-col items-center justify-center p-2 rounded-[8px] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/45 hover:bg-white/[0.04] transition-all duration-200 text-center group">
                    <svg className="w-[18px] h-[18px] text-white/60 group-hover:text-[#D4AF37] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-[8.5px] text-white/50 mt-1 font-medium group-hover:text-white transition-colors">Insta</span>
                  </a>
                  {/* Facebook */}
                  <a href="#" className="flex flex-col items-center justify-center p-2 rounded-[8px] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/45 hover:bg-white/[0.04] transition-all duration-200 text-center group">
                    <svg className="w-[18px] h-[18px] text-white/60 group-hover:text-[#D4AF37] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-[8.5px] text-white/50 mt-1 font-medium group-hover:text-white transition-colors">Facebook</span>
                  </a>
                  {/* YouTube */}
                  <a href="#" className="flex flex-col items-center justify-center p-2 rounded-[8px] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/45 hover:bg-white/[0.04] transition-all duration-200 text-center group">
                    <svg className="w-[18px] h-[18px] text-white/60 group-hover:text-[#D4AF37] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="text-[8.5px] text-white/50 mt-1 font-medium group-hover:text-white transition-colors">YouTube</span>
                  </a>
                  {/* Pinterest */}
                  <a href="#" className="flex flex-col items-center justify-center p-2 rounded-[8px] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/45 hover:bg-white/[0.04] transition-all duration-200 text-center group">
                    <svg className="w-[18px] h-[18px] text-white/60 group-hover:text-[#D4AF37] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-[8.5px] text-white/50 mt-1 font-medium group-hover:text-white transition-colors">Pinterest</span>
                  </a>
                </div>
              </div>

              {/* Timings & Availability */}
              <div className="bg-white/[0.01] border border-white/[0.06] rounded-[10px] p-3">
                <div className="flex items-center justify-between text-[10.5px] text-white/40 mb-1.5">
                  <span className="font-semibold uppercase tracking-wider">Studio Hours:</span>
                  <span className="font-medium text-white/80">10:00 AM – 8:00 PM (IST)</span>
                </div>
                <div className="flex items-center justify-between text-[10.5px] text-white/40">
                  <span className="font-semibold uppercase tracking-wider">Response Time:</span>
                  <span className="font-bold text-[#25D366]">Under 1 Hour</span>
                </div>
              </div>

            </div>{/* end body */}

            {/* Card Footer */}
            <div className="bg-black/80 px-5 py-3 border-t border-white/[0.06] text-center">
              <span className="text-[9.5px] tracking-[2px] font-bold text-[#D4AF37] uppercase">OM PHOTOGRAPHY</span>
              <span className="text-[8.5px] text-white/40 block mt-0.5">© 2026. All Rights Reserved.</span>
            </div>

          </div>{/* end card */}
          </div>{/* end centering wrapper */}
        </>
      )}

    </div>
  );
}
