"use client";

import { useState, useEffect } from "react";
import Image from "next/image";


// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`group border rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 ${
        open
          ? "border-[#D4AF37]/50 bg-white shadow-[0_8px_32px_rgba(212,175,55,0.12)]"
          : "border-[#E8DCC2] bg-[#FEFCF8] hover:border-[#D4AF37]/40 hover:shadow-[0_4px_20px_rgba(212,175,55,0.08)]"
      }`}
      onClick={() => setOpen((o) => !o)}
    >
      {/* Question row */}
      <div className="flex items-center justify-between px-6 py-5 select-none">
        <div className="flex items-center gap-4">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[12px] font-bold font-serif transition-all duration-300 ${
              open ? "bg-[#D4AF37] text-white" : "bg-[#F5EDD8] text-[#D4AF37]"
            }`}
          >
            Q
          </span>
          <span className={`font-serif text-[16px] leading-snug transition-colors duration-300 ${open ? "text-[#C9A227]" : "text-[#222222] group-hover:text-[#C9A227]"}`}>
            {question}
          </span>
        </div>
        {/* Plus / Minus icon */}
        <div className={`w-7 h-7 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
          open ? "border-[#D4AF37] bg-[#D4AF37]/10 rotate-45" : "border-[#DDD0B3] group-hover:border-[#D4AF37]/60"
        }`}>
          <svg className={`w-3.5 h-3.5 transition-colors duration-300 ${open ? "text-[#D4AF37]" : "text-[#AAAAAA]"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
        <div className="px-6 pb-6 pl-[4.25rem]">
          <div className="w-full h-[1px] bg-[#E8DCC2] mb-4" />
          <p className="text-[#555555] text-[14px] leading-[1.85] font-sans">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 h-[70px] w-full px-12 flex items-center justify-between z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FEFCF8]/90 backdrop-blur-xl border-b border-[#D4AF37]/30 shadow-[0_4px_30px_rgba(212,175,55,0.12)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* LOGO */}
        <div className="flex flex-col items-start leading-none select-none">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-[28px] font-bold text-[#D4AF37] tracking-wider">OM</span>
            {/* Stylized camera outline */}
            <svg className="w-8 h-6 text-[#D4AF37] stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" strokeLinejoin="round" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
          <span className="font-sans text-[7.5px] font-medium text-[#D4AF37] tracking-[0.45em] mt-0.5">PHOTOGRAPHY</span>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold tracking-wide font-sans">
          <a href="#" className={`transition-colors ${scrolled ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}`}>Home</a>
          <a href="#about" className={`transition-colors ${scrolled ? 'text-[#555555] hover:text-[#D4AF37]' : 'text-[#555555] hover:text-[#D4AF37]'}`}>About</a>
          <a href="#portfolio" className={`transition-colors ${scrolled ? 'text-[#555555] hover:text-[#D4AF37]' : 'text-[#555555] hover:text-[#D4AF37]'}`}>Portfolio</a>
          <a href="#services" className={`transition-colors ${scrolled ? 'text-[#555555] hover:text-[#D4AF37]' : 'text-[#555555] hover:text-[#D4AF37]'}`}>Services</a>
          <a href="#booking" className={`transition-colors ${scrolled ? 'text-[#555555] hover:text-[#D4AF37]' : 'text-[#555555] hover:text-[#D4AF37]'}`}>Contact</a>
        </nav>

        {/* BOOK NOW BUTTON */}
        <a href="#booking" className="w-[160px] h-[46px] bg-[#E0B44C] rounded-[8px] flex items-center justify-center gap-2 text-[#222222] font-semibold text-[15px] shadow-sm hover:bg-[#D4AF37] hover:shadow-md transition-all duration-300">
          <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>BOOK NOW</span>
        </a>
      </header>

      {/* 2. HERO SECTION / BANNER */}
      <section className="h-screen pt-[70px] flex flex-col justify-between px-12 py-3 max-w-[1920px] mx-auto w-full">
        {/* Two columns section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 min-h-0 py-2">
          {/* Left Column (42%) */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center pr-4">
            {/* Top Label with decorative gold lines */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center">
                <span className="w-6 h-[1px] bg-[#D4AF37]"></span>
                <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] -ml-1"></span>
              </div>
              <span className="text-[10px] xl:text-[11px] uppercase tracking-[3px] font-semibold text-[#666666] font-sans">
                Premium Wedding Photography & Cinematography
              </span>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37] -mr-1"></span>
                <span className="w-6 h-[1px] bg-[#D4AF37]"></span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-[44px] xl:text-[54px] leading-[1.12] text-[#222222] font-normal tracking-tight">
              Capturing Your<br />
              Lifetime Memories
            </h1>
            {/* Script word "Realistically" */}
            <div className="font-script text-[64px] xl:text-[76px] text-[#D4AF37] leading-none mt-2 pl-3 select-none transform -rotate-1 origin-left z-10">
              Realistically
            </div>

            {/* Description */}
            <p className="text-[#666666] text-[14px] xl:text-[16px] font-normal leading-[1.6] max-w-[460px] mt-4 font-sans">
              We don't just click pictures, we capture emotions, moments and stories you'll cherish forever.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mt-6">
              {/* Button 1 */}
              <a href="#portfolio" className="w-[200px] h-[50px] bg-[#E0B44C] rounded-[8px] flex items-center justify-center gap-2 text-[#222222] font-semibold text-[14px] xl:text-[15px] hover:bg-[#D4AF37] hover:shadow-md transition-all duration-300">
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span>VIEW OUR WORK</span>
              </a>

              {/* Button 2 */}
              <a href="#booking" className="w-[190px] h-[50px] border-2 border-[#D4AF37] rounded-[8px] flex items-center justify-center gap-2 text-[#222222] font-semibold text-[14px] xl:text-[15px] hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
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

          {/* Right Column (58%) - Large wedding portrait image */}
          <div className="lg:col-span-7 relative w-full h-full max-h-[380px] xl:max-h-[460px] flex items-center justify-end">
            <div className="relative w-full h-full rounded-[16px] overflow-hidden shadow-sm">
              <Image
                src="/main_hero.png"
                alt="Premium wedding photography portrait of an Indian couple"
                fill
                priority
                className="object-cover"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 15%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%)'
                }}
              />

              {/* FLOATING STAT CARD */}
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md border border-[#E8DCC2] rounded-[10px] p-3 flex flex-col items-center justify-center shadow-md text-center w-[140px] z-20">
                <div className="relative flex items-center justify-center w-16 h-16 mb-0.5">
                  {/* Laurel Wreath */}
                  <svg className="absolute w-16 h-16 text-[#D4AF37]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M 32 72 A 22 22 0 0 1 32 28" strokeLinecap="round" />
                    <path d="M 68 72 A 22 22 0 0 0 68 28" strokeLinecap="round" />
                    <path d="M 28 63 Q 22 58 25 53 Q 29 55 29 61" fill="currentColor" />
                    <path d="M 25 50 Q 19 47 21 42 Q 26 44 26 49" fill="currentColor" />
                    <path d="M 26 37 Q 21 33 23 28 Q 28 30 27 35" fill="currentColor" />
                    <path d="M 30 26 Q 26 21 30 16 Q 34 20 32 25" fill="currentColor" />
                    <path d="M 72 63 Q 78 58 75 53 Q 71 55 71 61" fill="currentColor" />
                    <path d="M 75 50 Q 81 47 79 42 Q 74 44 74 49" fill="currentColor" />
                    <path d="M 74 37 Q 79 33 77 28 Q 72 30 73 35" fill="currentColor" />
                    <path d="M 70 26 Q 74 21 70 16 Q 66 20 68 25" fill="currentColor" />
                  </svg>
                  <span className="text-[18px] font-bold text-[#D4AF37] font-sans z-10">100+</span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.15em] text-[#222222] font-sans">WEDDINGS</span>
                <span className="text-[8px] font-medium tracking-[0.1em] text-[#666666] font-sans uppercase">Captured</span>
                <div className="w-8 h-[1px] bg-[#E8DCC2] my-1" />
                <span className="text-[8px] font-bold tracking-[0.12em] text-[#D4AF37] font-sans uppercase">Memories For Life</span>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE CAROUSEL CONTAINER (Height: 140px) */}
        <div className="relative w-full bg-white border border-[#D4AF37]/50 rounded-[12px] p-2.5 h-[140px] flex items-center justify-between flex-shrink-0">
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
        <div className="grid grid-cols-4 gap-4 py-3 border-t border-[#E8DCC2] mt-3 flex-shrink-0 w-full">
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
      <section id="about" className="bg-white border-t border-[#E8DCC2] py-20 px-12 xl:px-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Professional Photo */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-[16px] translate-x-4 translate-y-4 pointer-events-none z-0"></div>
            <div className="relative rounded-[16px] overflow-hidden aspect-[3/4] shadow-lg bg-gray-100 z-10">
              <Image 
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80" 
                alt="Om - Lead Photographer" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>

          {/* Right Side: Introduction text */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="font-script text-[36px] text-[#D4AF37] mb-2 select-none">
              Our Philosophy
            </div>
            <h2 className="font-serif text-[42px] text-[#222222] font-normal leading-tight tracking-tight mb-6">
              Capturing Love in Its Purest, Most Authentic Form
            </h2>
            <p className="text-[#666666] text-[16px] leading-[1.8] font-sans mb-6">
              Hi, I am Om, the lead photographer and founder of Om Photography. With over a decade of capturing premium luxury weddings across India and worldwide, our vision is simple: <strong>to capture your lifetime memories realistically.</strong>
            </p>
            <p className="text-[#666666] text-[16px] leading-[1.8] font-sans mb-8">
              We specialize in candid emotions, dramatic lighting, and cinematic story-telling. We believe that a wedding isn't just an event; it's a legacy of emotions, laughter, and tears that you will pass down for generations. Our team operates with micro-precision, ensuring that every fleeting moment is immortalized with editorial elegance.
            </p>
            <div className="grid grid-cols-3 gap-6 w-full pt-6 border-t border-[#E8DCC2]">
              <div>
                <div className="text-[28px] font-serif font-bold text-[#D4AF37]">10+</div>
                <div className="text-[12px] uppercase tracking-[1px] text-[#666666] mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-[28px] font-serif font-bold text-[#D4AF37]">350+</div>
                <div className="text-[12px] uppercase tracking-[1px] text-[#666666] mt-1">Weddings Shot</div>
              </div>
              <div>
                <div className="text-[28px] font-serif font-bold text-[#D4AF37]">100%</div>
                <div className="text-[12px] uppercase tracking-[1px] text-[#666666] mt-1">Happy Clients</div>
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
      <section id="services" className="bg-white border-t border-[#E8DCC2] py-20 px-12 xl:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <div className="font-script text-[36px] text-[#D4AF37] mb-2">Our Services</div>
          <h2 className="font-serif text-[42px] text-[#222222] font-normal tracking-tight text-center mb-16">
            What We Specialize In
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {/* Service 1 */}
            <div className="bg-[#F7F5F2] border border-[#E8DCC2] rounded-[16px] p-8 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-white border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6">
                <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] text-[#222222] font-normal mb-3">Candid Photography</h3>
              <p className="text-[#666666] text-[14px] leading-[1.6]">
                Capturing natural, unscripted emotions, stolen glances, and real laughter as it happens without forcing poses.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-[#F7F5F2] border border-[#E8DCC2] rounded-[16px] p-8 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-white border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6">
                <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] text-[#222222] font-normal mb-3">Cinematic Films</h3>
              <p className="text-[#666666] text-[14px] leading-[1.6]">
                Creating bespoke cinematic wedding highlights, teasers, and documentary-style films of your royal celebrations.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-[#F7F5F2] border border-[#E8DCC2] rounded-[16px] p-8 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-white border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6">
                <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] text-[#222222] font-normal mb-3">Drone Shoots</h3>
              <p className="text-[#666666] text-[14px] leading-[1.6]">
                Grand aerial cinematography capturing the scale, majesty, and breath-taking architecture of your wedding destination.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-[#F7F5F2] border border-[#E8DCC2] rounded-[16px] p-8 flex flex-col items-start hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full bg-white border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6">
                <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5V4.5z" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] text-[#222222] font-normal mb-3">Premium Albums</h3>
              <p className="text-[#666666] text-[14px] leading-[1.6]">
                Handcrafted leather albums with gold gilded edges and flush mount pages, custom-designed to tell your unique love story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS / CLIENT REVIEWS */}
      <section className="bg-[#F7F5F2] border-t border-[#E8DCC2] py-20 px-12 xl:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <div className="font-script text-[36px] text-[#D4AF37] mb-2">Testimonials</div>
          <h2 className="font-serif text-[42px] text-[#222222] font-normal tracking-tight text-center mb-16">
            Words From Our Beautiful Couples
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {/* Review 1 */}
            <div className="bg-white border border-[#E8DCC2] rounded-[16px] p-8 flex flex-col items-center text-center shadow-sm">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border border-[#D4AF37]">
                <Image
                  src="https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445804.jpg"
                  alt="Aarav and Diya"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-1 mb-4 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] text-[14px] leading-[1.8] italic mb-6">
                "Om Photography ne hamari shaadi ko sach me yaadgaar bana diya! The team was so friendly and professional, they captured emotional candids and details that we didn't even notice. We absolutely love our wedding film and album!"
              </p>
              <h4 className="font-serif text-[18px] font-semibold text-[#222222]">Aarav & Diya</h4>
              <span className="text-[11px] text-[#D4AF37] uppercase tracking-[1px] mt-1 font-sans">Married in Udaipur</span>
            </div>

            {/* Review 2 */}
            <div className="bg-white border border-[#E8DCC2] rounded-[16px] p-8 flex flex-col items-center text-center shadow-sm">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border border-[#D4AF37]">
                <Image
                  src="https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-448068.jpg"
                  alt="Kabir and Meera"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-1 mb-4 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] text-[14px] leading-[1.8] italic mb-6">
                "We had our pre-wedding shoot in Jaisalmer and wedding in Jaipur. The team's cinematic visual storytelling is outstanding. They knew exactly how to make us feel relaxed, resulting in beautiful, organic memories. High-class service!"
              </p>
              <h4 className="font-serif text-[18px] font-semibold text-[#222222]">Kabir & Meera</h4>
              <span className="text-[11px] text-[#D4AF37] uppercase tracking-[1px] mt-1 font-sans">Married in Jaipur</span>
            </div>

            {/* Review 3 */}
            <div className="bg-white border border-[#E8DCC2] rounded-[16px] p-8 flex flex-col items-center text-center shadow-sm">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border border-[#D4AF37]">
                <Image
                  src="https://wezoree.com/upload/user_photos/21481/preview-photographers-sai-photo-wedding--portfolio-photo-445808.jpg"
                  alt="Rohit and Anjali"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-1 mb-4 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] text-[14px] leading-[1.8] italic mb-6">
                "They don't just take pictures; they truly capture realistic emotions. Our family members are still praising their professional conduct and behavior during the event. The photos are absolute masterpieces of editorial art."
              </p>
              <h4 className="font-serif text-[18px] font-semibold text-[#222222]">Rohit & Anjali</h4>
              <span className="text-[11px] text-[#D4AF37] uppercase tracking-[1px] mt-1 font-sans">Married in Delhi</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION (BOOKING FORM) */}
      <section id="booking" className="bg-white border-t border-[#E8DCC2] py-20 px-12 xl:px-24">
        <div className="max-w-[800px] mx-auto flex flex-col items-center">
          <div className="font-script text-[36px] text-[#D4AF37] mb-2">Get In Touch</div>
          <h2 className="font-serif text-[42px] text-[#222222] font-normal tracking-tight text-center mb-6">
            Let's Create Magic Together
          </h2>
          <p className="text-[#666666] text-[15px] text-center mb-12 max-w-[500px]">
            Please share details of your event below. We will reach out to discuss how we can turn your real wedding into a timeless visual romance.
          </p>

          {formSubmitted ? (
            <div className="w-full bg-[#F7F5F2] border-2 border-[#D4AF37] rounded-[16px] p-12 text-center shadow-sm">
              <svg className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="font-serif text-[24px] text-[#222222] mb-2">Inquiry Received Successfully!</h3>
              <p className="text-[#666666] text-[14px]">
                Thank you for contacting Om Photography. We will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="w-full bg-[#F7F5F2] border border-[#E8DCC2] rounded-[16px] p-8 xl:p-12 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-[12px] uppercase font-semibold text-[#666666] tracking-[1px] mb-2 font-sans">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full h-[50px] bg-white border border-[#E8DCC2] rounded-[8px] px-4 text-[14px] text-[#222222] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
                {/* Phone */}
                <div className="flex flex-col">
                  <label className="text-[12px] uppercase font-semibold text-[#666666] tracking-[1px] mb-2 font-sans">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full h-[50px] bg-white border border-[#E8DCC2] rounded-[8px] px-4 text-[14px] text-[#222222] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Date */}
                <div className="flex flex-col">
                  <label className="text-[12px] uppercase font-semibold text-[#666666] tracking-[1px] mb-2 font-sans">Event Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full h-[50px] bg-white border border-[#E8DCC2] rounded-[8px] px-4 text-[14px] text-[#222222] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
                {/* Event Location */}
                <div className="flex flex-col">
                  <label className="text-[12px] uppercase font-semibold text-[#666666] tracking-[1px] mb-2 font-sans">Event Location (City)</label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Udaipur, Rajasthan"
                    className="w-full h-[50px] bg-white border border-[#E8DCC2] rounded-[8px] px-4 text-[14px] text-[#222222] focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              {/* Message Box */}
              <div className="flex flex-col">
                <label className="text-[12px] uppercase font-semibold text-[#666666] tracking-[1px] mb-2 font-sans">Event Details / Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your wedding ceremonies, style preferences, and visual requests..."
                  className="w-full bg-white border border-[#E8DCC2] rounded-[8px] p-4 text-[14px] text-[#222222] focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[54px] bg-[#E0B44C] rounded-[8px] flex items-center justify-center gap-2 text-[#222222] font-semibold text-[16px] shadow-sm hover:bg-[#D4AF37] hover:shadow-md transition-all duration-300"
              >
                <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>SEND BOOKING INQUIRY</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section id="faq" className="relative bg-[#FDFAF5] py-20 px-6 overflow-hidden">
        {/* Subtle warm dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]"
          style={{backgroundImage: 'radial-gradient(circle, #D4AF3720 1px, transparent 1px)', backgroundSize: '36px 36px'}}
        />
        {/* Gold top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="max-w-[900px] mx-auto relative z-10">

          {/* Section header */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-[1px] bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-[11px] font-sans font-semibold tracking-[4px] uppercase">Got Questions?</span>
              <span className="w-10 h-[1px] bg-[#D4AF37]" />
            </div>
            <h2 className="font-serif text-[38px] md:text-[48px] font-bold text-[#1A1A1A] leading-tight">
              Frequently Asked <span className="text-[#D4AF37] italic">Questions</span>
            </h2>
            <p className="text-[#777777] text-[15px] mt-4 max-w-[520px] mx-auto leading-relaxed font-sans">
              Everything you need to know before booking your special day with us.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
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
          <div className="mt-14 text-center">
            <p className="text-[#888888] text-[14px] font-sans mb-5">Still have questions? We&apos;d love to hear from you.</p>
            <a
              href="#booking"
              className="inline-flex items-center gap-2.5 bg-[#D4AF37] text-[#111111] font-semibold text-[13px] tracking-[2px] uppercase px-8 py-3.5 rounded-[6px] hover:bg-[#E0C050] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.25)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ask Us Directly
            </a>
          </div>
        </div>
      </section>

      {/* 9. FOOTER (Bottom Section) */}
      <footer className="bg-[#F8F5F0] border-t border-[#E7D8B5] text-[#222222] relative flex-shrink-0" style={{fontSize:'13px'}}>
        
        {/* TOP SERVICE STRIP */}
        <div className="border-b border-[#E7D8B5] py-3 px-8 xl:px-16">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 lg:divide-x divide-[#E7D8B5]">
            
            {/* Service 1 */}
            <div className="flex items-center gap-3 px-4 py-3 lg:py-0 first:pl-0 last:pr-0">
              <div className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-4 h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Wedding Photography</h4>
                <p className="text-[#666666] text-[11px] mt-0.5 leading-tight font-sans">Capturing real emotions and beautiful moments</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex items-center gap-3 px-4 py-3 lg:py-0">
              <div className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-4 h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Cinematography</h4>
                <p className="text-[#666666] text-[11px] mt-0.5 leading-tight font-sans">Cinematic films that tell your story</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex items-center gap-3 px-4 py-3 lg:py-0">
              <div className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-4 h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Pre Wedding Shoots</h4>
                <p className="text-[#666666] text-[11px] mt-0.5 leading-tight font-sans">Romantic. Natural. Timeless.</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex items-center gap-3 px-4 py-3 lg:py-0">
              <div className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-4 h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Portrait Photography</h4>
                <p className="text-[#666666] text-[11px] mt-0.5 leading-tight font-sans">Your story. Your look. Our creativity.</p>
              </div>
            </div>

            {/* Service 5 */}
            <div className="flex items-center gap-3 px-4 py-3 lg:py-0 last:pr-0">
              <div className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
                <svg className="w-4 h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Destination Weddings</h4>
                <p className="text-[#666666] text-[11px] mt-0.5 leading-tight font-sans">Beautiful weddings in breathtaking destinations</p>
              </div>
            </div>

          </div>
        </div>

        {/* MAIN FOOTER CONTENT */}
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 py-8 px-8 xl:px-16 relative z-10">
          
          {/* Logo Column - 3 cols */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            <div className="flex flex-col items-start leading-none select-none mb-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-[34px] font-bold text-[#D4AF37] tracking-wider leading-none">OM</span>
                <svg className="w-8 h-7 text-[#D4AF37] stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <span className="font-sans text-[10px] font-medium text-[#D4AF37] tracking-[0.45em] mt-1">PHOTOGRAPHY</span>
            </div>
            <p className="text-[#666666] text-[13px] leading-[1.65] max-w-[280px]">
              Capturing your lifetime memories realistically with modern editorial elegance and cinematic storytelling.
            </p>
          </div>

          {/* EXPLORE COLUMN */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="font-serif text-[13px] text-[#222222] font-bold tracking-[1.5px] uppercase mb-4">EXPLORE</h3>
            <ul className="space-y-2 font-sans text-[12px] text-[#666666]">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Our Works</a></li>
              <li><a href="#testimonials" className="hover:text-[#D4AF37] transition-colors">Testimonials</a></li>
              <li><a href="#blog" className="hover:text-[#D4AF37] transition-colors">Blog</a></li>
              <li><a href="#booking" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* GALLERIES COLUMN */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="font-serif text-[13px] text-[#222222] font-bold tracking-[1.5px] uppercase mb-4">GALLERIES</h3>
            <ul className="space-y-2 font-sans text-[12px] text-[#666666]">
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Weddings</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Pre Weddings</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Portraits</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Cinematic Films</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Events</a></li>
              <li><a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">Behind The Scenes</a></li>
            </ul>
          </div>

          {/* INFORMATION COLUMN */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="font-serif text-[13px] text-[#222222] font-bold tracking-[1.5px] uppercase mb-4">INFORMATION</h3>
            <ul className="space-y-2 font-sans text-[12px] text-[#666666]">
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Pricing & Packages</a></li>
              <li><a href="#booking" className="hover:text-[#D4AF37] transition-colors">Booking Process</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Client Guide</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* CONTACT & CTA COLUMN - 3 cols */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col items-start">
            <h3
              className="font-script text-[#D4AF37] leading-snug mb-3 whitespace-nowrap"
              style={{ fontSize: 'clamp(14px, 1.4vw, 22px)' }}
            >
              Let&apos;s Create Magic Together!
            </h3>
            
            <ul className="space-y-2 text-[12px] text-[#666666] mb-4 font-sans">
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

            <a href="#booking" className="w-full h-[38px] border border-[#D4AF37] rounded-[5px] flex items-center justify-center gap-2 text-[#222222] font-semibold text-[11px] tracking-[1.5px] uppercase bg-transparent hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
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
            className="w-full h-full object-cover object-right grayscale opacity-[0.08] mix-blend-multiply"
          />
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#E7D8B5] py-4 px-8 xl:px-16 bg-[#F8F5F0] relative z-10">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-bold text-[#666666] tracking-[2px] uppercase flex items-center gap-2">
                FOLLOW US <span className="w-6 h-[1px] bg-[#D4AF37] inline-block"></span>
              </span>
              {/* Instagram */}
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
                </svg>
              </a>
              {/* Pinterest */}
              <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300">
                <svg className="w-5.5 h-5.5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 22a9 9 0 0 1-5.18-16.36 9 9 0 0 1 14.82 4.96C17.64 16 14 22 8 22z" />
                  <circle cx="8" cy="10" r="3" />
                </svg>
              </a>
            </div>

            {/* Quotation */}
            <div className="flex flex-col items-end text-right max-w-[360px]">
              <div className="flex gap-1.5 text-[#D4AF37] select-none text-[18px] font-serif leading-none mb-0.5">“</div>
              <p className="font-serif italic text-[12px] text-[#666666] leading-relaxed">
                A photograph is the pause button of life&apos;s most beautiful moments.
              </p>
              <div className="flex gap-1.5 text-[#D4AF37] select-none text-[18px] font-serif leading-none mt-0.5">”</div>
            </div>

          </div>
        </div>

      </footer>
    </div>
  );
}
