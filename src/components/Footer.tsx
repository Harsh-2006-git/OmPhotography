"use client";

export default function Footer() {
  return (
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
              <h4 className="font-serif text-[11px] md:text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Portrait Sessions</h4>
              <p className="text-[#666666] text-[10px] md:text-[11px] mt-0.5 leading-tight font-sans">Professional portraits and candid headshots</p>
            </div>
          </div>

          {/* Service 5 */}
          <div className="flex items-center gap-2.5 md:gap-3 px-2 md:px-4 py-2 md:py-3 lg:py-0">
            <div className="w-7 h-7 md:w-9 md:h-9 rounded-full border border-[#D4AF37] bg-white flex items-center justify-center text-[#D4AF37] shrink-0">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h4 className="font-serif text-[11px] md:text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Premium Albums</h4>
              <p className="text-[#666666] text-[10px] md:text-[11px] mt-0.5 leading-tight font-sans">Handcrafted legacy family legacy albums</p>
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
            <li><a href="/" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
            <li><a href="/#about" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
            <li><a href="/#portfolio" className="hover:text-[#D4AF37] transition-colors">Our Works</a></li>
            <li><a href="/#testimonials" className="hover:text-[#D4AF37] transition-colors">Testimonials</a></li>
            <li><a href="/#blog" className="hover:text-[#D4AF37] transition-colors">Blog</a></li>
            <li><a href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* GALLERIES COLUMN */}
        <div className="hidden md:flex lg:col-span-2 flex-col">
          <h3 className="font-serif text-[13px] text-white/90 font-bold tracking-[1.5px] uppercase mb-4">GALLERIES</h3>
          <ul className="space-y-2 font-sans text-[12px] text-white/50">
            <li><a href="/#portfolio" className="hover:text-[#D4AF37] transition-colors">Weddings</a></li>
            <li><a href="/#portfolio" className="hover:text-[#D4AF37] transition-colors">Pre Weddings</a></li>
            <li><a href="/#portfolio" className="hover:text-[#D4AF37] transition-colors">Portraits</a></li>
            <li><a href="/#portfolio" className="hover:text-[#D4AF37] transition-colors">Cinematic Films</a></li>
            <li><a href="/#portfolio" className="hover:text-[#D4AF37] transition-colors">Events</a></li>
            <li><a href="/#portfolio" className="hover:text-[#D4AF37] transition-colors">Behind The Scenes</a></li>
          </ul>
        </div>

        {/* INFORMATION COLUMN */}
        <div className="hidden md:flex lg:col-span-2 flex-col">
          <h3 className="font-serif text-[13px] text-white/90 font-bold tracking-[1.5px] uppercase mb-4">INFORMATION</h3>
          <ul className="space-y-2 font-sans text-[12px] text-white/50">
            <li><a href="/#services" className="hover:text-[#D4AF37] transition-colors">Pricing & Packages</a></li>
            <li><a href="/contact" className="hover:text-[#D4AF37] transition-colors">Booking Process</a></li>
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

          <a href="/contact" className="w-full max-w-[280px] h-[36px] md:h-[38px] border border-[#D4AF37] rounded-[5px] flex items-center justify-center gap-2 text-[#D4AF37] font-semibold text-[10px] md:text-[11px] tracking-[1.5px] uppercase bg-transparent hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-300">
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

      {/* BACKGROUND GRAPHIC */}
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
            <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/80 hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/80 hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/80 hover:bg-[#D4AF37] hover:text-[#0D0D0D] transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
              </svg>
            </a>
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
  );
}
