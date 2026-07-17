"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { Printer, BookOpen, Palette, Zap, Gift, Camera, Award, Users, Heart } from "lucide-react";
export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut" as const
      },
    }),
    hidden: {
      filter: "blur(6px)",
      y: 20,
      opacity: 0,
    },
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-[#18352F] overflow-x-hidden font-sans scroll-smooth flex flex-col justify-between">
      <Header />

      <main className="flex-grow">
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[210px] sm:h-[240px] md:h-[48vh] md:min-h-[420px] md:max-h-[500px] mt-16 md:mt-0 pt-[var(--header-height)] flex items-center justify-center bg-[#F5FBF8] overflow-hidden border-b border-[#D9E6E0]">
          
          {/* Left Background Image (Full height, Black & White, Merged) */}
          <div className="absolute left-0 top-[var(--header-height)] bottom-0 aspect-[3/4] md:aspect-[4/5] lg:aspect-[1/1] pointer-events-none z-0 overflow-hidden select-none hidden md:block">
            <div className="relative w-full h-full">
              <Image
                src="https://res.cloudinary.com/eksh1jyi/image/upload/v1783963917/portfolio/file_g8qhae.jpg"
                alt="Wedding Moment Left"
                fill
                sizes="(max-width: 768px) 35vw, 30vw"
                priority
                className="object-cover object-top filter grayscale saturate-0 contrast-[1.0] opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5FBF8]/40 via-[#F5FBF8]/80 to-[#F5FBF8] z-10" />
            </div>
          </div>

          {/* Right Background Image (Full height, Black & White, Merged) */}
          <div className="absolute left-0 right-0 top-[var(--header-height)] bottom-0 w-full md:left-auto md:right-0 md:w-auto md:aspect-[4/5] lg:aspect-[1/1] pointer-events-none z-0 overflow-hidden select-none hidden md:block">
            <div className="relative w-full h-full">
              <Image
                src="https://res.cloudinary.com/eksh1jyi/image/upload/v1783963497/portfolio/file_vfd73b.jpg"
                alt="Photographer Right"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                priority
                className="object-cover object-top filter grayscale saturate-0 contrast-[1.0] opacity-50 md:opacity-80"
              />
              <div className="absolute inset-0 bg-[#F5FBF8]/60 md:bg-transparent md:bg-gradient-to-l md:from-transparent md:via-[#F5FBF8]/40 md:via-[#F5FBF8]/80 md:to-[#F5FBF8] z-10" />
            </div>
          </div>

          {/* Center Content - Compact & Fitting */}
          <div className="relative z-10 max-w-[90%] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[850px] mx-auto px-4 text-center flex flex-col items-center justify-center">
            
            {/* Small Badge */}
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.25em] font-bold text-[#0F5C4D]">
                • ABOUT OM PHOTOGRAPHY •
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-[24px] xs:text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] text-[#18352F] font-normal leading-tight tracking-tight mb-1">
              Our Story. Your Memories.
            </h1>
            <div className="font-script text-[42px] xs:text-[50px] sm:text-[58px] md:text-[72px] lg:text-[80px] text-[#1F6F63] leading-none select-none mb-2 md:mb-3">
              Timeless Forever.
            </div>

            {/* Gold Divider Line */}
            <div className="w-12 h-[1px] bg-[#C5A880]/60 my-2 md:my-3 mx-auto"></div>

            {/* Short Description */}
            <p className="hidden md:block text-[#5E6C66] md:text-[15px] lg:text-[17px] leading-relaxed max-w-[95%] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[700px] mx-auto mb-0 font-inter">
              We are a passionate team of photographers, filmmakers, and dreamers dedicated to capturing the real emotions, beautiful moments, and unforgettable stories of your life.
            </p>

          </div>

        </section>

        {/* Bottom Decorative Emblem (Placed outside overflow-hidden hero) */}
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
        {/* 2. THE FOUNDER'S STORY & BIO */}
        <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 md:px-12 xl:px-24 bg-white">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Column: Image Grid exactly like the reference image */}
            <div className="lg:col-span-6 w-full relative">
              <div className="grid grid-cols-12 gap-2 md:gap-3 items-stretch h-full">
                
                {/* Main Large Image (Photographer) */}
                <div className="col-span-8 relative rounded-[24px] overflow-hidden border border-[#D9E6E0]/60 shadow-[0_10px_35px_rgba(0,0,0,0.04)] aspect-[3/4] lg:aspect-auto lg:h-[480px]">
                  <Image
                    src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80"
                    alt="Om - Lead Photographer"
                    fill
                    className="object-cover hover:scale-102 transition-transform duration-500 select-none pointer-events-none"
                    sizes="(max-width: 768px) 60vw, 400px"
                  />
                  
                  {/* Floating Memories Captured badge at bottom-left */}
                  <div className="absolute bottom-2.5 left-2.5 md:bottom-4 md:left-4 bg-[#073B30] text-white p-2 md:p-3.5 pr-3.5 md:pr-6 rounded-[12px] md:rounded-[18px] shadow-[0_8px_24px_rgba(7,59,48,0.25)] border border-white/10 flex items-center gap-1.5 md:gap-2.5">
                    <div className="w-6 h-6 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Camera className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" />
                    </div>
                    <div>
                      <div className="text-[12px] md:text-[20px] font-bold font-serif leading-none text-[#9FDDC1]">15,000+</div>
                      <div className="text-[7.5px] md:text-[9px] uppercase tracking-wider text-white/70 mt-0.5 md:mt-1 leading-none">Memories</div>
                    </div>
                  </div>
                </div>

                {/* Vertical Stack of 3 smaller images */}
                <div className="col-span-4 flex flex-col justify-between gap-2 md:gap-3 h-full">
                  <div className="relative flex-1 rounded-[16px] overflow-hidden border border-[#D9E6E0]/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)] min-h-[60px] md:min-h-[100px] lg:min-h-[148px] aspect-square md:aspect-[4/3] lg:aspect-auto">
                    <Image
                      src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&h=400&q=80"
                      alt="Wedding Drone Coverage"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                      sizes="(max-width: 768px) 30vw, 200px"
                    />
                  </div>
                  <div className="relative flex-1 rounded-[16px] overflow-hidden border border-[#D9E6E0]/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)] min-h-[60px] md:min-h-[100px] lg:min-h-[148px] aspect-square md:aspect-[4/3] lg:aspect-auto">
                    <Image
                      src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&h=400&q=80"
                      alt="Professional Camera Gear"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                      sizes="(max-width: 768px) 30vw, 200px"
                    />
                  </div>
                  <div className="relative flex-1 rounded-[16px] overflow-hidden border border-[#D9E6E0]/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)] min-h-[60px] md:min-h-[100px] lg:min-h-[148px] aspect-square md:aspect-[4/3] lg:aspect-auto">
                    <Image
                      src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&h=400&q=80"
                      alt="Couple Sunset Portrait"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500 select-none pointer-events-none"
                      sizes="(max-width: 768px) 30vw, 200px"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Founder Intro Text */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 md:space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 justify-center lg:justify-start">
                <span className="w-6 h-[1px] bg-[#0F5C4D]/30" />
                <span className="w-1.5 h-1.5 bg-[#0F5C4D] rotate-45" />
                <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#1F6F63] font-sans">
                  FOUNDER & LEAD PHOTOGRAPHER
                </span>
                <span className="w-1.5 h-1.5 bg-[#0F5C4D] rotate-45" />
                <span className="w-6 h-[1px] bg-[#0F5C4D]/30" />
              </div>

              {/* Heading */}
              <div className="flex flex-col items-center lg:items-start w-full">
                <h2 className="font-serif text-[22px] xs:text-[25px] sm:text-[34px] md:text-[40px] text-[#18352F] font-medium leading-[1.2] tracking-tight">
                  Capturing Love in Its Purest,
                  <span className="block font-serif italic text-[#1F6F63] font-light mt-1">Most Authentic Form.</span>
                </h2>
                
                {/* Decorative wavy flourish */}
                <svg width="220" height="12" viewBox="0 0 220 12" fill="none" className="mt-3 text-[#C5A880] mx-auto lg:mx-0 w-[180px] xs:w-[220px] h-auto">
                  <path d="M2 10C35 10 35 2 68 2C101 2 101 10 134 10C167 10 167 2 200 2C208 2 214 4.5 218 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Bio Descriptions */}
              <div className="space-y-3.5 text-[#5E6C66] leading-[1.6] font-inter text-center lg:text-left">
                <p className="!text-[12.5px] sm:!text-[13.5px] md:!text-[14.5px]">
                  Hi, I am Om, the lead photographer and founder of Om Photography. With over a decade of capturing premium luxury weddings across India and worldwide, our vision is simple: <strong className="text-[#18352F]">to capture your lifetime memories realistically.</strong>
                </p>

                <p className="!text-[12.5px] sm:!text-[13.5px] md:!text-[14.5px]">
                  We specialize in <strong className="text-[#1F6F63]">candid emotions</strong>, <strong className="text-[#1F6F63]">dramatic lighting</strong>, and cinematic story-telling. We believe that a wedding isn't just an event; it's a legacy of emotions, laughter, and tears that you will pass down for generations. Our team operates with <strong className="text-[#18352F]">micro-precision</strong>, ensuring that every fleeting moment is immortalized with editorial elegance.
                </p>
              </div>

              {/* Horizontal Stats Row like the reference image */}
              <div className="flex flex-row justify-between items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 pt-6 border-t border-[#D9E6E0] w-full">
                
                {/* Stat 1 */}
                <div className="flex items-center gap-1.5 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] shrink-0">
                    <Award size={14} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  <div>
                    <div className="text-[13px] sm:text-[16px] md:text-[22px] font-bold font-serif text-[#18352F] leading-none">10+</div>
                    <div className="text-[7.5px] sm:text-[9px] md:text-[10px] uppercase tracking-wider text-[#5E6C66] mt-1 leading-none">Experience</div>
                  </div>
                </div>
                
                <div className="h-6 w-[1px] bg-[#D9E6E0]" />

                {/* Stat 2 */}
                <div className="flex items-center gap-1.5 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] shrink-0">
                    <Users size={14} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  <div>
                    <div className="text-[13px] sm:text-[16px] md:text-[22px] font-bold font-serif text-[#18352F] leading-none">350+</div>
                    <div className="text-[7.5px] sm:text-[9px] md:text-[10px] uppercase tracking-wider text-[#5E6C66] mt-1 leading-none">Weddings</div>
                  </div>
                </div>

                <div className="h-6 w-[1px] bg-[#D9E6E0]" />

                {/* Stat 3 */}
                <div className="flex items-center gap-1.5 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] shrink-0">
                    <Heart size={14} className="md:w-[18px] md:h-[18px]" />
                  </div>
                  <div>
                    <div className="text-[13px] sm:text-[16px] md:text-[22px] font-bold font-serif text-[#18352F] leading-none">100%</div>
                    <div className="text-[7.5px] sm:text-[9px] md:text-[10px] uppercase tracking-wider text-[#5E6C66] mt-1 leading-none">Clients</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR CREATIVE VALUES */}
        <section className="hidden md:block py-10 md:py-12 px-4 sm:px-6 md:px-12 xl:px-24 bg-[#FAFDFB] border-t border-b border-[#D9E6E0]/70">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center max-w-[700px] mx-auto mb-8 md:mb-10">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center justify-center gap-3">
                <span className="w-8 h-[1px] bg-[#0F5C4D]/30" />
                <span className="w-1 h-1 bg-[#0F5C4D] rotate-45" />
                <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#1F6F63] font-sans">
                  THE PRINCIPLES WE STAND BY
                </span>
                <span className="w-1 h-1 bg-[#0F5C4D] rotate-45" />
                <span className="w-8 h-[1px] bg-[#0F5C4D]/30" />
              </div>

              <h2 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] text-[#18352F] font-medium leading-tight tracking-tight mt-3">
                Our Core Creative Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
              
              {/* Value 1 */}
              <div className="bg-white border border-[#C5A880]/20 rounded-[24px] p-6 flex flex-col items-start shadow-[0_4px_20px_rgba(15,92,77,0.01)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(15,92,77,0.04)] hover:border-[#C5A880]/50 transition-all duration-500 relative overflow-hidden group">
                {/* Accent indicator */}
                <div className="absolute top-4 right-6 font-serif text-[72px] font-bold text-[#0F5C4D]/5 select-none pointer-events-none group-hover:text-[#C5A880]/15 group-hover:scale-110 transition-all duration-500 leading-none">01</div>
                
                <div className="w-12 h-12 rounded-full bg-[#0F5C4D]/5 flex items-center justify-center text-[#0F5C4D] mb-6 group-hover:bg-[#C5A880]/10 group-hover:text-[#C5A880] transition-colors duration-500">
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <h3 className="font-serif text-[18px] md:text-[21px] text-[#18352F] font-semibold mb-3">Authentic Realism</h3>
                <p className="text-[#5E6C66] text-[13px] md:text-[14px] leading-[1.6] font-inter">
                  We believe in capturing reactions and emotions as they happen. No awkward poses or artificial scripts—just the raw, beautiful reality of your love story.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white border border-[#C5A880]/20 rounded-[24px] p-6 flex flex-col items-start shadow-[0_4px_20px_rgba(15,92,77,0.01)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(15,92,77,0.04)] hover:border-[#C5A880]/50 transition-all duration-500 relative overflow-hidden group">
                {/* Accent indicator */}
                <div className="absolute top-4 right-6 font-serif text-[72px] font-bold text-[#0F5C4D]/5 select-none pointer-events-none group-hover:text-[#C5A880]/15 group-hover:scale-110 transition-all duration-500 leading-none">02</div>
                
                <div className="w-12 h-12 rounded-full bg-[#0F5C4D]/5 flex items-center justify-center text-[#0F5C4D] mb-6 group-hover:bg-[#C5A880]/10 group-hover:text-[#C5A880] transition-colors duration-500">
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </div>
                <h3 className="font-serif text-[18px] md:text-[21px] text-[#18352F] font-semibold mb-3">Editorial Artistry</h3>
                <p className="text-[#5E6C66] text-[13px] md:text-[14px] leading-[1.6] font-inter">
                  Combining fine-art landscape composition with high-fashion lighting techniques to turn your simple portraits into magazine-worthy editorial covers.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white border border-[#C5A880]/20 rounded-[24px] p-6 flex flex-col items-start shadow-[0_4px_20px_rgba(15,92,77,0.01)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(15,92,77,0.04)] hover:border-[#C5A880]/50 transition-all duration-500 relative overflow-hidden group">
                {/* Accent indicator */}
                <div className="absolute top-4 right-6 font-serif text-[72px] font-bold text-[#0F5C4D]/5 select-none pointer-events-none group-hover:text-[#C5A880]/15 group-hover:scale-110 transition-all duration-500 leading-none">03</div>
                
                <div className="w-12 h-12 rounded-full bg-[#0F5C4D]/5 flex items-center justify-center text-[#0F5C4D] mb-6 group-hover:bg-[#C5A880]/10 group-hover:text-[#C5A880] transition-colors duration-500">
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-[18px] md:text-[21px] text-[#18352F] font-semibold mb-3">Heritage Quality</h3>
                <p className="text-[#5E6C66] text-[13px] md:text-[14px] leading-[1.6] font-inter">
                  Our craftsmanship ends with premium leather, gold-gilded heirloom albums that are made to survive generations, passing down the memory of your special day.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 4. THE EXPERIENCE PROCESS */}
        <section className="hidden md:block py-10 md:py-12 px-4 sm:px-6 md:px-12 xl:px-24 bg-white">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Process Details */}
            <div className="lg:col-span-6 flex flex-col items-start space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#0F5C4D]/30" />
                <span className="w-1.5 h-1.5 bg-[#0F5C4D] rotate-45" />
                <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#1F6F63] font-sans">
                  HOW WE WORK
                </span>
                <span className="w-1.5 h-1.5 bg-[#0F5C4D] rotate-45" />
                <span className="w-6 h-[1px] bg-[#0F5C4D]/30" />
              </div>

              <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] text-[#18352F] font-medium leading-[1.2] tracking-tight">
                A Seamless Photographic Journey
              </h2>

              <p className="text-[#5E6C66] text-[13.5px] md:text-[15px] leading-[1.7] font-inter">
                We operate with strict micro-precision. From the first consultation to the delivery of your custom album box, we ensure that your creative desires are honored.
              </p>

              {/* Vertical timeline stem list */}
              <div className="relative border-l border-[#C5A880]/30 ml-2.5 pl-6 md:ml-4 md:pl-8 space-y-6 mt-4 w-full">
                
                {/* Step 1 */}
                <div className="relative group">
                  {/* Node */}
                  <div className="absolute -left-[38px] md:-left-[48px] top-0.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-[#C5A880] flex items-center justify-center font-serif text-[11px] md:text-[12px] font-bold text-[#0F5C4D] group-hover:bg-[#0F5C4D] group-hover:text-white group-hover:border-[#0F5C4D] transition-all duration-300 shadow-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-serif text-[16px] md:text-[18px] text-[#18352F] font-semibold tracking-tight transition-colors group-hover:text-[#0F5C4D]">
                      Creative Consultation
                    </h4>
                    <p className="text-[#5E6C66] text-[12.5px] md:text-[13.5px] lg:text-[14.5px] leading-[1.65] mt-1.5 font-inter">
                      We sit together (or hop on a Zoom call) to understand your aesthetic preferences, style ideas, and timeline flow.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  {/* Node */}
                  <div className="absolute -left-[38px] md:-left-[48px] top-0.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-[#C5A880] flex items-center justify-center font-serif text-[11px] md:text-[12px] font-bold text-[#0F5C4D] group-hover:bg-[#0F5C4D] group-hover:text-white group-hover:border-[#0F5C4D] transition-all duration-300 shadow-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-serif text-[16px] md:text-[18px] text-[#18352F] font-semibold tracking-tight transition-colors group-hover:text-[#0F5C4D]">
                      The Shoot Day
                    </h4>
                    <p className="text-[#5E6C66] text-[12.5px] md:text-[13.5px] lg:text-[14.5px] leading-[1.65] mt-1.5 font-inter">
                      Operating in stealth mode, we document all natural movements, while orchestrating high-end cinematic editorial portraits.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  {/* Node */}
                  <div className="absolute -left-[38px] md:-left-[48px] top-0.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-[#C5A880] flex items-center justify-center font-serif text-[11px] md:text-[12px] font-bold text-[#0F5C4D] group-hover:bg-[#0F5C4D] group-hover:text-white group-hover:border-[#0F5C4D] transition-all duration-300 shadow-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-serif text-[16px] md:text-[18px] text-[#18352F] font-semibold tracking-tight transition-colors group-hover:text-[#0F5C4D]">
                      Artistic Post-Production
                    </h4>
                    <p className="text-[#5E6C66] text-[12.5px] md:text-[13.5px] lg:text-[14.5px] leading-[1.65] mt-1.5 font-inter">
                      Each image is individually retouched, color-graded in our signature palette, and laid out inside custom wedding album frames.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Beautiful Editorial Overlapping Images */}
            <div className="lg:col-span-6 w-full relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] flex items-center justify-start pl-4 lg:pl-10 mt-10 lg:mt-0">
              
              {/* Offset gold backframe decorative block */}
              <div className="absolute top-6 left-6 right-6 bottom-6 border-2 border-[#C5A880]/30 rounded-[24px] pointer-events-none select-none -translate-x-4 -translate-y-4" />

              {/* Main Image */}
              <div className="relative w-[85%] h-[90%] rounded-[24px] overflow-hidden border border-[#D9E6E0] shadow-xl group z-0">
                <Image
                  src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=800&q=80"
                  alt="Intricate details from premium Indian wedding ceremony, emotional bride and groom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover group-hover:scale-102 transition-transform duration-700 pointer-events-none select-none"
                />
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute bottom-[5%] right-0 w-[45%] aspect-square rounded-[20px] overflow-hidden border-8 border-white shadow-2xl hover:scale-103 transition-transform duration-500 z-10">
                <Image
                  src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80"
                  alt="Wedding details: hands with rings close up"
                  fill
                  sizes="250px"
                  className="object-cover select-none pointer-events-none"
                />
              </div>

            </div>

          </div>
        </section>

        {/* IN-HOUSE PRINTING LAB SECTION */}
        <section className="py-10 md:py-24 px-4 sm:px-6 md:px-12 xl:px-24 bg-[#EEF7F2]/30 border-t border-b border-[#D9E6E0]/60">
          <div className="max-w-[1440px] mx-auto">
            
            {/* 1. Header Centered at the Top */}
            <div className="text-center max-w-[800px] mx-auto mb-8 md:mb-16">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-[1px] bg-[#0F5C4D]" />
                <span className="text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase text-[#1F6F63]">
                  IN-HOUSE PRINTING LAB
                </span>
                <span className="w-6 h-[1px] bg-[#0F5C4D]" />
              </div>

              <h2 className="font-serif text-[22px] xs:text-[25px] sm:text-[38px] md:text-[48px] text-[#18352F] font-normal leading-[1.15] tracking-tight mb-4">
                From Camera to Print: Everything Under One Roof
              </h2>

              <p className="text-[#5E6C66] !text-[13px] sm:!text-[14px] md:!text-[18px] leading-[1.6] max-w-[700px] mx-auto font-inter">
                At OM Photography, our work doesn't end after capturing your wedding. By managing the complete production process in-house, we ensure exceptional print quality, faster delivery, and premium albums.
              </p>
            </div>

            {/* 2. Compact Double-Column Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
              
              {/* Left Column: Printing Lab Image */}
              <div className="lg:col-span-7 w-full max-w-[480px] lg:max-w-none mx-auto flex flex-col space-y-3">
                <h3 className="font-serif text-[15px] md:text-[22px] text-[#18352F] font-bold text-center lg:text-left">
                  OM Digital Printing Lab
                </h3>

                <div className="w-full rounded-[20px] border border-[#D9E6E0] shadow-xl bg-white p-2">
                  <img
                    src="/printing_lab.jpg"
                    alt="OM In-house printing lab showing printing presses, laminators, cutters, and staff"
                    className="w-full h-auto rounded-[14px] pointer-events-none select-none block"
                  />
                </div>
              </div>

              {/* Right Column: Descriptions & Highlights */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 md:space-y-6">
                
                {/* Description details */}
                <div className="space-y-3.5 text-[#5E6C66] leading-[1.6] font-inter text-center lg:text-left">
                  <p className="!text-[12.5px] sm:!text-[13.5px] md:!text-[18px]">
                    Every photograph is professionally edited, color calibrated, printed, laminated, and handcrafted inside our own <strong className="text-[#0F5C4D]">OM Digital Printing Lab</strong>. 
                  </p>
                  <p className="!text-[12.5px] sm:!text-[13.5px] md:!text-[18px]">
                    From luxury leather album boxes to high-resolution prints and customized gift products, every detail is carefully crafted with precision and care.
                  </p>
                </div>

                {/* Compact Stats Row */}
                <div
                  className="rounded-[16px] w-full max-w-[400px] lg:max-w-none"
                  style={{ background: "linear-gradient(135deg, #071a14 0%, #0d3d30 100%)" }}
                >
                  <div className="grid grid-cols-3 gap-2 p-3.5 md:p-5 text-center text-white">
                    <div>
                      <div className="text-[16px] sm:text-[20px] md:text-[24px] font-serif font-bold text-[#9FDDC1]">15,000+</div>
                      <div className="text-[8px] md:text-[9px] uppercase tracking-wider text-white/70 mt-0.5">Albums</div>
                    </div>
                    <div className="border-l border-white/10 pl-2">
                      <div className="text-[16px] sm:text-[20px] md:text-[24px] font-serif font-bold text-[#9FDDC1]">100,000+</div>
                      <div className="text-[8px] md:text-[9px] uppercase tracking-wider text-white/70 mt-0.5">Photos</div>
                    </div>
                    <div className="border-l border-white/10 pl-2">
                      <div className="text-[16px] sm:text-[20px] md:text-[24px] font-serif font-bold text-[#9FDDC1]">100%</div>
                      <div className="text-[8px] md:text-[9px] uppercase tracking-wider text-white/70 mt-0.5">In-House</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* In-House printing lab features row - compact card layout like why choose us */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 items-stretch mt-12 max-w-[1400px] mx-auto">
              
              {/* Card 1 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/printing.png"
                    alt="Digital Printing"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Digital Printing
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  Industry-grade production printers.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/albums.png"
                    alt="Luxury Albums"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Luxury Albums
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  Handcrafted leather & acrylic covers.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/calibration.png"
                    alt="Color Calibration"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Color Calibration
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  True-to-life color matched output.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/delivery.png"
                    alt="Faster Delivery"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Faster Delivery
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  Quick turnaround with zero middlemen.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/gifts.png"
                    alt="Customized Gifts"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Customized Gifts
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  Frames, corporate gifts, calendars, cards, and labels.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section className="py-10 md:py-12 px-4 sm:px-6 md:px-12 xl:px-24 bg-white border-b border-[#D9E6E0]/60">
          <div className="max-w-[1400px] mx-auto text-center">
            
            {/* Top Heading Eyebrow */}
            <div className="inline-flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-[#4F665B]/30" />
              <span className="w-1 h-1 bg-[#4F665B] rotate-45" />
              <span className="text-[11px] md:text-[12px] font-bold tracking-[3px] uppercase text-[#4F665B] font-sans">
                WHY CHOOSE OM PHOTOGRAPHY
              </span>
              <span className="w-1 h-1 bg-[#4F665B] rotate-45" />
              <span className="w-8 h-[1px] bg-[#4F665B]/30" />
            </div>

            {/* Main Heading */}
            <h2 className="font-serif text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] font-medium text-[#243C33] tracking-tight mt-2 mb-6 md:whitespace-nowrap">
              Because Your Memories Deserve The Best
            </h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
              
              {/* Card 1 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/camera.png"
                    alt="Premium Photography"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Premium Photography
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  High-quality candid & traditional photography with artistic touch.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/clapperboard.png"
                    alt="Cinematic Films"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Cinematic Films
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  Creative cinematic films that tell your unique wedding story.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/drone.png"
                    alt="Drone Coverage"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Drone Coverage
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  Aerial perspectives that add magic to your big day.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/album.png"
                    alt="Luxury Albums"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Luxury Albums
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  Handcrafted premium albums with finest materials.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/palette.png"
                    alt="Creative Editing"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Creative Editing
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  Professional editing with perfect colors & emotions.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-white border border-[#E8ECE8] rounded-[22px] p-[16px_12px] sm:p-4 md:p-[24px_16px] text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-[6px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border border-[#E8ECE8] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-center mx-auto shrink-0">
                  <Image
                    src="/icons/clock.png"
                    alt="Fast Delivery"
                    width={52}
                    height={52}
                    className="w-[36px] h-[36px] md:w-[52px] md:h-[52px] object-contain select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-serif text-[13px] md:text-[14px] lg:text-[16px] font-semibold text-[#1F2F28] mt-3 md:mt-[14px] leading-tight whitespace-normal md:whitespace-nowrap">
                  Fast Delivery
                </h3>
                <p className="text-[#5F6C66] !text-[9.5px] sm:!text-[11px] md:!text-[11.5px] lg:!text-[12.5px] leading-[1.6] mt-2 font-inter">
                  On-time delivery without compromising on quality.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 5. CALL TO ACTION */}
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 mt-16 md:mt-24">
          <div
            className="w-full rounded-[32px] md:rounded-[40px] relative overflow-hidden border border-[#18352F]/10 shadow-[0_20px_50px_rgba(15,92,77,0.06)]"
            style={{
              background: "linear-gradient(135deg, #071a14 0%, #0c352a 50%, #0b3d34 100%)",
            }}
          >
            {/* Radial glow — top right */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 55% at 75% 10%, rgba(159,221,193,0.18) 0%, transparent 70%)",
              }}
            />
            {/* Radial glow — bottom left */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 50% 45% at 15% 90%, rgba(15,92,77,0.5) 0%, transparent 65%)",
              }}
            />

            {/* Shimmer strip across top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#9FDDC1]/70 to-transparent" />
            {/* Shimmer strip across bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#9FDDC1]/30 to-transparent" />

            {/* Decorative corner brackets */}
            <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-[#9FDDC1]/30 rounded-tl-lg" />
            <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-[#9FDDC1]/20 rounded-tr-lg" />
            <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-[#9FDDC1]/20 rounded-bl-lg" />
            <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-[#9FDDC1]/30 rounded-br-lg" />

            {/* Floating ambient dots */}
            <div className="absolute top-10 right-[14%] w-1.5 h-1.5 rounded-full bg-[#9FDDC1]/50" />
            <div className="absolute top-16 right-[16%] w-1 h-1 rounded-full bg-[#9FDDC1]/30" />
            <div className="absolute bottom-12 left-[9%] w-1.5 h-1.5 rounded-full bg-[#9FDDC1]/40" />
            <div className="absolute bottom-18 left-[11%] w-1 h-1 rounded-full bg-[#9FDDC1]/25" />

            {/* Content */}
            <div className="relative z-10 px-6 py-14 md:py-20 md:px-16 flex flex-col items-center text-center">

              {/* Eyebrow pill */}
              <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full border border-[#9FDDC1]/40 bg-[#9FDDC1]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9FDDC1]" />
                <span className="text-[9.5px] font-bold uppercase tracking-[0.3em] text-[#9FDDC1] font-sans">
                  LET'S CAPTURE YOUR STORY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#9FDDC1]" />
              </div>

              {/* Main heading */}
              <h2 className="font-serif text-[28px] sm:text-[38px] md:text-[50px] lg:text-[56px] font-normal leading-[1.15] tracking-tight mb-5 uppercase text-white">
                Ready to{" "}
                <span className="text-[#9FDDC1] relative inline-block">
                  Document
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #9FDDC1, transparent)",
                    }}
                  />
                </span>{" "}
                Your Legacy?
              </h2>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 mb-6 w-full max-w-[360px]">
                <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#9FDDC1]/40" />
                <Camera size={14} className="text-[#9FDDC1] shrink-0" />
                <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#9FDDC1]/40" />
              </div>

              {/* Description */}
              <div className="text-white text-[13px] md:text-[15px] font-sans leading-relaxed max-w-[520px] font-normal mb-8">
                We operate across India and worldwide.{" "}
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Connect with us to discuss dates, creative vision, and customized package pricing.
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 h-12 px-8 rounded-full bg-white text-[#0F5C4D] font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#9FDDC1] transition-all duration-300 shadow-lg hover:shadow-[0_0_35px_rgba(159,221,193,0.35)] hover:scale-[1.03]"
                >
                  Get In Touch Now
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/40 text-white font-semibold text-[11px] uppercase tracking-[0.2em] hover:border-[#9FDDC1]/80 hover:text-[#9FDDC1] transition-all duration-300"
                >
                  View Full Portfolio
                </Link>
              </div>

              {/* Social proof trust line */}
              <div className="mt-7 text-[10.5px] font-sans tracking-[0.15em] uppercase text-white/60">
                ✦ &nbsp; Trusted by 200+ couples across India &nbsp; ✦
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
