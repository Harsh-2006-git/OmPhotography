"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white relative flex-shrink-0 w-full overflow-hidden border-t border-[#E6ECE8]" style={{ fontSize: '13px' }}>
      
      {/* Abstract decorative background lines */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Watercolor botanical leaves on left */}
        <div className="absolute left-[-20px] top-[-20px] w-[220px] h-[220px] opacity-[0.12]">
          <Image
            src="/hero_bg.png"
            alt=""
            fill
            sizes="220px"
            className="object-contain scale-x-[-1] rotate-[45deg]"
          />
        </div>

        {/* Thin abstract curved decorations */}
        <svg className="absolute left-4 bottom-4 w-[80px] h-[80px] text-[#D7E8DF]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
          <path d="M0,100 C30,80 60,80 100,100" />
          <path d="M0,90 C40,65 70,75 100,95" />
        </svg>
        <svg className="absolute right-4 top-4 w-[80px] h-[80px] text-[#D7E8DF]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
          <path d="M100,0 C70,20 40,20 0,0" />
          <path d="M100,10 C60,35 30,25 0,5" />
        </svg>
      </div>

      {/* MAIN FOOTER LAYOUT (5 Columns) */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-10 pt-[50px] pb-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch">
          
          {/* Column 1: Logo & brand - 3 columns */}
          <div className="lg:col-span-3 flex flex-col justify-between items-start lg:border-r lg:border-[#E8EEE9] lg:pr-8">
            <div className="w-full">
              {/* Circular Logo & Brand text */}
              <a href="/" className="flex items-center gap-3 select-none mb-4 group">
                <div className="w-[60px] h-[60px] rounded-full bg-[#0F5C4D] flex items-center justify-center relative shadow-[0_6px_20px_rgba(15,92,77,0.08)] overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/logo.png"
                    alt="OM Photo Studio Logo"
                    fill
                    sizes="60px"
                    className="object-cover scale-[1.2]"
                  />
                </div>
                <div className="flex flex-col select-none justify-center">
                  <span className="font-serif text-[24px] font-bold text-[#0F5C4D] tracking-wide uppercase leading-none">Om</span>
                  <span className="font-sans text-[9px] font-black text-[#18352F] tracking-[0.24em] uppercase mt-[4px] leading-none">PHOTOGRAPHY</span>
                </div>
              </a>
              <div className="text-[#4E6159] font-sans text-[12.5px] font-normal leading-[1.7] max-w-[240px] text-left">
                Capturing your lifetime memories realistically with modern editorial elegance and cinematic storytelling.
              </div>
            </div>
            {/* Divider line at bottom of Column 1 */}
            <div className="w-full max-w-[240px] flex items-center gap-2 mt-6">
              <span className="h-[1px] bg-[#E6ECE8] flex-1"></span>
              <svg className="w-3 h-2.5 text-[#0F5C4D]/45" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <path d="M12 3v18M12 3a9 9 0 0 0 9 9M12 3A9 9 0 0 0 3 12" />
              </svg>
              <span className="h-[1px] bg-[#E6ECE8] flex-1"></span>
            </div>
          </div>

          {/* Column 2: Explore links - 2 columns */}
          <div className="hidden md:flex lg:col-span-2 flex-col items-start text-left lg:border-r lg:border-[#E8EEE9] lg:px-6">
            <h3 className="font-serif text-[14px] font-bold tracking-[1.5px] uppercase text-[#134B42] mb-1 leading-none">
              EXPLORE
            </h3>
            {/* Decorative heading line */}
            <div className="flex items-center gap-1.5 w-[50px] mb-4">
              <span className="h-[1px] bg-[#0F5C4D] flex-1"></span>
              <svg className="w-2.5 h-2 text-[#0F5C4D]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="h-[1px] bg-[#0F5C4D] flex-1"></span>
            </div>
            
            <ul className="flex flex-col space-y-2.5">
              {[
                { label: "Home", url: "/" },
                { label: "About Us", url: "/about" },
                { label: "Our Works", url: "/portfolio" },
                { label: "Testimonials", url: "/#testimonials" },
                { label: "Blog", url: "/#blog" },
                { label: "Contact", url: "/contact" }
              ].map((link, idx) => (
                <li key={idx} className="group">
                  <a
                    href={link.url}
                    className="font-sans text-[12.5px] font-normal text-[#4E6159] hover:text-[#0F5C4D] transition-all duration-300 transform group-hover:translate-x-1 inline-block"
                  >
                    • {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Galleries links - 2 columns */}
          <div className="hidden md:flex lg:col-span-2 flex-col items-start text-left lg:border-r lg:border-[#E8EEE9] lg:px-6">
            <h3 className="font-serif text-[14px] font-bold tracking-[1.5px] uppercase text-[#134B42] mb-1 leading-none">
              GALLERIES
            </h3>
            {/* Decorative heading line */}
            <div className="flex items-center gap-1.5 w-[50px] mb-4">
              <span className="h-[1px] bg-[#0F5C4D] flex-1"></span>
              <svg className="w-2.5 h-2 text-[#0F5C4D]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="h-[1px] bg-[#0F5C4D] flex-1"></span>
            </div>
            
            <ul className="flex flex-col space-y-2.5">
              {[
                { label: "Weddings", url: "/portfolio/weddings" },
                { label: "Pre Weddings", url: "/portfolio/pre-weddings" },
                { label: "Portraits", url: "/portfolio/portraits" },
                { label: "Cinematic Films", url: "/portfolio/weddings" },
                { label: "Events", url: "/portfolio/events" },
                { label: "Behind The Scenes", url: "/portfolio" }
              ].map((link, idx) => (
                <li key={idx} className="group">
                  <a
                    href={link.url}
                    className="font-sans text-[12.5px] font-normal text-[#4E6159] hover:text-[#0F5C4D] transition-all duration-300 transform group-hover:translate-x-1 inline-block"
                  >
                    • {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Information links - 2 columns */}
          <div className="hidden md:flex lg:col-span-2 flex-col items-start text-left lg:border-r lg:border-[#E8EEE9] lg:px-6">
            <h3 className="font-serif text-[14px] font-bold tracking-[1.5px] uppercase text-[#134B42] mb-1 leading-none">
              INFORMATION
            </h3>
            {/* Decorative heading line */}
            <div className="flex items-center gap-1.5 w-[50px] mb-4">
              <span className="h-[1px] bg-[#0F5C4D] flex-1"></span>
              <svg className="w-2.5 h-2 text-[#0F5C4D]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="h-[1px] bg-[#0F5C4D] flex-1"></span>
            </div>
            
            <ul className="flex flex-col space-y-2.5">
              {[
                { label: "Pricing & Packages", url: "/services" },
                { label: "Booking Process", url: "/contact" },
                { label: "FAQs", url: "/#testimonials" },
                { label: "Insta Highlights", url: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDc3MzA4MjgyODM5NzIx?story_media_id=3625324820290292286&igsh=a3p1Z3k0YnA4MmFz" },
                { label: "Privacy Policy", url: "#" },
                { label: "Terms & Conditions", url: "/terms" }
              ].map((link, idx) => (
                <li key={idx} className="group">
                  <a
                    href={link.url}
                    className="font-sans text-[12.5px] font-normal text-[#4E6159] hover:text-[#0F5C4D] transition-all duration-300 transform group-hover:translate-x-1 inline-block"
                  >
                    • {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact Card - 3 columns */}
          <div className="lg:col-span-3 flex flex-col items-stretch text-left lg:pl-8">
            <div className="font-script text-[22px] text-[#0F5C4D] leading-none mb-4">
              Let&apos;s Create Magic Together!
            </div>
            
            {/* Contact Rows */}
            <div className="space-y-3 mb-4">
              {/* Call direct */}
              <a href="tel:+916265303386" className="flex items-center gap-3.5 group">
                <div className="w-[34px] h-[34px] rounded-full bg-[#EEF7F2] flex items-center justify-center text-[#0F5C4D] transition-colors group-hover:bg-[#0F5C4D] group-hover:text-white shrink-0">
                  <svg className="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="font-sans text-[13px] font-normal text-[#4E6159] group-hover:text-[#0F5C4D] transition-colors">
                  +91 62653 03386
                </div>
              </a>

              {/* Email direct */}
              <a href="mailto:om.photography.2003@gmail.com" className="flex items-center gap-3.5 group">
                <div className="w-[34px] h-[34px] rounded-full bg-[#EEF7F2] flex items-center justify-center text-[#0F5C4D] transition-colors group-hover:bg-[#0F5C4D] group-hover:text-white shrink-0">
                  <svg className="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="font-sans text-[13px] font-normal text-[#4E6159] group-hover:text-[#0F5C4D] transition-colors truncate">
                  om.photography.2003@gmail.com
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 group">
                <div className="w-[34px] h-[34px] rounded-full bg-[#EEF7F2] flex items-center justify-center text-[#0F5C4D] shrink-0">
                  <svg className="w-4 h-4 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="font-sans text-[13px] font-normal text-[#4E6159] leading-tight">
                  Based in India | Available Worldwide
                </div>
              </div>
            </div>

            {/* Check availability CTA button */}
            <a
              href="/contact"
              className="w-full h-[44px] bg-[#0F5C4D] hover:bg-[#176B5C] text-white font-semibold text-[11px] tracking-[1.5px] uppercase rounded-[10px] flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_6px_15px_rgba(15,92,77,0.1)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>CHECK AVAILABILITY</span>
            </a>
          </div>

        </div>
      </div>

      {/* BOTTOM FOOTER BAR */}
      <div className="bg-[#0D3C35] h-auto lg:h-[68px] py-4 lg:py-0 px-6 sm:px-[60px] flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10 border-t border-white/[0.05]">
        
        {/* Left Side: Follow Us & Social Icons */}
        <div className="flex flex-row items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="font-sans text-[11px] font-semibold text-white/90 tracking-[1.5px] uppercase whitespace-nowrap">
              FOLLOW US
            </span>
            <span className="w-4 sm:w-6 h-[1px] bg-white/40 block"></span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {[
              {
                // Instagram
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ),
                url: "https://www.instagram.com/om_photography_03?igsh=eWxqdmxkazBiczV3&utm_source=qr"
              },
              {
                // Google Business Profile / Maps
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                ),
                url: "https://www.google.com/search?client=ms-android-xiaomi-rvo2b&sca_esv=598771579&sxsrf=ACQVn0-D-HT2u5mkksMuOOz7zgfWYIi8iA:1705402659306&q=om+photography+studio+umaria&ludocid=15290579333970816527&ibp=gwp;0,7&lsig=AB86z5WoWqUIwEp0XlGIRlX2IOa7&kgs=9f3f4c0e2129f922&shndl=-1&shem=lcsnce,lsp&source=sh/x/loc/act/m1/2&fbclid=PARlRTSAODu9tleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafMKLMGpgkVXFGnHl9WDfB8Hsbk8gj1Cx7fNUL8ViaIB6PjBW8rcjryHSnYxA_aem_9mav3X1IKAYqLf86BLoKSQ#lpg=cid:CgIgAQ%3D%3D"
              },
              {
                // YouTube
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                ),
                url: "https://m.youtube.com/@omphotographystudio.official?fbclid=PAZnRzaAODu_NleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAac9p8kszjJx8y0vAuXY93OJy0jVchfefxxybdYoADD-1rke0ziUeEv6WUcqAQ_aem_4oboO1MZffI7ucoZx3GI4A"
              },
              {
                // Playbook Portfolio
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18a2.25 2.25 0 0 1 2.25 2.25v4.5A2.25 2.25 0 0 1 20.25 21.75h-16.5A2.25 2.25 0 0 1 1.5 19.5v-4.5a2.25 2.25 0 0 1 2.25-2.25m0-9h16.5A2.25 2.25 0 0 1 22.5 6v4.5a2.25 2.25 0 0 1-2.25 2.25h-16.5A2.25 2.25 0 0 1 1.5 10.5V6A2.25 2.25 0 0 1 3.75 3.75Z" />
                  </svg>
                ),
                url: "https://www.playbook.com/s/om-photography-studio/qaRvyLkianwVsDc7af7s9beB?fbclid=PAZnRzaAODvBZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadt_floTsP79qOiPtl_cqlNNvQjJ9FB1z4e0hreXr38Ha4nie0xD-bFL2QsrA_aem_536eCA57LsptfeKiZ_AtvQ"
              },
              {
                // WhatsApp
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.11-2.884-6.974-1.862-1.865-4.337-2.893-6.979-2.895-5.438 0-9.866 4.42-9.869 9.866-.001 1.765.485 3.491 1.408 4.98l-.323 1.182.164.159c.775-.758 1.621-1.584 2.158-1.921zm10.594-5.28c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                ),
                url: "https://wa.me/916265303386?text=Hi%20Om%20Photography,%20I'd%20like%20to%20inquire%20about%20your%20services!"
              }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-[#0F5C4D] hover:text-white transition-all duration-300 hover:scale-105"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Luxury Quote */}
        <div className="relative max-w-[500px] text-center lg:text-right flex items-center gap-1.5 md:gap-2">
          <span className="text-white/10 text-[20px] md:text-[32px] font-serif leading-none select-none pointer-events-none shrink-0">&ldquo;</span>
          <div className="font-serif italic text-[10px] xs:text-[11.5px] sm:text-[13.5px] md:text-[15px] font-normal text-white/90 leading-normal whitespace-nowrap">
            A photograph is the pause button of life&apos;s most beautiful moments.
          </div>
          <span className="text-white/10 text-[20px] md:text-[32px] font-serif leading-none select-none pointer-events-none shrink-0">&rdquo;</span>
        </div>

      </div>
    </footer>
  );
}
