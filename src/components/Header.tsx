"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-[60px] md:h-[78px] w-full px-4 md:px-12 flex items-center justify-between z-50 transition-all duration-500 bg-white/95 backdrop-blur-xl border-b border-[#D9E6E0] ${scrolled ? "shadow-[0_10px_30px_rgba(15,92,77,0.05)]" : ""
          }`}
      >
        <a href="/" className="flex items-center gap-2 md:gap-3.5 select-none py-1">
          <div className="w-[42px] h-[42px] md:w-[58px] md:h-[58px] rounded-full overflow-hidden bg-[#0F5C4D] flex items-center justify-center hover:scale-105 transition-transform duration-300 shrink-0 shadow-[0_4px_12px_rgba(15,92,77,0.1)]">
            <img src="/logo.png" alt="OM Photo Studio" className="w-full h-full object-cover scale-[1.2] rounded-full" />
          </div>
          <div className="flex flex-col select-none justify-center">
            <span className="font-serif text-[18px] md:text-[26px] font-bold text-[#0F5C4D] tracking-wide uppercase leading-none">Om</span>
            <span className="font-sans text-[7.5px] md:text-[10px] font-black text-[#18352F] tracking-[0.24em] uppercase mt-[3px] md:mt-[5px] leading-none">PHOTOGRAPHY</span>
          </div>
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 text-[12.5px] font-medium tracking-[0.2em] uppercase font-sans">
          <a
            href={isHome ? "#" : "/"}
            className={`${isHome ? "text-[#0F5C4D]" : "text-[#5E6C66]"} hover:text-[#0F5C4D] transition-colors`}
          >
            HOME
          </a>
          <a
            href="/about"
            className={`${pathname === "/about" ? "text-[#0F5C4D]" : "text-[#5E6C66]"} hover:text-[#0F5C4D] transition-colors`}
          >
            ABOUT
          </a>
          <a
            href="/portfolio"
            className={`${pathname === "/portfolio" ? "text-[#0F5C4D]" : "text-[#5E6C66]"} hover:text-[#0F5C4D] transition-colors`}
          >
            PORTFOLIO
          </a>
          <a
            href="/services"
            className={`${pathname === "/services" ? "text-[#0F5C4D]" : "text-[#5E6C66]"} hover:text-[#0F5C4D] transition-colors`}
          >
            SERVICES
          </a>
          <a
            href="/contact"
            className={`${pathname === "/contact" ? "text-[#0F5C4D]" : "text-[#5E6C66]"} hover:text-[#0F5C4D] transition-colors`}
          >
            CONTACT
          </a>
        </nav>

        {/* RIGHT SIDE: Desktop Book Now + Mobile actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Book Now */}
          <a
            href="/contact"
            className="hidden md:flex h-[48px] py-[16px] px-[28px] bg-[#0F5C4D] rounded-[16px] items-center justify-center gap-2 text-white font-semibold text-[12.5px] tracking-[0.15em] uppercase shadow-[0_10px_30px_rgba(15,92,77,0.08)] hover:bg-[#1F6F63] hover:scale-[1.02] hover:shadow-[0_15px_35px_rgba(15,92,77,0.15)] transition-all duration-300"
          >
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
            href="/contact"
            className="md:hidden h-[34px] px-3.5 bg-[#0F5C4D] text-white rounded-[16px] flex items-center justify-center text-[11px] font-semibold tracking-[1px] uppercase shadow-sm active:scale-95 transition-all duration-200"
          >
            Book Now
          </a>

          {/* Mobile Hamburger — styled icon */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-[34px] h-[34px] rounded-[7px] bg-[#0F5C4D]/10 border border-[#0F5C4D]/40 flex flex-col items-center justify-center gap-[4px] transition-all duration-200 active:scale-95"
            aria-label="Open menu"
          >
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
              <rect y="0" width="18" height="2" rx="1" fill="#0F5C4D" />
              <rect y="5.5" width="12" height="2" rx="1" fill="#0F5C4D" />
              <rect y="11" width="18" height="2" rx="1" fill="#0F5C4D" />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN SIDEBAR */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-400 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-full bg-[#0D0D0D] flex flex-col transition-transform duration-500 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Sidebar Top Bar */}
        <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-white/10">
          <div className="flex items-center select-none py-1">
            <img src="/logo.png" alt="OM Photo Studio" className="h-[44px] w-auto object-contain" />
          </div>
          <button
            onClick={closeMenu}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#0F5C4D] hover:border-[#0F5C4D]/50 transition-all duration-200"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-6 pt-6 gap-0 flex-1 overflow-y-auto">
          {[
            { href: isHome ? "#" : "/", label: "Home", num: "01" },
            { href: "/about", label: "About", num: "02" },
            { href: "/portfolio", label: "Portfolio", num: "03" },
            { href: "/services", label: "Services", num: "04" },
            { href: isHome ? "#faq" : "/#faq", label: "FAQ", num: "05" },
            { href: "/contact", label: "Contact", num: "06" },
          ].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="group inline-flex items-center gap-3 py-3 border-b border-white/[0.07] transition-all duration-200 w-auto"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-[10px] text-[#0F5C4D]/50 font-mono tracking-widest w-5 shrink-0">{item.num}</span>
              <span className="font-serif text-[18px] text-white/75 group-hover:text-[#0F5C4D] transition-colors duration-200 leading-none">
                {item.label}
              </span>
              <svg className="w-3.5 h-3.5 text-[#0F5C4D]/20 group-hover:text-[#0F5C4D]/70 group-hover:translate-x-0.5 transition-all duration-200 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="px-6 py-6 border-t border-white/10 bg-white/[0.01]">
          {/* Brand highlights */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 mb-5 pb-5 border-b border-white/[0.08]">
            {/* Based in India */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full border border-[#0F5C4D]/40 flex items-center justify-center text-[#0F5C4D] shrink-0 mt-0.5">
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
              <div className="w-5 h-5 rounded-full border border-[#0F5C4D]/40 flex items-center justify-center text-[#0F5C4D] shrink-0 mt-0.5">
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
              <div className="w-5 h-5 rounded-full border border-[#0F5C4D]/40 flex items-center justify-center text-[#0F5C4D] shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white/95 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider leading-tight">4.9/5 Rated</h4>
                <p className="text-white/40 text-[8px] sm:text-[9px] font-sans mt-0.5">By Happy Clients</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full border border-[#0F5C4D]/40 flex items-center justify-center text-[#0F5C4D] shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white/95 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider leading-tight">+91 62653 03386</h4>
                <p className="text-white/40 text-[8px] sm:text-[9px] font-sans mt-0.5 font-inter">Let&apos;s Create Magic</p>
              </div>
            </div>
          </div>

          {/* Email row */}
          <div className="flex items-center gap-2 mb-5 text-white/50 text-[11px] font-sans justify-center">
            <svg className="w-3.5 h-3.5 text-[#0F5C4D] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <a href="mailto:om.photography.2003@gmail.com" className="hover:text-white transition-colors">
              om.photography.2003@gmail.com
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5 mb-6 justify-center">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/om_photography_03?igsh=eWxqdmxkazBiczV3&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#0F5C4D]/25 bg-white/5 flex items-center justify-center text-[#0F5C4D]/60 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all duration-250"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Google Search Profile / Maps */}
            <a 
              href="https://www.google.com/search?client=ms-android-xiaomi-rvo2b&sca_esv=598771579&sxsrf=ACQVn0-D-HT2u5mkksMuOOz7zgfWYIi8iA:1705402659306&q=om+photography+studio+umaria&ludocid=15290579333970816527&ibp=gwp;0,7&lsig=AB86z5WoWqUIwEp0XlGIRlX2IOa7&kgs=9f3f4c0e2129f922&shndl=-1&shem=lcsnce,lsp&source=sh/x/loc/act/m1/2&fbclid=PARlRTSAODu9tleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafMKLMGpgkVXFGnHl9WDfB8Hsbk8gj1Cx7fNUL8ViaIB6PjBW8rcjryHSnYxA_aem_9mav3X1IKAYqLf86BLoKSQ#lpg=cid:CgIgAQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#0F5C4D]/25 bg-white/5 flex items-center justify-center text-[#0F5C4D]/60 hover:bg-[#007AFF] hover:text-white hover:border-transparent transition-all duration-250"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </a>
            {/* YouTube */}
            <a 
              href="https://m.youtube.com/@omphotographystudio.official?fbclid=PAZnRzaAODu_NleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAac9p8kszjJx8y0vAuXY93OJy0jVchfefxxybdYoADD-1rke0ziUeEv6WUcqAQ_aem_4oboO1MZffI7ucoZx3GI4A"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#0F5C4D]/25 bg-white/5 flex items-center justify-center text-[#0F5C4D]/60 hover:bg-[#FF0000] hover:text-white hover:border-transparent transition-all duration-250"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a 
              href="https://wa.me/916265303386?text=Hi%20Om%20Photography,%20I'd%20like%20to%20inquire%20about%20your%20services!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#0F5C4D]/25 bg-white/5 flex items-center justify-center text-[#0F5C4D]/60 hover:bg-[#25D366] hover:text-white hover:border-transparent transition-all duration-250"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </a>
            {/* Playbook Portfolio */}
            <a 
              href="https://www.playbook.com/s/om-photography-studio/qaRvyLkianwVsDc7af7s9beB?fbclid=PAZnRzaAODvBZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadt_floTsP79qOiPtl_cqlNNvQjJ9FB1z4e0hreXr38Ha4nie0xD-bFL2QsrA_aem_536eCA57LsptfeKiZ_AtvQ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#0F5C4D]/25 bg-white/5 flex items-center justify-center text-[#0F5C4D]/60 hover:bg-[#E60023] hover:text-white hover:border-transparent transition-all duration-250"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18a2.25 2.25 0 0 1 2.25 2.25v4.5A2.25 2.25 0 0 1 20.25 21.75h-16.5A2.25 2.25 0 0 1 1.5 19.5v-4.5a2.25 2.25 0 0 1 2.25-2.25m0-9h16.5A2.25 2.25 0 0 1 22.5 6v4.5a2.25 2.25 0 0 1-2.25 2.25h-16.5A2.25 2.25 0 0 1 1.5 10.5V6A2.25 2.25 0 0 1 3.75 3.75Z" />
              </svg>
            </a>
          </div>

          {/* Book Now button */}
          <a
            href="/contact"
            onClick={closeMenu}
            className="w-full h-[50px] bg-[#0F5C4D] text-white rounded-[16px] flex items-center justify-center gap-2 font-semibold text-[14px] tracking-[1.5px] uppercase hover:bg-[#1F6F63] hover:shadow-[0_0_24px_rgba(15,92,77,0.3)] transition-all duration-300 shadow-[0_0_24px_rgba(15,92,77,0.15)]"
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
    </>
  );
}
