"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Play, Pause, ZoomIn, Download, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { getReels, ClientReel } from "../lib/portfolioStore";


// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`group border rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300 ${open
        ? "border-[#0F5C4D]/50 bg-white shadow-[0_10px_30px_rgba(15,92,77,0.08)]"
        : "border-[#D9E6E0] bg-white hover:border-[#0F5C4D]/40 hover:shadow-[0_10px_30px_rgba(15,92,77,0.08)]"
        }`}
      onClick={() => setOpen((o) => !o)}
    >
      {/* Question row */}
      <div className="flex items-center justify-between px-4 py-3.5 md:px-6 md:py-5 select-none">
        <div className="flex items-center gap-2.5 md:gap-4">
          <span
            className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] md:text-[12px] font-bold font-serif transition-all duration-300 ${open ? "bg-[#0F5C4D] text-white" : "bg-[#DCEFE8] text-[#0F5C4D]"
              }`}
          >
            Q
          </span>
          <span className={`font-serif text-[14px] md:text-[16px] leading-snug transition-colors duration-300 ${open ? "text-[#0F5C4D]" : "text-[#18352F] group-hover:text-[#0F5C4D]"}`}>
            {question}
          </span>
        </div>
        {/* Plus / Minus icon */}
        <div className={`w-6 h-6 md:w-7 md:h-7 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${open ? "border-[#0F5C4D] bg-[#0F5C4D]/10 rotate-45" : "border-[#D9E6E0] group-hover:border-[#0F5C4D]/60"
          }`}>
          <svg className={`w-3 h-3 md:w-3.5 md:h-3.5 transition-colors duration-300 ${open ? "text-[#0F5C4D]" : "text-[#5E6C66]"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
          <div className="w-full h-[1px] bg-[#D9E6E0] mb-3 md:mb-4" />
          <p className="text-[#5E6C66] text-[13px] md:text-[14px] leading-[1.8] md:leading-[1.85] font-inter">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function ReelCard({
  reel,
  isMuted,
  onToggleMute,
}: {
  reel: ClientReel;
  isMuted: boolean;
  onToggleMute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync muted property on the video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Ensure autoplay playback starts on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay was prevented on mount:", err);
      });
    }
  }, []);

  const handleCardClick = () => {
    onToggleMute();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMute();
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex-shrink-0 w-[180px] sm:w-[240px] md:w-[280px] lg:w-[320px] aspect-[9/16] rounded-[16px] sm:rounded-[24px] overflow-hidden relative group/card cursor-pointer snap-start bg-[#18352F] border border-[#D9E6E0]/50 shadow-md hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.poster}
        preload="metadata"
        loop
        muted={isMuted}
        autoPlay
        playsInline
        className="w-full h-full object-cover group-hover/card:scale-[1.04] transition-all duration-500"
      />

      {/* Ambient dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 group-hover/card:via-black/35 transition-all duration-300 pointer-events-none" />

      {/* Mute/Unmute Button (Top-Left) */}
      <button
        onClick={toggleMute}
        className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 bg-black/50 backdrop-blur-[6px] hover:bg-[#0F5C4D] text-white rounded-full p-1.5 sm:p-2 border border-white/20 transition-all duration-300 shadow-md active:scale-95"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

      {/* Reels Icon (Top-Right) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/40 backdrop-blur-[4px] rounded-full p-1.5 sm:p-2 text-white border border-white/20 pointer-events-none">
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M2 12h20M12 2v20M2 7h5M2 17h5M17 7h5M17 17h5" />
        </svg>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 text-white text-left pointer-events-none">
        <h3 className="font-serif text-[13px] sm:text-[16px] md:text-[18px] font-semibold leading-tight mb-1 sm:mb-2 drop-shadow-sm line-clamp-2">
          {reel.title}
        </h3>
        <div className="flex items-center gap-1 opacity-80 text-[9px] sm:text-[10px] md:text-[11px] font-semibold">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>{reel.views} Views</span>
        </div>
      </div>
    </div>
  );
}
const testimonials = [
  {
    name: "Aarav & Diya",
    location: "Married in Udaipur",
    text: '"Om Photography ne hamari shaadi ko sach me yaadgaar bana diya! The team was professional, friendly and captured every single candid moment beautifully. We absolutely love our wedding film and album!"',
    image: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964300/portfolio/file_dy9mud.jpg"
  },
  {
    name: "Kabir & Meera",
    location: "Married in Jaipur",
    text: '"We had an amazing pre-wedding shoot and main wedding event. The team\'s cinematic storytelling is outstanding. They knew exactly how to make us feel relaxed, resulting in beautiful, organic, lifelong memories."',
    image: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964265/portfolio/file_tr3i2z.jpg"
  },
  {
    name: "Rohit & Anjali",
    location: "Married in Delhi",
    text: '"They don\'t just take pictures; they truly capture realistic emotions. Our family members are still praising their professional conduct and behavior during the event. The photos are absolute masterpieces of creative art."',
    image: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964743/portfolio/file_ocujyq.jpg"
  },
  {
    name: "Vikram & Priya",
    location: "Married in Jodhpur",
    text: '"Om Photography captured our Jodhpur wedding beautifully. The team was invisible but everywhere at the same time. The visual storytelling, stunning colors, and emotional candids are simply breathtaking and truly outstanding."',
    image: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963476/portfolio/file_rjsxl0.jpg"
  },
  {
    name: "Arjun & Riya",
    location: "Married in Goa",
    text: '"Highly recommended! They shot our beach wedding in Goa and did an incredible job. Every frame is like a cinematic movie poster. Truly professional, extremely talented, and a absolute joy to work."',
    image: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963372/portfolio/file_d4ompj.jpg"
  },
  {
    name: "Yash & Sneha",
    location: "Married in Mumbai",
    text: '"The details they captured are incredible. From the decor to the emotional tears during Vidai, everything was perfect. We couldn\'t have asked for a better team to preserve our beautiful precious moments."',
    image: "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964763/portfolio/file_ctd3hv.jpg"
  }
];

export default function Home() {
  const [unmutedReelId, setUnmutedReelId] = useState<string | null>(null);
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);


  const [contactModalOpen, setContactModalOpen] = useState(false);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(false);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxZoom(false);
    setIsPlayingSlideshow(false);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    setLightboxZoom(false);
    setIsPlayingSlideshow(false);
  };

  const handlePrevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? masonryGallery.length - 1 : prev! - 1));
    setLightboxZoom(false);
  };

  const handleNextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === masonryGallery.length - 1 ? 0 : prev! + 1));
    setLightboxZoom(false);
  };

  useEffect(() => {
    if (!isPlayingSlideshow || lightboxIndex === null) return;
    const timer = setInterval(() => {
      handleNextPhoto();
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlayingSlideshow, lightboxIndex]);

  // Lock body scroll when contact modal or lightbox is open
  useEffect(() => {
    document.body.style.overflow = (contactModalOpen || lightboxIndex !== null) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [contactModalOpen, lightboxIndex]);

  // Contact page routing helper is handled via static Links/hrefs pointing to /contact

  // Carousel images
  const carouselImages = [
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964300/portfolio/file_dy9mud.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964265/portfolio/file_tr3i2z.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964743/portfolio/file_ocujyq.jpg",

    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963476/portfolio/file_rjsxl0.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963372/portfolio/file_d4ompj.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964763/portfolio/file_ctd3hv.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963853/portfolio/file_rw9yxs.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963923/portfolio/file_sawley.jpg",

    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783965309/portfolio/file_z798oz.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964082/portfolio/file_hrpi8w.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963772/portfolio/file_q4osbv.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964716/portfolio/file_ht8fvy.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963734/portfolio/file_drttld.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963460/portfolio/file_raldl4.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783963917/portfolio/file_g8qhae.jpg",
    "https://res.cloudinary.com/eksh1jyi/image/upload/v1783964050/portfolio/file_xe7u2y.jpg",
  ];



  const [masonryGallery, setMasonryGallery] = useState<{ url: string; category: string; title: string }[]>([]);

  useEffect(() => {
    async function loadShowcase() {
      try {
        const res = await fetch("/api/db/photos?showcase=true");
        if (!res.ok) throw new Error("Failed to fetch showcase");
        const data = await res.json();
        const mapped = data.map((p: any, idx: number) => ({
          url: p.url,
          category: p.category || "Wedding Story",
          title: `Portfolio Frame ${(idx + 1).toString().padStart(2, "0")}`,
        }));
        setMasonryGallery(mapped);
      } catch (err) {
        console.error("Failed to load landing showcase images:", err);
      }
    }
    loadShowcase();
  }, []);

  const [reels, setReels] = useState<ClientReel[]>([]);

  useEffect(() => {
    async function loadReels() {
      try {
        const fetchedReels = await getReels();
        setReels(fetchedReels);
      } catch (err) {
        console.error("Failed to load database reels:", err);
      }
    }
    loadReels();
  }, []);

  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth || 1);
      const idx = Math.round(progress * (reels.length - 1));
      if (!isNaN(idx) && idx >= 0 && idx < reels.length) {
        setActiveDot(idx);
      }
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };


  return (
    <div className="min-h-screen bg-transparent text-[#18352F] overflow-x-hidden font-sans scroll-smooth">


      <Header />

      {/* 2. HERO SECTION / BANNER */}
      <section className="min-h-[100dvh] lg:h-screen pt-[var(--header-height)] flex flex-col justify-between px-4 sm:px-6 md:px-12 py-3 lg:py-[2vh] max-w-[1920px] mx-auto w-full overflow-x-hidden lg:overflow-hidden relative">



        {/* Two columns section (Flex on mobile, Grid on desktop) */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-8 items-center justify-center flex-1 min-h-0 py-1.5 pt-3 md:pt-10 lg:pt-12 w-full relative z-10">
          {/* Left Column (42%) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-center justify-center lg:pr-0 lg:text-center w-full flex-shrink-0">
            {/* Top Label with decorative green lines */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 mb-3 lg:mb-[2.5vh] max-w-full">
              <div className="flex items-center shrink-0">
                <span className="w-3 sm:w-6 h-[1px] bg-[#0F5C4D]"></span>
                <svg className="w-2 h-2 text-[#0F5C4D] -ml-0.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
                </svg>
              </div>
              <span className="text-[9px] xs:text-[10.5px] sm:text-[10px] xl:text-[11px] uppercase tracking-[0.4px] xs:tracking-[1.2px] sm:tracking-[3px] font-semibold text-[#5E6C66] font-sans whitespace-nowrap">
                Premium Wedding Photography & Cinematography
              </span>
              <div className="flex items-center shrink-0">
                <svg className="w-2 h-2 text-[#0F5C4D] -mr-0.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.209l8.2-1.191L12 .587z" />
                </svg>
                <span className="w-3 sm:w-6 h-[1px] bg-[#0F5C4D]"></span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-[38px] xs:text-[42px] sm:text-[44px] md:text-[46px] xl:text-[54px] leading-[1.12] text-black font-normal tracking-tight">
              Capturing Your<br />
              Lifetime Memories
            </h1>
            {/* Script word "Realistically" */}
            <div className="font-script text-[50px] xs:text-[56px] sm:text-[64px] md:text-[68px] xl:text-[76px] text-[#1F6F63] leading-none mt-1 pl-3 lg:pl-0 select-none transform -rotate-1 origin-left lg:origin-center z-10">
              Realistically
            </div>

            {/* Description */}
            <p className="text-[#5E6C66] !text-[13px] xs:!text-[14px] sm:!text-[14px] xl:!text-[16px] font-normal leading-[1.5] max-w-[325px] xs:max-w-[365px] sm:max-w-[460px] mt-2 lg:mt-[2vh] font-inter">
              <span className="block sm:inline">We don't just click pictures, we capture emotions,</span>{" "}
              <span className="block sm:inline">moments and stories you'll cherish forever.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-4 mt-4 lg:mt-[3vh] w-full sm:w-auto">
              {/* Button 1 */}
              <a href="/portfolio" className="flex-1 sm:flex-initial h-[46px] md:h-[50px] px-3 sm:px-6 md:px-8 whitespace-nowrap bg-[#0F5C4D] rounded-[14px] flex items-center justify-center gap-1.5 sm:gap-2 text-white font-semibold text-[11px] sm:text-[12px] md:text-[14px] xl:text-[15px] hover:bg-[#1F6F63] hover:shadow-[0_10px_30px_rgba(15,92,77,0.15)] transition-all duration-300">
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span>VIEW OUR WORK</span>
              </a>

              {/* Button 2 */}
              <a href="/contact" className="flex-1 sm:flex-initial h-[46px] md:h-[50px] px-3 sm:px-6 md:px-8 whitespace-nowrap border-2 border-[#0F5C4D] bg-white rounded-[14px] flex items-center justify-center gap-1.5 sm:gap-2 text-[#18352F] font-semibold text-[11px] sm:text-[12px] md:text-[14px] xl:text-[15px] hover:bg-[#0F5C4D] hover:text-white transition-all duration-300">
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
            className="lg:hidden relative w-full max-w-[380px] xs:max-w-[420px] aspect-[1.6] max-h-[26vh] mx-auto flex items-center justify-center mt-3 mb-2 z-10"
          >
            {/* Organic curved shape behind image */}
            <div className="absolute inset-0 bg-[#DCEFE8] rounded-[24px] transform rotate-2 scale-[0.98] pointer-events-none opacity-60 z-0" />

            {/* Main Bigger Image */}
            <div className="relative w-[96%] h-[98%] rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(15,92,77,0.08)] border border-[#D9E6E0]/30 z-10">
              <Image
                src="/hero-image.png"
                alt="Premium wedding photography portrait of an Indian couple"
                fill
                priority
                sizes="75vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Smaller Overlay Image (Bottom Left) */}
            <div className="absolute bottom-[-18%] left-[2%] h-[60%] rounded-[20px] overflow-hidden shadow-[0_15px_35px_rgba(15,92,77,0.15)] border-[4px] border-white z-20 bg-white">
              <img
                src="https://res.cloudinary.com/eksh1jyi/image/upload/v1783964082/portfolio/file_hrpi8w.jpg"
                alt="Bridal portrait detail shoot"
                className="h-full w-auto object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>            {/* FLOATING STAT CARD */}
            <div className="absolute bottom-[6%] right-[6%] bg-white/95 backdrop-blur-md border border-[#D9E6E0]/60 rounded-[22px] p-2 sm:p-2.5 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(15,92,77,0.08)] text-center w-[90px] sm:w-[115px] z-30 transition-transform duration-300 hover:scale-105">
              <span className="font-sans text-[18px] sm:text-[24px] font-bold text-[#0F5C4D] leading-none tracking-tight">100+</span>
              <span className="text-[7px] sm:text-[9px] font-bold tracking-[0.12em] text-[#18352F] font-sans uppercase mt-1">WEDDINGS</span>
              <span className="text-[5.5px] sm:text-[7px] font-medium tracking-[0.08em] text-[#5E6C66] font-sans uppercase">Captured</span>
              <div className="w-6 h-[1px] bg-[#D9E6E0]/80 my-1" />
              <span className="text-[5.5px] sm:text-[7px] font-bold tracking-[0.08em] text-[#0F5C4D] font-sans uppercase">Memories For Life</span>
            </div>
          </div>

          {/* DESKTOP ORIGINAL IMAGE (shown only on desktop lg+) */}
          <div className="hidden lg:col-span-7 lg:flex relative w-full h-[45vh] min-h-[300px] max-h-[420px] xl:h-[50vh] xl:max-h-[500px] items-center justify-center">
            {/* Organic curved shape behind image */}
            <div className="absolute w-[87%] h-[105%] left-[8%] bg-[#DCEFE8] rounded-[24px] transform rotate-1 pointer-events-none opacity-60 z-0" />

            <div className="relative w-full lg:w-[85%] h-full rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(15,92,77,0.08)] z-10">
              <Image
                src="/hero-image.png"
                alt="Premium wedding photography portrait of an Indian couple"
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover lg:object-center"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 15%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%)'
                }}
              />

              {/* FLOATING STAT CARD */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md border border-[#D9E6E0]/60 rounded-[22px] p-3 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(15,92,77,0.08)] text-center w-[130px] z-20 transition-transform duration-300 hover:scale-105">
                <span className="font-sans text-[28px] font-bold text-[#0F5C4D] leading-none tracking-tight">100+</span>
                <span className="text-[9.5px] font-bold tracking-[0.15em] text-[#18352F] font-sans uppercase mt-1">WEDDINGS</span>
                <span className="text-[7.5px] font-medium tracking-[0.1em] text-[#5E6C66] font-sans uppercase">Captured</span>
                <div className="w-8 h-[1px] bg-[#D9E6E0]/80 my-1.5" />
                <span className="text-[7.5px] font-bold tracking-[0.08em] text-[#0F5C4D] font-sans uppercase">Memories For Life</span>
              </div>
            </div>


          </div>
        </div>


        {/* IMAGE CAROUSEL CONTAINER (Full Viewport Width covering screen) */}
        <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-white border-y border-[#0F5C4D]/25 h-[80px] sm:h-[110px] md:h-[135px] lg:h-[15vh] lg:min-h-[100px] lg:max-h-[140px] flex items-center overflow-hidden mt-3.5 md:mt-4 shadow-[0_10px_30px_rgba(15,92,77,0.03)] z-10">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-track {
              display: flex;
              align-items: center;
              gap: 8px;
              width: max-content;
              animation: marquee 25s linear infinite;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
            @media (max-width: 768px) {
              .marquee-track {
                gap: 6px;
                animation: marquee 12s linear infinite; /* Faster on mobile */
              }
            }
          `}</style>

          {/* We duplicate the images to make the scroll seamless */}
          <div className="marquee-track">
            {[...carouselImages, ...carouselImages].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Wedding moment ${(index % carouselImages.length) + 1}`}
                className="h-[80px] sm:h-[110px] md:h-[135px] lg:h-[15vh] lg:min-h-[100px] lg:max-h-[140px] w-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.04] shrink-0"
              />
            ))}
          </div>
        </div>

        {/* BOTTOM INFO ROW */}
        <div className="hidden md:flex items-center justify-between w-full max-w-[1200px] mx-auto py-1.5 border-t border-[#D9E6E0] mt-1.5 md:mt-2 flex-shrink-0 relative z-10 px-6">
          {/* Item 1 */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-[#0F5C4D] flex items-center justify-center text-[#0F5C4D] shrink-0">
              <svg className="w-3 h-3 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[#18352F] text-[10.5px] font-sans">Based in India</h4>
              <p className="text-[#5E6C66] text-[8.5px] font-sans font-inter">Available Worldwide</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-[#0F5C4D] flex items-center justify-center text-[#0F5C4D] shrink-0">
              <svg className="w-3 h-3 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[#18352F] text-[10.5px] font-sans">Cinematic Shoots</h4>
              <p className="text-[#5E6C66] text-[8.5px] font-sans font-inter">Timeless Stories</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-[#0F5C4D] flex items-center justify-center text-[#0F5C4D] shrink-0">
              <svg className="w-3 h-3 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[#18352F] text-[10.5px] font-sans">4.9/5 Rated</h4>
              <p className="text-[#5E6C66] text-[8.5px] font-sans font-inter">By Happy Clients</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-[#0F5C4D] flex items-center justify-center text-[#0F5C4D] shrink-0">
              <svg className="w-3 h-3 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <a href="tel:+916265303386" className="hover:underline">
                <h4 className="font-semibold text-[#18352F] text-[10.5px] font-sans">+91 62653 03386</h4>
              </a>
              <p className="text-[#5E6C66] text-[8.5px] font-sans font-inter">Let's Create Magic</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT / INTRODUCTION SECTION */}
      <section id="about" className="bg-white border-t border-[#D9E6E0] py-12 md:py-14 px-4 sm:px-6 md:px-12 xl:px-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* Heading (Mobile Only) */}
          <div className="lg:hidden w-full flex flex-col items-center text-center mb-4">
            <div className="font-script text-[24px] text-[#1F6F63] mb-1 select-none">
              Our Philosophy
            </div>
            <h2 className="font-serif text-[22px] sm:text-[30px] text-[#18352F] font-normal leading-tight tracking-tight mb-2 px-2">
              Capturing Love in Its Purest, Most Authentic Form
            </h2>
          </div>

          {/* Left Side: Professional Photo */}
          <div className="lg:col-span-4 relative max-w-[320px] mx-auto w-full flex justify-center">
            <div className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden p-1.5 border border-[#0F5C4D]/10 bg-white shadow-md z-10">
              <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80"
                  alt="Om - Lead Photographer"
                  fill
                  sizes="(max-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              {/* Green border frame wrapping the image cleanly */}
              <div className="absolute inset-0 border-2 border-[#0F5C4D] rounded-[20px] pointer-events-none"></div>
            </div>
          </div>

          {/* Right Side: Introduction text */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left mt-4 lg:mt-0">
            {/* Heading (Desktop Only) */}
            <div className="hidden lg:flex flex-col items-start">
              <div className="font-script text-[36px] text-[#1F6F63] mb-1 select-none">
                Our Philosophy
              </div>
              <h2 className="font-serif lg:text-[26px] xl:text-[34px] 2xl:text-[40px] text-[#18352F] font-normal leading-tight tracking-tight mb-4 lg:whitespace-nowrap">
                Capturing Love in Its Purest, Most Authentic Form
              </h2>
            </div>

            <p className="text-[#5E6C66] !text-[13px] xs:!text-[14px] md:!text-[15.5px] leading-[1.65] md:leading-[1.8] font-inter mb-3 px-1 lg:px-0">
              Hi, I am Om, the lead photographer and founder of Om Photography. With over a decade of capturing premium luxury weddings across India and worldwide, our vision is simple: <strong>to capture your lifetime memories realistically.</strong>
            </p>
            <p className="text-[#5E6C66] !text-[13px] xs:!text-[14px] md:!text-[15.5px] leading-[1.65] md:leading-[1.8] font-inter mb-4 md:mb-4.5 px-1 lg:px-0">
              We specialize in candid emotions, dramatic lighting, and cinematic story-telling. We believe that a wedding isn't just an event; it's a legacy of emotions, laughter, and tears that you will pass down for generations. Our team operates with micro-precision, ensuring that every fleeting moment is immortalized with editorial elegance.
            </p>
            <div className="grid grid-cols-3 gap-2 md:gap-4 w-full pt-4 md:pt-4 border-t border-[#D9E6E0]">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="text-[18px] sm:text-[22px] md:text-[28px] font-sans font-bold text-[#0F5C4D]">10+</div>
                <div className="text-[8.5px] sm:text-[10px] md:text-[12px] uppercase tracking-[1px] text-[#5E6C66] mt-0.5">Years Experience</div>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="text-[18px] sm:text-[22px] md:text-[28px] font-sans font-bold text-[#0F5C4D]">350+</div>
                <div className="text-[8.5px] sm:text-[10px] md:text-[12px] uppercase tracking-[1px] text-[#5E6C66] mt-0.5">Weddings Shot</div>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="text-[18px] sm:text-[22px] md:text-[28px] font-sans font-bold text-[#0F5C4D]">100%</div>
                <div className="text-[8.5px] sm:text-[10px] md:text-[12px] uppercase tracking-[1px] text-[#5E6C66] mt-0.5">Happy Clients</div>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="pt-6 md:pt-5 w-full flex justify-center lg:justify-start">
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 h-[46px] border-2 border-[#0F5C4D] bg-[#0F5C4D] hover:bg-transparent hover:text-[#0F5C4D] text-white font-semibold text-[11px] md:text-[12px] uppercase tracking-widest rounded-[10px] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(15,92,77,0.15)]"
              >
                <span>LEARN MORE ABOUT US</span>
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PINTEREST-STYLE MASONRY GALLERY SECTION */}
      <section id="portfolio" className="bg-[#F5FBF8] border-t border-[#D9E6E0] py-24 px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="mx-auto max-w-[760px] text-center mb-16">
            <div className="text-[12px] uppercase tracking-[0.42em] text-[#0F5C4D] font-semibold mb-4">OUR WORK</div>
            <h2 className="font-serif text-[42px] md:text-[56px] text-[#18352F] font-normal leading-[1.08] tracking-tight mb-5">
              Stories Through Our Lens
            </h2>
            <p className="text-[#5E6C66] text-[15px] md:text-[17px] leading-[1.8] font-inter">
              A collection of timeless moments, captured with elegance and emotion.
            </p>
          </div>

          <div className="masonry-gallery">
            {masonryGallery.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="masonry-card group"
                style={{ animationDelay: `${index * 70}ms` }}
                onClick={() => handleOpenLightbox(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="masonry-image"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES & EXPERIENCE SECTION */}
      <section id="services" className="bg-white border-t border-[#D9E6E0] py-10 md:py-12 px-4 sm:px-6 md:px-12 xl:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <div className="font-script text-[22px] md:text-[36px] text-[#1F6F63] mb-0.5">Our Services</div>
          <h2 className="font-serif text-[22px] sm:text-[32px] md:text-[42px] text-[#18352F] font-normal tracking-tight text-center mb-3 md:mb-8">
            What We Specialize In
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
            {/* Service 1 */}
            <div className="group bg-white border border-[#D9E6E0] rounded-[18px] p-3.5 sm:p-4.5 md:p-5 flex flex-col items-start hover:-translate-y-1 hover:border-[#0F5C4D] hover:shadow-[0_12px_35px_rgba(15,92,77,0.06)] transition-all duration-300 cursor-pointer">
              <div className="flex flex-row items-center gap-3 mb-3 w-full">
                <div className="w-9 h-9 rounded-full bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] group-hover:bg-[#0F5C4D] group-hover:text-white group-hover:border-[#0F5C4D] transition-all duration-300 shrink-0">
                  <svg className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <circle cx="12" cy="13" r="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-[15px] sm:text-[16px] md:text-[17px] text-[#18352F] group-hover:text-[#0F5C4D] font-semibold leading-tight transition-colors duration-300">Candid Photography</h3>
              </div>
              <p className="text-[#5E6C66] text-[10.5px] sm:text-[11px] md:text-[11.5px] leading-[1.5] font-inter">
                Capturing natural, unscripted emotions, stolen glances, and real laughter as it happens without forcing poses.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group bg-white border border-[#D9E6E0] rounded-[18px] p-3.5 sm:p-4.5 md:p-5 flex flex-col items-start hover:-translate-y-1 hover:border-[#0F5C4D] hover:shadow-[0_12px_35px_rgba(15,92,77,0.06)] transition-all duration-300 cursor-pointer">
              <div className="flex flex-row items-center gap-3 mb-3 w-full">
                <div className="w-9 h-9 rounded-full bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] group-hover:bg-[#0F5C4D] group-hover:text-white group-hover:border-[#0F5C4D] transition-all duration-300 shrink-0">
                  <svg className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polygon points="23 7 16 12 23 17 23 7" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-[15px] sm:text-[16px] md:text-[17px] text-[#18352F] group-hover:text-[#0F5C4D] font-semibold leading-tight transition-colors duration-300">Cinematic Films</h3>
              </div>
              <p className="text-[#5E6C66] text-[10.5px] sm:text-[11px] md:text-[11.5px] leading-[1.5] font-inter">
                Creating bespoke cinematic wedding highlights, teasers, and documentary-style films of your royal celebrations.
              </p>
            </div>

            {/* Service 3 */}
            <div className="group bg-white border border-[#D9E6E0] rounded-[18px] p-3.5 sm:p-4.5 md:p-5 flex flex-col items-start hover:-translate-y-1 hover:border-[#0F5C4D] hover:shadow-[0_12px_35px_rgba(15,92,77,0.06)] transition-all duration-300 cursor-pointer">
              <div className="flex flex-row items-center gap-3 mb-3 w-full">
                <div className="w-9 h-9 rounded-full bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] group-hover:bg-[#0F5C4D] group-hover:text-white group-hover:border-[#0F5C4D] transition-all duration-300 shrink-0">
                  <svg className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                </div>
                <h3 className="font-serif text-[15px] sm:text-[16px] md:text-[17px] text-[#18352F] group-hover:text-[#0F5C4D] font-semibold leading-tight transition-colors duration-300">Drone Shoots</h3>
              </div>
              <p className="text-[#5E6C66] text-[10.5px] sm:text-[11px] md:text-[11.5px] leading-[1.5] font-inter">
                Grand aerial cinematography capturing the scale, majesty, and breath-taking architecture of your wedding destination.
              </p>
            </div>

            {/* Service 4 */}
            <div className="group bg-white border border-[#D9E6E0] rounded-[18px] p-3.5 sm:p-4.5 md:p-5 flex flex-col items-start hover:-translate-y-1 hover:border-[#0F5C4D] hover:shadow-[0_12px_35px_rgba(15,92,77,0.06)] transition-all duration-300 cursor-pointer">
              <div className="flex flex-row items-center gap-3 mb-3 w-full">
                <div className="w-9 h-9 rounded-full bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] group-hover:bg-[#0F5C4D] group-hover:text-white group-hover:border-[#0F5C4D] transition-all duration-300 shrink-0">
                  <svg className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="font-serif text-[15px] sm:text-[16px] md:text-[17px] text-[#18352F] group-hover:text-[#0F5C4D] font-semibold leading-tight transition-colors duration-300">Premium Albums</h3>
              </div>
              <p className="text-[#5E6C66] text-[10.5px] sm:text-[11px] md:text-[11.5px] leading-[1.5] font-inter">
                Handcrafted leather albums with gold gilded edges and flush mount pages, custom-designed to tell your unique love story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Separator */}
      <div className="w-full flex items-center justify-center py-4 bg-white">
        <div className="h-[1px] bg-[#D9E6E0]/60 flex-1 max-w-[150px] sm:max-w-[240px]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D]/30 mx-4" />
        <div className="h-[1px] bg-[#D9E6E0]/60 flex-1 max-w-[150px] sm:max-w-[240px]" />
      </div>

      {/* 5.5 BRAND PROMISE BANNER SECTION */}
      <section className="bg-[#0b3d34] text-white w-full relative overflow-hidden py-8 md:py-7 border-t border-b border-[#0F5C4D]/20">
        {/* Circular line decoration on right side */}
        {/* Circular line decoration on right side */}
        {/* Circular line decoration on right side */}
        <div className="absolute right-[5%] top-[10%] w-[320px] h-[320px] border border-[#EEF7F2]/10 rounded-full pointer-events-none select-none hidden lg:block z-0" />
        <div className="absolute right-[2%] top-[5%] w-[360px] h-[360px] border border-[#EEF7F2]/5 rounded-full pointer-events-none select-none hidden lg:block z-0" />

        {/* Background dot grid pattern */}
        <div className="absolute top-[10%] left-[45%] w-[100px] h-[100px] opacity-[0.06] hidden lg:block z-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        <div className="absolute bottom-[10%] left-[40%] w-[100px] h-[100px] opacity-[0.06] hidden lg:block z-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
        <div className="absolute bottom-[5%] right-[5%] w-[100px] h-[100px] opacity-[0.06] hidden lg:block z-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 items-center px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">

          {/* Left Column: Text & Features */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-2 sm:space-y-2.5 md:space-y-3 animate-[fadeIn_0.8s_ease-out]">
            {/* Logo and branding */}
            <div className="flex flex-col select-none font-serif text-white tracking-wide">
              <div className="flex items-center gap-1">
                <span className="text-[20px] font-bold leading-none tracking-[0.5px]">Om</span>
                {/* Small camera logo spark */}
                <svg className="w-4 h-4 text-[#EEF7F2] fill-none stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19 10h.01M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3l2-3h6l2 3h3a2 2 0 012 2v10z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[7.5px] uppercase tracking-[4px] text-[#D7E8DF] mt-0.5 font-sans leading-none font-semibold">Photo Studio</span>
            </div>

            {/* Subtitle tag line */}
            <div className="flex items-center gap-1.5 select-none max-w-full overflow-hidden">
              <span className="text-[#D7E8DF]/45 text-[9px] sm:text-[11px] font-sans font-normal shrink-0">&#10230;</span>
              <span className="text-[#EEF7F2] text-[7px] xs:text-[8px] sm:text-[8.5px] md:text-[9px] font-semibold tracking-[1px] xs:tracking-[2px] sm:tracking-[2.5px] uppercase font-sans whitespace-nowrap shrink-0">
                TIMELESS MOMENTS. ETERNAL MEMORIES
              </span>
              <span className="text-[#D7E8DF]/45 text-[9px] sm:text-[11px] font-sans font-normal shrink-0">&#10231;</span>
            </div>

            {/* Title */}
            <div className="flex flex-col space-y-0.5">
              <h2 className="font-serif text-[22px] sm:text-[28px] md:text-[32px] text-white font-normal leading-[1.1] tracking-tight">
                Stories Today,
              </h2>
              <div className="flex flex-col items-start">
                <span className="font-script text-[26px] sm:text-[32px] md:text-[38px] text-[#EEF7F2] tracking-wide leading-none">Treasures Forever.</span>
                {/* Subtle flourish SVG below subtitle */}
                <svg className="w-9 h-2 text-[#D7E8DF]/30 mt-0.5 fill-current" viewBox="0 0 100 20">
                  <path d="M10 10 C 30 20, 40 0, 50 10 C 60 20, 70 0, 90 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </div>

            {/* Description */}
            <p
              className="!text-[10px] sm:!text-[11.5px] md:!text-[12.5px] font-medium leading-relaxed max-w-[540px] font-sans"
              style={{ color: '#ffffff' }}
            >
              We capture the raw emotions, candid moments, and intricate details that make your wedding uniquely yours.
            </p>

            {/* Feature Icons Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-2 pt-0.5 w-full">
              {/* Feature 1 */}
              <div className="group flex flex-row sm:flex-col items-center sm:items-start gap-1.5 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
                <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full border border-[#D7E8DF]/30 flex items-center justify-center text-[#EEF7F2] group-hover:bg-[#EEF7F2] group-hover:text-[#0b3d34] group-hover:border-[#EEF7F2] group-hover:scale-105 transition-all duration-300 shadow-[0_4px_12px_rgba(238,247,242,0.03)] shrink-0">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <circle cx="12" cy="13" r="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex flex-col font-sans">
                  <span className="!text-[8px] sm:!text-[9.5px] font-semibold uppercase tracking-wider text-white group-hover:text-[#EEF7F2] transition-colors duration-300">Photography</span>
                  <span className="!text-[6.5px] sm:!text-[8px] text-[#D7E8DF]/80 mt-0.5 group-hover:text-white transition-colors duration-300">With Emotion</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group flex flex-row sm:flex-col items-center sm:items-start gap-1.5 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
                <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full border border-[#D7E8DF]/30 flex items-center justify-center text-[#EEF7F2] group-hover:bg-[#EEF7F2] group-hover:text-[#0b3d34] group-hover:border-[#EEF7F2] group-hover:scale-105 transition-all duration-300 shadow-[0_4px_12px_rgba(238,247,242,0.03)] shrink-0">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125V10.5h19.5v7.875c0 .621-.504 1.125-1.125 1.125H3.375z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 10.5V6.75A1.125 1.125 0 013.375 5.625h17.25a1.125 1.125 0 011.125 1.125V10.5H2.25z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 5.625L8.25 10.5m4.5-4.875L15 10.5m4.5-4.875L21.75 10.5" />
                  </svg>
                </div>
                <div className="flex flex-col font-sans">
                  <span className="!text-[8px] sm:!text-[9.5px] font-semibold uppercase tracking-wider text-white group-hover:text-[#EEF7F2] transition-colors duration-300">Cinematography</span>
                  <span className="!text-[6.5px] sm:!text-[8px] text-[#D7E8DF]/80 mt-0.5 group-hover:text-white transition-colors duration-300">With Soul</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group flex flex-row sm:flex-col items-center sm:items-start gap-1.5 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
                <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full border border-[#D7E8DF]/30 flex items-center justify-center text-[#EEF7F2] group-hover:bg-[#EEF7F2] group-hover:text-[#0b3d34] group-hover:border-[#EEF7F2] group-hover:scale-105 transition-all duration-300 shadow-[0_4px_12px_rgba(238,247,242,0.03)] shrink-0">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5a1.5 1.5 0 00-2.12 0l-5.38 5.38a1.5 1.5 0 01-2.12 0L5 14" />
                  </svg>
                </div>
                <div className="flex flex-col font-sans">
                  <span className="!text-[8px] sm:!text-[9.5px] font-semibold uppercase tracking-wider text-white group-hover:text-[#EEF7F2] transition-colors duration-300 whitespace-nowrap sm:whitespace-normal">Artistic Story</span>
                  <span className="!text-[6.5px] sm:!text-[8px] text-[#D7E8DF]/80 mt-0.5 group-hover:text-white transition-colors duration-300">With Heart</span>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group flex flex-row sm:flex-col items-center sm:items-start gap-1.5 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
                <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full border border-[#D7E8DF]/30 flex items-center justify-center text-[#EEF7F2] group-hover:bg-[#EEF7F2] group-hover:text-[#0b3d34] group-hover:border-[#EEF7F2] group-hover:scale-105 transition-all duration-300 shadow-[0_4px_12px_rgba(238,247,242,0.03)] shrink-0">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </div>
                <div className="flex flex-col font-sans">
                  <span className="!text-[8px] sm:!text-[9.5px] font-semibold uppercase tracking-wider text-white group-hover:text-[#EEF7F2] transition-colors duration-300">Memories</span>
                  <span className="!text-[6.5px] sm:!text-[8px] text-[#D7E8DF]/80 mt-0.5 group-hover:text-white transition-colors duration-300">For a Lifetime</span>
                </div>
              </div>
            </div>

            {/* Explore Button */}
            <div className="w-full flex justify-center sm:justify-start pt-1">
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center gap-1.5 px-4 h-[34px] border border-[#D7E8DF]/60 hover:bg-[#EEF7F2] hover:text-[#0b3d34] text-[#EEF7F2] font-semibold text-[9.5px] uppercase tracking-widest rounded-[6px] transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(238,247,242,0.2)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>EXPLORE OUR WORK</span>
                <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Generated HD Indian Couple Image */}
          <div className="lg:col-span-6 relative w-full h-[160px] xs:h-[180px] sm:h-[260px] lg:h-[320px] rounded-[24px] overflow-hidden border border-[#D7E8DF]/15 shadow-[0_20px_50px_rgba(0,0,0,0.4)] group select-none animate-[fadeIn_1s_ease-out_0.2s]">
            <Image
              src="/couple_green.png"
              alt="Om Photography signature wedding couple editorial shoot"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              priority
              className="object-cover group-hover:scale-103 transition-transform duration-700 select-none pointer-events-none"
            />
            {/* Soft gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b3d34]/40 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS / CLIENT REVIEWS */}
      <section className="bg-[#F5FBF8] border-t border-[#D9E6E0] py-10 md:py-12 px-4 sm:px-6 md:px-12 xl:px-24">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <div className="font-script text-[22px] md:text-[36px] text-[#1F6F63] mb-0.5">Testimonials</div>
          <h2 className="font-serif text-[22px] sm:text-[32px] md:text-[42px] text-[#18352F] font-normal tracking-tight text-center mb-3 md:mb-8">
            Words From Our Beautiful Couples
          </h2>

          {/* Carousel Slider */}
          <div className="max-w-[1440px] mx-auto relative w-full group mt-2">
            {/* Left Arrow Button */}
            <button
              onClick={() => {
                if (testimonialsScrollRef.current) {
                  testimonialsScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
                }
              }}
              className="hidden sm:flex absolute left-[-16px] md:left-[-24px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-[2px] border border-[#D9E6E0] rounded-full items-center justify-center text-[#18352F] hover:bg-[#0F5C4D] hover:text-white transition-all duration-300 shadow-md hover:scale-105"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scroll Container */}
            <div
              ref={testimonialsScrollRef}
              className="w-full flex gap-3 md:gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory px-2 py-3 scroll-smooth"
            >
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] snap-start bg-white border border-[#D9E6E0] rounded-[18px] p-4 sm:p-5 md:p-6 flex flex-col items-start text-left shadow-[0_10px_30px_rgba(15,92,77,0.03)]"
                >
                  <div className="flex items-center gap-3.5 md:gap-4 mb-4 w-full">
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-[#0F5C4D] shrink-0">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="(max-width: 768px) 48px, 56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <div className="flex items-center gap-0.5 text-[#0F5C4D] mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <h4 className="font-serif text-[15px] md:text-[17px] font-semibold text-[#18352F] leading-tight">
                        {t.name}
                      </h4>
                      <span className="text-[9px] md:text-[10px] text-[#0F5C4D] uppercase tracking-[0.5px] mt-0.5 font-sans">
                        {t.location}
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-[#5E6C66] leading-[1.45] italic font-inter"
                    style={{ fontSize: '13px' }}
                  >
                    {t.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={() => {
                if (testimonialsScrollRef.current) {
                  testimonialsScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
                }
              }}
              className="hidden sm:flex absolute right-[-16px] md:right-[-24px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-[2px] border border-[#D9E6E0] rounded-full items-center justify-center text-[#18352F] hover:bg-[#0F5C4D] hover:text-white transition-all duration-300 shadow-md hover:scale-105"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. REELS SHOWCASE / CINEMATIC MOMENTS */}
      {reels.length > 0 && (
        <section className="bg-white border-t border-[#D9E6E0] py-10 md:py-12 px-4 sm:px-6 md:px-12 xl:px-24">
          {/* Title / Header */}
          <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center mb-4 md:mb-8">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="w-8 h-[1px] bg-[#0F5C4D]" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#0F5C4D] font-bold">
                Cinematic Moments
              </span>
              <span className="w-8 h-[1px] bg-[#0F5C4D]" />
            </div>
            <h2 className="font-serif text-[28px] sm:text-[38px] md:text-[48px] text-[#18352F] font-normal tracking-tight">
              Experience Our <span className="font-script text-[#1F6F63] italic font-normal">Reels</span>
            </h2>
            <p className="text-[#5E6C66] !text-[11px] sm:!text-[15px] md:!text-[18px] lg:!text-[20px] mt-1.5 max-w-[550px] leading-relaxed">
              Short stories. Big emotions. Watch our latest wedding reels and feel the magic we create behind the lens.
            </p>
          </div>

          {/* Carousel Slider */}
          <div className="max-w-[1440px] mx-auto relative w-full group">
            {/* Left Arrow Button */}
            <button
              onClick={() => scroll("left")}
              className="hidden sm:flex absolute left-[-16px] md:left-[-24px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-[2px] border border-[#D9E6E0] rounded-full items-center justify-center text-[#18352F] hover:bg-[#0F5C4D] hover:text-white transition-all duration-300 shadow-md hover:scale-105"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scroll Container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="w-full flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory px-2 py-2.5 scroll-smooth"
            >
              {reels.map((reel) => (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  isMuted={unmutedReelId !== reel.id}
                  onToggleMute={() => {
                    setUnmutedReelId((prev) => (prev === reel.id ? null : reel.id));
                  }}
                />
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={() => scroll("right")}
              className="hidden sm:flex absolute right-[-16px] md:right-[-24px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-[2px] border border-[#D9E6E0] rounded-full items-center justify-center text-[#18352F] hover:bg-[#0F5C4D] hover:text-white transition-all duration-300 shadow-md hover:scale-105"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Indicators (Dots) */}
          <div className="flex justify-center gap-2 mt-6">
            {reels.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${activeDot === idx ? "w-6 bg-[#0F5C4D]" : "w-2 bg-[#DCEFE8] hover:bg-[#0F5C4D]/40"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="max-w-[1000px] mx-auto mt-12 md:mt-16 bg-[#F5FBF8] border border-[#D9E6E0] rounded-[20px] sm:rounded-[24px] p-4.5 sm:p-4.5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-3.5 md:gap-5 shadow-[0_10px_40px_rgba(15,92,77,0.03)] hover:shadow-[0_15px_45px_rgba(15,92,77,0.06)] transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4 text-left">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-[#DCEFE8] flex items-center justify-center text-[#0F5C4D] shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                  <line x1="7" y1="2" x2="7" y2="22" />
                  <line x1="17" y1="2" x2="17" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="2" y1="7" x2="7" y2="7" />
                  <line x1="2" y1="17" x2="7" y2="17" />
                  <line x1="17" y1="17" x2="22" y2="17" />
                  <line x1="17" y1="7" x2="22" y2="7" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-[#18352F]">
                  Love what you see?
                </h4>
                <p className="text-[#5E6C66] text-[10px] sm:text-[11px] md:text-[12.5px] mt-0.5 leading-relaxed">
                  Let us capture your story in the most beautiful way.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full md:w-auto self-stretch md:self-auto shrink-0">
              <a
                href="/contact"
                className="w-full sm:w-auto h-[38px] sm:h-[40px] md:h-[44px] px-4 sm:px-6 whitespace-nowrap bg-[#0F5C4D] text-white rounded-[10px] sm:rounded-[12px] flex items-center justify-center gap-2 font-semibold text-[11.5px] sm:text-[12px] md:text-[13px] hover:bg-[#083D34] hover:scale-[1.02] transition-all duration-300 shadow-md shadow-[#0F5C4D]/10"
              >
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19.82 2H4.18C2.97 2 2 2.97 2 4.18v15.64C2 21.03 2.97 22 4.18 22h15.64c1.21 0 2.18-.97 2.18-2.18V4.18C22 2.97 21.03 2 19.82 2z" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span>BOOK A SESSION</span>
              </a>
              <a
                href="/portfolio"
                className="w-full sm:w-auto h-[38px] sm:h-[40px] md:h-[44px] px-4 sm:px-6 whitespace-nowrap border-2 border-[#D9E6E0] bg-white text-[#0f5c4d] hover:border-[#0F5C4D] hover:bg-[#F5FBF8] rounded-[10px] sm:rounded-[12px] flex items-center justify-center gap-2 font-semibold text-[11.5px] sm:text-[12px] md:text-[13px] transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                <span>VIEW PORTFOLIO</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 8. FAQ SECTION */}
      <section id="faq" className="relative bg-[#FDFAF5] py-14 md:py-20 px-4 md:px-6 overflow-hidden">
        {/* Subtle warm dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]"
          style={{ backgroundImage: 'radial-gradient(circle, #0F5C4D15 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        {/* Brand green top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0F5C4D] to-transparent" />

        <div className="max-w-[900px] mx-auto relative z-10">

          {/* Section header */}
          <div className="text-center mb-8 md:mb-14">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="w-8 md:w-10 h-[1px] bg-[#0F5C4D]" />
              <span className="text-[#0F5C4D] text-[10px] md:text-[11px] font-sans font-semibold tracking-[2px] md:tracking-[4px] uppercase">Got Questions?</span>
              <span className="w-8 md:w-10 h-[1px] bg-[#0F5C4D]" />
            </div>
            <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[48px] font-bold text-[#1A1A1A] leading-tight">
              Frequently Asked <span className="text-[#0F5C4D] italic">Questions</span>
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
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0F5C4D] text-white font-semibold text-[12px] md:text-[13px] tracking-[1.5px] md:tracking-[2px] uppercase px-5 py-3 md:px-8 md:py-3.5 rounded-[6px] hover:bg-[#1F6F63] transition-all duration-300 shadow-[0_4px_20px_rgba(15,92,77,0.15)]"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ask Us Directly
            </a>
          </div>

          {/* Elegant decorative visible divider */}
          <div className="flex items-center justify-center gap-4 max-w-[420px] mx-auto mt-16 md:mt-20">
            <div className="h-[1.5px] bg-gradient-to-r from-transparent via-[#0F5C4D]/40 to-[#0F5C4D]/10 flex-grow" />
            <div className="flex items-center gap-2 text-[#0F5C4D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D]/40" />
              <div className="p-2 rounded-full border border-[#0F5C4D]/25 bg-white shadow-sm flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-[#0F5C4D] stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D]/40" />
            </div>
            <div className="h-[1.5px] bg-gradient-to-l from-transparent via-[#0F5C4D]/40 to-[#0F5C4D]/10 flex-grow" />
          </div>
        </div>

        {/* Symmetric Brand Green Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0F5C4D] to-transparent" />
      </section>

      {/* 9. FOOTER (Bottom Section) */}
      <Footer />


      {/* ─── FLOATING CONTACT US BUTTON ──────────────────────────────────────── */}
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[80] flex flex-col items-center gap-1 group">
        <button
          onClick={() => setContactModalOpen(true)}
          className="relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#0F5C4D] text-white shadow-[0_8px_28px_rgba(15,92,77,0.3)] hover:shadow-[0_12px_40px_rgba(15,92,77,0.45)] hover:bg-[#1F6F63] active:scale-95 transition-all duration-300 border border-white/10"
          aria-label="Open contact hub"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-[#0F5C4D]/35 animate-ping pointer-events-none" />

          {/* Call icon */}
          <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Small merging text directly below */}
        <span className="font-sans font-bold text-[7px] md:text-[8px] tracking-[1px] uppercase text-[#0F5C4D] bg-white/95 border border-[#0F5C4D]/15 px-2 py-0.5 rounded-full shadow-md transition-all duration-300 group-hover:bg-[#0F5C4D] group-hover:text-white pointer-events-none select-none">
          Contact Us
        </span>
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
              className="w-full max-w-[340px] md:max-w-[440px] bg-white border border-[#0F5C4D]/25 rounded-[18px] shadow-[0_20px_50px_rgba(15,92,77,0.15)] overflow-hidden transition-all duration-300 ease-out transform pointer-events-auto scale-100 opacity-100"
            >
              {/* Header section with cover gradient */}
              <div className="bg-gradient-to-r from-white to-[#F5FBF8]/40 p-3.5 border-b border-[#D9E6E0] relative">
                {/* Close button */}
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 flex items-center justify-center text-[#18352F]/70 hover:text-[#0F5C4D] hover:border-[#0F5C4D]/30 active:scale-95 transition-all duration-200"
                  aria-label="Close contact card"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Brand Logo inside contact card */}
                <div className="flex items-center gap-2 select-none">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#0F5C4D]/25 bg-white shrink-0">
                    <Image
                      src="/logo.png"
                      alt="OM Photo Studio Logo"
                      fill
                      sizes="36px"
                      className="object-cover scale-[1.2]"
                    />
                  </div>
                  <div className="flex flex-col leading-none">
                    <div className="flex items-center gap-1">
                      <span className="font-serif text-[17px] font-bold text-[#0F5C4D] tracking-wide leading-none">OM</span>
                      <span className="font-serif text-[17px] font-bold text-[#18352F] tracking-wide leading-none">PHOTO STUDIO</span>
                    </div>
                    <span className="font-sans text-[6.5px] font-medium text-[#5E6C66] tracking-[0.3em] mt-0.5 uppercase">Premium Photography</span>
                  </div>
                </div>
                <div className="text-[#5E6C66] font-serif italic text-[11px] md:text-[12.5px] mt-1.5">
                  Let&apos;s turn your dream moments into timeless visual art.
                </div>
              </div>

              {/* Body content */}
              <div className="p-4 space-y-3">
                {/* Quick Primary Actions */}
                <div className="grid grid-cols-2 gap-2">
                  {/* WhatsApp instant chat */}
                  <a
                    href="https://wa.me/916265303386?text=Hi%20Om%20Photography,%20I'd%20like%20to%20inquire%20about%20your%20services!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center py-2 px-1.5 rounded-[10px] bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all duration-300 text-center group"
                  >
                    <div className="w-7.5 h-7.5 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow mb-1.5 group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.11-2.884-6.974-1.862-1.865-4.337-2.893-6.979-2.895-5.438 0-9.866 4.42-9.869 9.866-.001 1.765.485 3.491 1.408 4.98l-.323 1.182.164.159c.775-.758 1.621-1.584 2.158-1.921zm10.594-5.28c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      </svg>
                    </div>
                    <span className="font-bold text-[10px] text-[#18352F] tracking-wide">WhatsApp Us</span>
                    <span className="text-[8px] text-[#5E6C66] mt-0.5">Instant chat reply</span>
                  </a>

                  {/* Direct call */}
                  <a
                    href="tel:+916265303386"
                    className="flex flex-col items-center justify-center py-2 px-1.5 rounded-[10px] bg-[#0F5C4D]/10 border border-[#0F5C4D]/30 hover:bg-[#0F5C4D]/20 transition-all duration-300 text-center group"
                  >
                    <div className="w-7.5 h-7.5 rounded-full bg-[#0F5C4D] text-white flex items-center justify-center shadow mb-1.5 group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <span className="font-bold text-[10px] text-[#18352F] tracking-wide">Call Direct</span>
                    <span className="text-[8px] text-[#5E6C66] mt-0.5">+91 62653 03386</span>
                  </a>
                </div>

                {/* Email card */}
                <a
                  href="mailto:om.photography.2003@gmail.com"
                  className="flex items-center gap-2.5 p-2.5 rounded-[10px] bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 hover:bg-[#0F5C4D]/10 transition-all duration-200 group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0F5C4D]/15 border border-[#0F5C4D]/30 flex items-center justify-center text-[#0F5C4D] group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h4 className="text-[9.5px] font-bold text-[#18352F] font-sans uppercase tracking-wider">Email Address</h4>
                    <div className="text-[12px] md:text-[13px] text-[#5E6C66] mt-0.5 font-inter truncate">om.photography.2003@gmail.com</div>
                  </div>
                  <svg className="w-3 h-3 text-[#0F5C4D]/40 group-hover:text-[#0F5C4D]/80 transition-colors shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* Reach Us / Location Map link */}
                <a
                  href="https://www.google.com/search?client=ms-android-xiaomi-rvo2b&sca_esv=598771579&sxsrf=ACQVn0-D-HT2u5mkksMuOOz7zgfWYIi8iA:1705402659306&q=om+photography+studio+umaria&ludocid=15290579333970816527&ibp=gwp;0,7&lsig=AB86z5WoWqUIwEp0XlGIRlX2IOa7&kgs=9f3f4c0e2129f922&shndl=-1&shem=lcsnce,lsp&source=sh/x/loc/act/m1/2&fbclid=PARlRTSAODu9tleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafMKLMGpgkVXFGnHl9WDfB8Hsbk8gj1Cx7fNUL8ViaIB6PjBW8rcjryHSnYxA_aem_9mav3X1IKAYqLf86BLoKSQ#lpg=cid:CgIgAQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-[10px] bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 hover:bg-[#0F5C4D]/10 transition-all duration-200 group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0F5C4D]/15 border border-[#0F5C4D]/30 flex items-center justify-center text-[#0F5C4D] group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <svg className="w-3.5 h-3.5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h4 className="text-[9.5px] font-bold text-[#18352F] font-sans uppercase tracking-wider">Reach Our Studio</h4>
                    <div className="text-[11.5px] md:text-[12.5px] text-[#5E6C66] mt-0.5 leading-snug font-inter">Umaria, Madhya Pradesh, India</div>
                  </div>
                  <span className="text-[7px] font-bold tracking-wider text-[#0F5C4D] uppercase bg-[#DCEFE8] px-1.5 py-0.5 rounded-[4px] border border-[#0F5C4D]/20 group-hover:bg-[#0F5C4D] group-hover:text-white transition-all duration-200 shrink-0">MAPS</span>
                </a>

                {/* Social Hub Grid */}
                <div className="space-y-1.5">
                  <h4 className="text-[8.5px] font-bold text-[#5E6C66]/65 tracking-[2px] uppercase text-left">Connect Socially</h4>
                  <div className="grid grid-cols-4 gap-1.5">
                    {/* Instagram */}
                    <a href="https://www.instagram.com/om_photography_03?igsh=eWxqdmxkazBiczV3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-1.5 rounded-[8px] bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 hover:border-[#0F5C4D]/45 hover:bg-[#0F5C4D]/10 transition-all duration-200 text-center group">
                      <svg className="w-[15px] h-[15px] text-[#5E6C66] group-hover:text-[#0F5C4D] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span className="text-[7px] text-[#5E6C66] mt-0.5 font-medium group-hover:text-[#0F5C4D] transition-colors">Insta</span>
                    </a>
                    {/* Google */}
                    <a href="https://www.google.com/search?client=ms-android-xiaomi-rvo2b&sca_esv=598771579&sxsrf=ACQVn0-D-HT2u5mkksMuOOz7zgfWYIi8iA:1705402659306&q=om+photography+studio+umaria&ludocid=15290579333970816527&ibp=gwp;0,7&lsig=AB86z5WoWqUIwEp0XlGIRlX2IOa7&kgs=9f3f4c0e2129f922&shndl=-1&shem=lcsnce,lsp&source=sh/x/loc/act/m1/2&fbclid=PARlRTSAODu9tleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafMKLMGpgkVXFGnHl9WDfB8Hsbk8gj1Cx7fNUL8ViaIB6PjBW8rcjryHSnYxA_aem_9mav3X1IKAYqLf86BLoKSQ#lpg=cid:CgIgAQ%3D%3D" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-1.5 rounded-[8px] bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 hover:border-[#0F5C4D]/45 hover:bg-[#0F5C4D]/10 transition-all duration-200 text-center group">
                      <svg className="w-[15px] h-[15px] text-[#5E6C66] group-hover:text-[#0F5C4D] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <span className="text-[7px] text-[#5E6C66] mt-0.5 font-medium group-hover:text-[#0F5C4D] transition-colors">Google</span>
                    </a>
                    {/* YouTube */}
                    <a href="https://m.youtube.com/@omphotographystudio.official?fbclid=PAZnRzaAODu_NleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAac9p8kszjJx8y0vAuXY93OJy0jVchfefxxybdYoADD-1rke0ziUeEv6WUcqAQ_aem_4oboO1MZffI7ucoZx3GI4A" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-1.5 rounded-[8px] bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 hover:border-[#0F5C4D]/45 hover:bg-[#0F5C4D]/10 transition-all duration-200 text-center group">
                      <svg className="w-[15px] h-[15px] text-[#5E6C66] group-hover:text-[#0F5C4D] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span className="text-[7px] text-[#5E6C66] mt-0.5 font-medium group-hover:text-[#0F5C4D] transition-colors">YouTube</span>
                    </a>
                    {/* Playbook */}
                    <a href="https://www.playbook.com/s/om-photography-studio/qaRvyLkianwVsDc7af7s9beB?fbclid=PAZnRzaAODvBZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadt_floTsP79qOiPtl_cqlNNvQjJ9FB1z4e0hreXr38Ha4nie0xD-bFL2QsrA_aem_536eCA57LsptfeKiZ_AtvQ" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-1.5 rounded-[8px] bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 hover:border-[#0F5C4D]/45 hover:bg-[#0F5C4D]/10 transition-all duration-200 text-center group">
                      <svg className="w-[15px] h-[15px] text-[#5E6C66] group-hover:text-[#0F5C4D] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.008 1.24l.885 1.77a2.25 2.25 0 0 0 2.007 1.24h1.98a2.25 2.25 0 0 0 2.007-1.24l.885-1.77a2.25 2.25 0 0 1 2.007-1.24h3.86m-18 0h18a2.25 2.25 0 0 1 2.25 2.25v4.5A2.25 2.25 0 0 1 20.25 21.75h-16.5A2.25 2.25 0 0 1 1.5 19.5v-4.5a2.25 2.25 0 0 1 2.25-2.25m0-9h16.5A2.25 2.25 0 0 1 22.5 6v4.5a2.25 2.25 0 0 1-2.25 2.25h-16.5A2.25 2.25 0 0 1 1.5 10.5V6A2.25 2.25 0 0 1 3.75 3.75Z" />
                      </svg>
                      <span className="text-[7px] text-[#5E6C66] mt-0.5 font-medium group-hover:text-[#0F5C4D] transition-colors">Playbook</span>
                    </a>
                  </div>
                </div>

                {/* Timings & Availability */}
                <div className="bg-[#0F5C4D]/5 border border-[#0F5C4D]/10 rounded-[10px] p-2.5">
                  <div className="flex items-center justify-between text-[9px] text-[#5E6C66] mb-1">
                    <span className="font-semibold uppercase tracking-wider">Studio Hours:</span>
                    <span className="font-medium text-[#18352F]">10:00 AM – 8:00 PM (IST)</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-[#5E6C66]">
                    <span className="font-semibold uppercase tracking-wider">Response Time:</span>
                    <span className="font-bold text-[#25D366]">Under 1 Hour</span>
                  </div>
                </div>

              </div>{/* end body */}

              {/* Card Footer */}
              <div className="bg-[#F5FBF8] px-4 py-2.5 border-t border-[#D9E6E0] text-center">
                <span className="text-[9px] tracking-[2px] font-bold text-[#0F5C4D] uppercase">OM PHOTOGRAPHY</span>
                <span className="text-[8px] text-[#5E6C66]/70 block mt-0.5">© 2026. All Rights Reserved.</span>
              </div>

            </div>{/* end card */}
          </div>{/* end centering wrapper */}
        </>
      )}

      {/* LIGHTBOX / IMAGE VIEWER */}
      {lightboxIndex !== null && masonryGallery[lightboxIndex as number] && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200">
          <div className="h-[55px] px-5 border-b border-white/10 flex justify-between items-center text-white bg-black/40">
            <div className="text-xs font-sans text-white/70">
              {(lightboxIndex as number) + 1} of {masonryGallery.length}
            </div>
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setIsPlayingSlideshow(!isPlayingSlideshow)}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                title={isPlayingSlideshow ? "Pause" : "Play"}
              >
                {isPlayingSlideshow ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={() => setLightboxZoom(!lightboxZoom)}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                title="Zoom"
              >
                <ZoomIn size={16} className={lightboxZoom ? "text-[#0F5C4D]" : ""} />
              </button>
              <a
                href={masonryGallery[lightboxIndex as number].url}
                download={`om-photography-${lightboxIndex as number}.jpg`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                title="Download"
              >
                <Download size={16} />
              </a>
              <div className="w-[1px] h-3.5 bg-white/20" />
              <button onClick={handleCloseLightbox} className="p-1.5 hover:bg-white/10 rounded-md transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center p-4">
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-[#0F5C4D] hover:border-[#0F5C4D] transition-all z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <div
              className={`relative max-w-full max-h-[80vh] flex items-center justify-center transition-all duration-300 ${lightboxZoom ? "scale-125 cursor-zoom-out" : "scale-100"
                }`}
              onClick={() => setLightboxZoom(!lightboxZoom)}
            >
              <img
                src={masonryGallery[lightboxIndex as number].url}
                alt={masonryGallery[lightboxIndex as number].category}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
              />
            </div>
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-[#0F5C4D] hover:border-[#0F5C4D] transition-all z-10"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="h-[50px] px-5 border-t border-white/10 flex items-center justify-center bg-black/40 text-white/60 text-[11px] font-sans">
            <div>
              <span className="text-[#0F5C4D] font-semibold uppercase mr-1.5">
                {masonryGallery[lightboxIndex as number].category}
              </span>
              | &copy; OM Photography
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
