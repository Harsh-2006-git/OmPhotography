"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Animated component dependencies
import { Card, CardContent, CardHeader } from "../../components/ui/card";


import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { Briefcase, CheckCheck, Database, Server } from "lucide-react";
import { motion } from "framer-motion";

// Wedding Collections Plan Data
const plans = [
  {
    name: "The Classic Wedding Story",
    description: "Perfect coverage for standard traditional wedding ceremonies with premium quality outputs",
    price: 50000,
    yearlyPrice: 40000, // Advance price (Save 20%)
    buttonText: "Inquire Classic",
    buttonVariant: "outline" as const,
    features: [
      { text: "Traditional Photography & Video", icon: <Briefcase size={20} /> },
      { text: "3 Days Event Coverage", icon: <Database size={20} /> },
      { text: "30 Sheets Premium Album", icon: <Server size={20} /> },
    ],
    includes: [
      "The Classic Wedding Story includes:",
      "Traditional Photography & Traditional Videography",
      "3 Days Event Shoot Coverage",
      "30 Sheets Premium Quality Album",
      "Coverage of all Wedding functions",
      "Long video edited professionally",
      "Highlight reel delivered on Pendrive",
      "Reels & Short videos for social media",
      "20 Photos professionally retouched",
    ],
    link: "/contact?package=classic"
  },
  {
    name: "The Cinematic Keepsake",
    description: "Our signature and most popular collection combining cinema, candid shoots, and aerial drone visuals",
    price: 65000,
    yearlyPrice: 52000, // Advance price (Save 20%)
    buttonText: "Inquire Cinematic",
    buttonVariant: "default" as const,
    popular: true,
    features: [
      { text: "Candid & Cinematography Shoots", icon: <Briefcase size={20} /> },
      { text: "1 Day Drone Cinematic Video", icon: <Database size={20} /> },
      { text: "40 Sheets Album with Leather Box", icon: <Server size={20} /> },
    ],
    includes: [
      "The Cinematic Keepsake includes:",
      "Traditional Photography & Traditional Videography",
      "Candid Shoots & Cinematography Shoot",
      "3 Days Event Shoot Coverage",
      "1 Day Drone Cinematic Video",
      "Long video cinematic edited with highlights, teaser, and reels (all functions)",
      "40 Sheets Pages Premium Album with leather Box bag",
      "1 Gift Frame (Size 20-30 heavy bit frame 🖼️)",
      "64 GB Pendrive with Raw & Edited data",
      "Express 2nd Day Pendrive delivery",
    ],
    link: "/contact?package=keepsake"
  },
  {
    name: "The Royal Signature Experience",
    description: "The complete premium luxury experience including pre-wedding shoots, cinematic films, and drone coverage",
    price: 80000,
    yearlyPrice: 64000, // Advance price (Save 20%)
    buttonText: "Inquire Royal",
    buttonVariant: "outline" as const,
    features: [
      { text: "Drone cinematic video coverage", icon: <Briefcase size={20} /> },
      { text: "Pre-Wedding Shoot Included", icon: <Database size={20} /> },
      { text: "40 Sheets Album + Leather Box Bag", icon: <Server size={20} /> },
    ],
    includes: [
      "The Royal Signature Experience includes:",
      "Pre-Wedding Shoot included (with teaser & cinematic video)",
      "Traditional Photography & Traditional Videography",
      "Candid Shoots & Cinematography Shoot",
      "3 Days Event Shoot Coverage",
      "Drone cinematic video coverage",
      "Long video cinematic edited with highlights, teaser, and reels (all functions)",
      "40 Sheets Pages Album with premium leather Box bag",
      "1 Gift Frame (Size 20-30 heavy bit frame 🖼️)",
      "64 GB Pendrive with Raw & Edited data",
      "Express 2nd Day Pendrive delivery",
      "20 Photos Edited + Pre Wedding Shoot",
    ],
    link: "/contact?package=royal"
  },
];

export default function Services() {
  // Animated cards timeline configurations
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(8px)",
      y: -15,
      opacity: 0,
    },
  };

  return (
    <div className="min-h-screen bg-transparent text-[#18352F] overflow-x-hidden font-sans scroll-smooth flex flex-col justify-between">
      <Header />

      <main className="flex-grow">
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[210px] sm:h-[240px] md:h-[48vh] md:min-h-[420px] md:max-h-[500px] mt-16 md:mt-0 pt-[var(--header-height)] flex items-center justify-center bg-[#F5FBF8] overflow-hidden border-b border-[#D9E6E0]">

          {/* Left Background Image (Full height, Black & White, Merged) */}
          <div className="absolute left-0 top-[var(--header-height)] bottom-0 aspect-[3/4] md:aspect-[4/5] lg:aspect-[1/1] pointer-events-none z-0 overflow-hidden select-none hidden md:block">
            <div className="relative w-full h-full">
              <Image
                src="https://res.cloudinary.com/eksh1jyi/image/upload/v1783963853/portfolio/file_rw9yxs.jpg"
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
                src="https://res.cloudinary.com/eksh1jyi/image/upload/v1783963923/portfolio/file_sawley.jpg"
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
                • OUR INVESTMENT •
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-[24px] xs:text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] text-[#18352F] font-normal leading-tight tracking-tight mb-1">
              Services & Packages
            </h1>
            <div className="font-script text-[42px] xs:text-[50px] sm:text-[58px] md:text-[72px] lg:text-[80px] text-[#1F6F63] leading-none select-none mb-2 md:mb-3">
              Love & Legacy.
            </div>

            {/* Gold Divider Line */}
            <div className="w-12 h-[1px] bg-[#C5A880]/60 my-2 md:my-3 mx-auto"></div>

            {/* Short Description */}
            <p className="hidden md:block text-[#5E6C66] md:text-[15px] lg:text-[17px] leading-relaxed max-w-[95%] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[700px] mx-auto mb-0 font-inter">
              We offer curated visual experiences designed to immortalize every gaze, laughter, and tear. Discover our collections or design your custom package below.
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

        {/* 2. CORE SERVICES SHOWCASE */}
        <section className="relative py-14 md:py-20 px-4 sm:px-6 md:px-12 xl:px-24 w-full overflow-hidden bg-[#F5FBF8]/40 border-b border-[#D9E6E0]/60">
          
          {/* Reuse botanical vectors for premium watercolor corner frames */}
          <div className="absolute top-0 left-0 w-[120px] h-[120px] md:w-[180px] md:h-[180px] pointer-events-none select-none opacity-30 z-0">
            <Image
              src="/assets/pricing/leaf-decor-top-left.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 120px, 180px"
              className="object-contain object-top-left"
            />
          </div>

          <div className="absolute top-0 right-0 w-[120px] h-[120px] md:w-[180px] md:h-[180px] pointer-events-none select-none opacity-30 z-0">
            <Image
              src="/assets/pricing/leaf-decor-top-right.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 120px, 180px"
              className="object-contain object-top-right"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-[130px] h-[130px] md:w-[200px] md:h-[200px] pointer-events-none select-none opacity-25 z-0">
            <Image
              src="/assets/pricing/floral-decor-bottom-left.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 130px, 200px"
              className="object-contain object-bottom-left"
            />
          </div>

          <div className="absolute bottom-0 right-0 w-[130px] h-[130px] md:w-[200px] md:h-[200px] pointer-events-none select-none opacity-25 z-0">
            <Image
              src="/assets/pricing/floral-decor-bottom-right.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 130px, 200px"
              className="object-contain object-bottom-right"
            />
          </div>

          <div className="max-w-[1240px] mx-auto relative z-10">
            <div className="text-center mb-10 md:mb-14 flex flex-col items-center">
              {/* Top uppercase header label */}
              <div className="flex items-center justify-center gap-3 mb-1 select-none">
                <div className="w-1.5 h-1.5 bg-[#C89B5D] rotate-45" />
                <span className="text-[10px] tracking-[0.2em] font-bold text-[#1E4A3A] uppercase font-sans">
                  OUR SIGNATURE SERVICES
                </span>
                <div className="w-1.5 h-1.5 bg-[#C89B5D] rotate-45" />
              </div>

              {/* Main title */}
              <h2 className="font-serif text-[32px] sm:text-[44px] text-[#18352F] font-normal leading-tight tracking-tight mt-1 mb-2">
                What We Provide
              </h2>

              {/* Small Gold Flourish Ornament */}
              <div className="flex items-center justify-center gap-2 mb-3.5 select-none opacity-90">
                <div className="w-6 h-[1px] bg-[#C89B5D]/40" />
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#C89B5D]">
                  <path d="M12 2C12 2 14 7 17 10C20 13 22 18 22 18C22 18 17 17 12 15C7 17 2 18 2 18C2 18 4 13 7 10C10 7 12 2 12 2Z" fill="currentColor" />
                </svg>
                <div className="w-6 h-[1px] bg-[#C89B5D]/40" />
              </div>

              <p className="text-[#5E6C66] text-[13px] md:text-[14px] font-sans font-normal max-w-[500px] leading-relaxed">
                Every element crafted to perfection to document your story.
              </p>
            </div>

            {/* 4-Card Services Showcase Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
              
              {/* Card 1: Wedding Photography */}
              <div className="bg-white border-2 border-[#B2C7BF] rounded-[28px] p-0 flex flex-col justify-between h-full hover:shadow-[0_20px_50px_rgba(15,92,77,0.06)] hover:-translate-y-1 transition-all duration-500 group max-w-[290px] xs:max-w-[310px] sm:max-w-none mx-auto w-full">
                <div>
                  {/* Top Image Wrapper with smooth semicircular bottom cutout overlay */}
                  <div className="relative w-full h-[115px] xs:h-[130px] sm:h-auto sm:aspect-[4/3] rounded-t-[28px] overflow-hidden">
                    <Image
                      src="/services/wedding-photography.png"
                      alt="Wedding Day Photography"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* SVG Bottom Curve Mask (Hump only in center, transparent on sides) */}
                    <svg className="absolute bottom-0 left-0 w-full h-6 text-white fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M 0 20 L 100 20 L 100 20 L 62 20 C 57 20 56 4 50 4 C 44 4 43 20 38 20 L 0 20 Z" />
                    </svg>
                  </div>

                  {/* Floating circular badge bridging image & card body */}
                  <div className="relative flex justify-center -mt-5 z-20">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-[#B2C7BF] bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E4A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="pt-2 sm:pt-3 px-3 sm:px-5 pb-2 text-center">
                    <h3 className="font-serif text-[15px] sm:text-[18px] md:text-[19px] text-[#1E4A3A] font-normal tracking-tight mb-0.5">
                      Wedding Photography
                    </h3>
                    <span className="text-[8.5px] tracking-[1.2px] text-[#C89B5D] uppercase font-bold">
                      WEDDING DAY PHOTOGRAPHY
                    </span>
                    <p className="text-[#6E6E6E] !text-[9px] sm:!text-[11px] leading-relaxed font-sans mt-2 sm:mt-3 px-1 min-h-0 sm:min-h-[64px]">
                      A combination of editorial portraits and candid moments, focusing on natural emotions, premium framing, and dramatic ambient lighting.
                    </p>
                  </div>
                </div>

                {/* Features Bullet List */}
                <div className="px-3 sm:px-5 pb-4 sm:pb-5 mt-auto">
                  <ul className="space-y-1.5 sm:space-y-2 text-left border-t border-[#D9E6E0]/60 pt-3 sm:pt-4">
                    <li className="flex items-start">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">Led by Om + Candid Specialist</span>
                    </li>
                    <li className="flex items-start">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">High-Res Digital Photo Gallery</span>
                    </li>
                    <li className="flex items-start">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">Custom Edit &amp; Color Grading</span>
                    </li>
                  </ul>

                  {/* Bottom Gold Ornament */}
                  <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4 select-none opacity-80">
                    <div className="w-6 h-[1px] bg-[#C89B5D]/30" />
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-[#C89B5D]">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
                    </svg>
                    <div className="w-6 h-[1px] bg-[#C89B5D]/30" />
                  </div>
                </div>
              </div>

              {/* Card 2: Cinematic Films */}
              <div className="bg-white border-2 border-[#B2C7BF] rounded-[28px] p-0 flex flex-col justify-between h-full hover:shadow-[0_20px_50px_rgba(15,92,77,0.06)] hover:-translate-y-1 transition-all duration-500 group max-w-[290px] xs:max-w-[310px] sm:max-w-none mx-auto w-full">
                <div>
                  {/* Top Image Wrapper with smooth semicircular bottom cutout overlay */}
                  <div className="relative w-full h-[115px] xs:h-[130px] sm:h-auto sm:aspect-[4/3] rounded-t-[28px] overflow-hidden">
                    <Image
                      src="/services/cinematic-films.png"
                      alt="Cinematic Wedding Films"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* SVG Bottom Curve Mask (Hump only in center, transparent on sides) */}
                    <svg className="absolute bottom-0 left-0 w-full h-6 text-white fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M 0 20 L 100 20 L 100 20 L 62 20 C 57 20 56 4 50 4 C 44 4 43 20 38 20 L 0 20 Z" />
                    </svg>
                  </div>

                  {/* Floating circular badge bridging image & card body */}
                  <div className="relative flex justify-center -mt-5 z-20">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-[#B2C7BF] bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                      <svg className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" viewBox="0 0 24 24" fill="none" stroke="#1E4A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 18V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
                        <path d="M22 8H2M2 14h20M7 8V4M17 8V4M12 8V4" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="pt-2 sm:pt-3 px-3 sm:px-5 pb-2 text-center">
                    <h3 className="font-serif text-[15px] sm:text-[18px] md:text-[19px] text-[#1E4A3A] font-normal tracking-tight mb-0.5">
                      Cinematic Films
                    </h3>
                    <span className="text-[8.5px] tracking-[1.2px] text-[#C89B5D] uppercase font-bold">
                      CINEMATIC WEDDING FILMS
                    </span>
                    <p className="text-[#6E6E6E] !text-[9px] sm:!text-[11px] leading-relaxed font-sans mt-2 sm:mt-3 px-1 min-h-0 sm:min-h-[64px]">
                      High-end cinematic films capturing the soul of your wedding. Includes custom scoring, clean audio, emotional voiceovers, and drone views.
                    </p>
                  </div>
                </div>

                {/* Features Bullet List */}
                <div className="px-3 sm:px-5 pb-4 sm:pb-5 mt-auto">
                  <ul className="space-y-1.5 sm:space-y-2 text-left border-t border-[#D9E6E0]/60 pt-3 sm:pt-4">
                    <li className="flex items-start">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none w-2.5 h-2.5 sm:w-3 sm:h-3">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">4K Resolution &amp; Drone Footage</span>
                    </li>
                    <li className="flex items-start">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none w-2.5 h-2.5 sm:w-3 sm:h-3">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">5-7 min Cinematic Highlight Film</span>
                    </li>
                    <li className="flex items-start">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none w-2.5 h-2.5 sm:w-3 sm:h-3">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">Full Documentary Ceremony Cut</span>
                    </li>
                  </ul>

                  {/* Bottom Gold Ornament */}
                  <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4 select-none opacity-80">
                    <div className="w-6 h-[1px] bg-[#C89B5D]/30" />
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-[#C89B5D]">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
                    </svg>
                    <div className="w-6 h-[1px] bg-[#C89B5D]/30" />
                  </div>
                </div>
              </div>

              {/* Card 3: Pre-Wedding Sessions */}
              <div className="bg-white border-2 border-[#B2C7BF] rounded-[28px] p-0 flex flex-col justify-between h-full hover:shadow-[0_20px_50px_rgba(15,92,77,0.06)] hover:-translate-y-1 transition-all duration-500 group max-w-[290px] xs:max-w-[310px] sm:max-w-none mx-auto w-full">
                <div>
                  {/* Top Image Wrapper with smooth semicircular bottom cutout overlay */}
                  <div className="relative w-full h-[115px] xs:h-[130px] sm:h-auto sm:aspect-[4/3] rounded-t-[28px] overflow-hidden">
                    <Image
                      src="/services/pre-wedding.png"
                      alt="Pre-Wedding Shoot"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* SVG Bottom Curve Mask (Hump only in center, transparent on sides) */}
                    <svg className="absolute bottom-0 left-0 w-full h-6 text-white fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M 0 20 L 100 20 L 100 20 L 62 20 C 57 20 56 4 50 4 C 44 4 43 20 38 20 L 0 20 Z" />
                    </svg>
                  </div>

                  {/* Floating circular badge bridging image & card body */}
                  <div className="relative flex justify-center -mt-5 z-20">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-[#B2C7BF] bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                      <svg className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" viewBox="0 0 24 24" fill="none" stroke="#1E4A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 14A4 4 0 0 0 4 18V20H12V18A4 4 0 0 0 8 14Z" />
                        <circle cx="8" cy="8" r="3" />
                        <path d="M16 14A4 4 0 0 1 20 18V20H12" />
                        <circle cx="16" cy="8" r="3" />
                        <path d="M12 5.3C12 5.3 11.2 4 9.8 4C8.5 4 7.5 5 7.5 6.3C7.5 8.2 12 11 12 11C12 11 16.5 8.2 16.5 6.3C16.5 5 15.5 4 14.2 4C12.8 4 12 5.3 12 5.3Z" fill="#1E4A3A" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="pt-2 sm:pt-3 px-3 sm:px-5 pb-2 text-center">
                    <h3 className="font-serif text-[15px] sm:text-[18px] md:text-[19px] text-[#1E4A3A] font-normal tracking-tight mb-0.5">
                      Pre-Wedding Sessions
                    </h3>
                    <span className="text-[8.5px] tracking-[1.2px] text-[#C89B5D] uppercase font-bold">
                      PRE-WEDDING SHOOT
                    </span>
                    <p className="text-[#6E6E6E] !text-[9px] sm:!text-[11px] leading-relaxed font-sans mt-2 sm:mt-3 px-1 min-h-0 sm:min-h-[64px]">
                      A dedicated pre-wedding editorial session. Guided styling and location settings to capture premium cinematic trailers and couple portraits.
                    </p>
                  </div>
                </div>

                {/* Features Bullet List */}
                <div className="px-3 sm:px-5 pb-4 sm:pb-5 mt-auto">
                  <ul className="space-y-1.5 sm:space-y-2 text-left border-t border-[#D9E6E0]/60 pt-3 sm:pt-4">
                    <li className="flex items-start">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none w-2.5 h-2.5 sm:w-3 sm:h-3">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">Full Location &amp; Wardrobe Consult</span>
                    </li>
                    <li className="flex items-start">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none w-2.5 h-2.5 sm:w-3 sm:h-3">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">40+ Retouched Digital Art Photos</span>
                    </li>
                    <li className="flex items-start">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none w-2.5 h-2.5 sm:w-3 sm:h-3">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">Pre-Wedding Teaser Film (1 min)</span>
                    </li>
                  </ul>

                  {/* Bottom Gold Ornament */}
                  <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4 select-none opacity-80">
                    <div className="w-6 h-[1px] bg-[#C89B5D]/30" />
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-[#C89B5D]">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
                    </svg>
                    <div className="w-6 h-[1px] bg-[#C89B5D]/30" />
                  </div>
                </div>
              </div>

              {/* Card 4: Premium Print & Albums */}
              <div className="bg-white border-2 border-[#B2C7BF] rounded-[28px] p-0 flex flex-col justify-between h-full hover:shadow-[0_20px_50px_rgba(15,92,77,0.06)] hover:-translate-y-1 transition-all duration-500 group max-w-[290px] xs:max-w-[310px] sm:max-w-none mx-auto w-full">
                <div>
                  {/* Top Image Wrapper with smooth semicircular bottom cutout overlay */}
                  <div className="relative w-full h-[115px] xs:h-[130px] sm:h-auto sm:aspect-[4/3] rounded-t-[28px] overflow-hidden">
                    <Image
                      src="/services/premium-albums.png"
                      alt="Heirloom Albums"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* SVG Bottom Curve Mask (Hump only in center, transparent on sides) */}
                    <svg className="absolute bottom-0 left-0 w-full h-6 text-white fill-current" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M 0 20 L 100 20 L 100 20 L 62 20 C 57 20 56 4 50 4 C 44 4 43 20 38 20 L 0 20 Z" />
                    </svg>
                  </div>

                  {/* Floating circular badge bridging image & card body */}
                  <div className="relative flex justify-center -mt-5 z-20">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-[#B2C7BF] bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                      <svg className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" viewBox="0 0 24 24" fill="none" stroke="#1E4A3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="pt-2 sm:pt-3 px-3 sm:px-5 pb-2 text-center">
                    <h3 className="font-serif text-[15px] sm:text-[18px] md:text-[19px] text-[#1E4A3A] font-normal tracking-tight mb-0.5">
                      Premium Print &amp; Albums
                    </h3>
                    <span className="text-[8.5px] tracking-[1.2px] text-[#C89B5D] uppercase font-bold">
                      HEIRLOOM ALBUMS
                    </span>
                    <p className="text-[#6E6E6E] !text-[9px] sm:!text-[11px] leading-relaxed font-sans mt-2 sm:mt-3 px-1 min-h-0 sm:min-h-[64px]">
                      Premium fine-art albums handcrafted with silk, linen, or gold-gilded leather covers, delivered inside a custom wooden keepsake box.
                    </p>
                  </div>
                </div>

                {/* Features Bullet List */}
                <div className="px-3 sm:px-5 pb-4 sm:pb-5 mt-auto">
                  <ul className="space-y-1.5 sm:space-y-2 text-left border-t border-[#D9E6E0]/60 pt-3 sm:pt-4">
                    <li className="flex items-start">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none w-2.5 h-2.5 sm:w-3 sm:h-3">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">Custom Layout Design Service</span>
                    </li>
                    <li className="flex items-start">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none w-2.5 h-2.5 sm:w-3 sm:h-3">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">Handcrafted Luxury Leather / Silk</span>
                    </li>
                    <li className="flex items-start">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2 shrink-0 select-none w-2.5 h-2.5 sm:w-3 sm:h-3">
                        <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                        <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[9px] sm:text-[11px] text-[#6E6E6E] font-sans leading-snug">Archival Print Guarantee (100 Years)</span>
                    </li>
                  </ul>

                  {/* Bottom Gold Ornament */}
                  <div className="flex items-center justify-center gap-1.5 mt-3 sm:mt-4 select-none opacity-80">
                    <div className="w-6 h-[1px] bg-[#C89B5D]/30" />
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-[#C89B5D]">
                      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
                    </svg>
                    <div className="w-6 h-[1px] bg-[#C89B5D]/30" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. PRE-SET COLLECTIONS (PREMIUM REDESIGNED PRICING SECTION) */}
        <section
          ref={pricingSectionRef}
          className="relative py-10 md:py-16 px-4 sm:px-6 md:px-12 xl:px-24 w-full overflow-hidden"
          style={{ backgroundColor: "#FCFAF6" }}
        >
          {/* Top-Left Botanical Leaf Corner Decoration */}
          <div className="absolute top-0 left-0 w-[140px] h-[140px] md:w-[220px] md:h-[220px] pointer-events-none select-none opacity-45 z-0">
            <Image
              src="/assets/pricing/leaf-decor-top-left.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 140px, 220px"
              className="object-contain object-top-left"
            />
          </div>

          {/* Top-Right Botanical Leaf Corner Decoration */}
          <div className="absolute top-0 right-0 w-[140px] h-[140px] md:w-[220px] md:h-[220px] pointer-events-none select-none opacity-45 z-0">
            <Image
              src="/assets/pricing/leaf-decor-top-right.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 140px, 220px"
              className="object-contain object-top-right"
            />
          </div>

          {/* Bottom-Left White/Gold Floral Corner Decoration */}
          <div className="absolute bottom-0 left-0 w-[160px] h-[160px] md:w-[260px] md:h-[260px] pointer-events-none select-none opacity-35 z-0">
            <Image
              src="/assets/pricing/floral-decor-bottom-left.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 160px, 260px"
              className="object-contain object-bottom-left"
            />
          </div>

          {/* Bottom-Right White/Gold Floral Corner Decoration */}
          <div className="absolute bottom-0 right-0 w-[160px] h-[160px] md:w-[260px] md:h-[260px] pointer-events-none select-none opacity-35 z-0">
            <Image
              src="/assets/pricing/floral-decor-bottom-right.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 160px, 260px"
              className="object-contain object-bottom-right"
            />
          </div>

          <div className="max-w-[1240px] mx-auto relative z-10">
            {/* Header Redesign */}
            <article className="text-center mb-8 md:mb-10 flex flex-col items-center">

              {/* Elegant uppercase label with side horizontal line ornaments */}
              <div className="flex items-center gap-4 mb-3 select-none">
                {/* Left Line Ornament */}
                <svg width="45" height="12" viewBox="0 0 45 12" fill="none" className="text-[#C89B5D]/60 hidden xs:block">
                  <line x1="0" y1="6" x2="35" y2="6" stroke="currentColor" strokeWidth="1" />
                  <polygon points="35,6 40,3 40,9" fill="currentColor" />
                  <circle cx="43" cy="6" r="1.5" fill="currentColor" />
                </svg>

                <span className="text-[11px] md:text-[12px] tracking-[0.25em] font-bold text-[#1E4A3A] uppercase font-sans">
                  CURATED INVESTMENT PLANS
                </span>

                {/* Right Line Ornament */}
                <svg width="45" height="12" viewBox="0 0 45 12" fill="none" className="text-[#C89B5D]/60 hidden xs:block">
                  <circle cx="2" cy="6" r="1.5" fill="currentColor" />
                  <polygon points="10,6 5,3 5,9" fill="currentColor" />
                  <line x1="10" y1="6" x2="45" y2="6" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* Large Serif Title */}
              <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[54px] text-[#23322F] font-normal leading-tight tracking-tight mt-1 mb-4">
                We've got a plan that's perfect for you
              </h2>

              {/* Center description */}
              <p className="text-[#6E6E6E] !text-[12px] sm:!text-[13.5px] md:!text-[15.5px] max-w-[620px] leading-relaxed font-sans font-normal">
                Trusted by hundreds of couples worldwide. We help capture legacy stories with artistic elegance. Explore our booking packages below.
              </p>
            </article>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch max-w-[1140px] mx-auto pt-2">
              {plans.map((plan, index) => {
                const isClassic = plan.name.includes("Classic");
                const isCinematic = plan.name.includes("Cinematic");
                const isRoyal = plan.name.includes("Royal");

                return (
                  <div key={plan.name} className="h-full">
                    <div
                      className={`relative rounded-[24px] border bg-white flex flex-col h-full p-5 md:p-6 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.12)] hover:-translate-y-1 group ${plan.popular
                          ? "border-[#C89B5D] ring-1 ring-[#C89B5D]/40"
                          : "border-[#D9E6E0]"
                        }`}
                    >
                      {/* Popular Ribbon Flag */}
                      {plan.popular && (
                        <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none select-none z-20">
                          <div className="absolute top-4 right-[-24px] bg-[#1E4A3A] border-y border-[#C89B5D] text-[#C89B5D] font-bold text-[9px] tracking-[2px] py-1.5 w-32 text-center rotate-45 uppercase shadow-sm">
                            Popular
                          </div>
                        </div>
                      )}

                      {/* Header details with floating custom SVG icons badges */}
                      <div className="flex flex-col items-center text-center relative mb-4">
                        {/* Circular Badge Icon (Reduced scale for more compact view) */}
                        <div className="w-12 h-12 rounded-full border border-[#C89B5D]/40 bg-white flex items-center justify-center shadow-md mb-2.5 relative group-hover:scale-105 transition-transform duration-500 z-10">
                          {isClassic && (
                            <Image
                              src="/icons/camera.png"
                              alt="Camera"
                              width={22}
                              height={22}
                              className="object-contain"
                            />
                          )}
                          {isCinematic && (
                            <Image
                              src="/icons/clapperboard.png"
                              alt="Clapperboard"
                              width={22}
                              height={22}
                              className="object-contain"
                            />
                          )}
                          {isRoyal && (
                            <Image
                              src="/icons/drone.png"
                              alt="Drone"
                              width={22}
                              height={22}
                              className="object-contain"
                            />
                          )}
                        </div>

                        {/* Package Title (Large serif, Dark green) */}
                        <h3 className="text-[17px] md:text-[19px] font-serif font-normal text-[#1E4A3A] mb-0.5 tracking-tight">
                          {plan.name}
                        </h3>

                        {/* Subtitle (Uppercase, Gold, Letter spacing) */}
                        <span className="text-[8.5px] tracking-[1.2px] text-[#C89B5D] uppercase font-bold">
                          {isClassic && "FOR INTIMATE & MINI EVENTS"}
                          {isCinematic && "SIGNATURE PHOTO & FILM COMBO"}
                          {isRoyal && "ELITE DESTINATION PACKAGE"}
                        </span>

                        {/* Muted description */}
                        <p className="!text-[10px] sm:!text-[11px] text-[#6E6E6E] mt-1.5 font-sans leading-relaxed min-h-[30px]">
                          {plan.description}
                        </p>
                      </div>



                      {/* Pricing block */}
                      <div className="flex flex-col items-center justify-center mb-4">
                        <div className="flex items-baseline justify-center">
                          <span className="text-[24px] font-serif font-light text-[#C89B5D] mr-0.5 select-none">
                            ₹
                          </span>
                          <NumberFlow
                            format={{
                              useGrouping: true,
                            }}
                            value={plan.price}
                            className="text-[28px] sm:text-[32px] font-serif font-bold text-[#C89B5D]"
                          />
                        </div>
                        <span className="text-[#6E6E6E] text-[9.5px] font-sans uppercase tracking-[1.2px] mt-0.5">
                          / standard rate
                        </span>
                      </div>

                      {/* Dark Green Luxury Inquire Button */}
                      <div className="mb-5 w-full">
                        <a
                          href={plan.link}
                          className="w-full h-[38px] rounded-[10px] bg-[#1E4A3A] border border-[#C89B5D]/30 text-white hover:bg-white hover:text-[#1E4A3A] hover:border-[#1E4A3A] hover:shadow-[0_8px_16px_rgba(30,74,58,0.12)] flex items-center justify-center font-bold text-[10px] tracking-[1.2px] uppercase transition-all duration-300 shadow-sm cursor-pointer"
                        >
                          {plan.buttonText}
                        </a>
                      </div>

                      {/* Features list (Tighter spacing and slightly smaller font to reduce height) */}
                      <div className="space-y-2 pt-4 border-t border-[#D9E6E0]/60 flex-1 flex flex-col justify-start">
                        <h4 className="font-bold text-[10.5px] uppercase tracking-wider text-[#23322F] mb-0.5 font-sans text-left">
                          {plan.includes[0]}
                        </h4>
                        <ul className="space-y-1.5 text-left">
                          {plan.includes.slice(1).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              {/* Leaf custom SVG bullet designed exactly like leaf illustration */}
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#1E4A3A] mt-0.5 mr-2.5 shrink-0 select-none pointer-events-none">
                                <path d="M2 22C2 22 8 18 12 12C16 6 22 2 22 2C22 2 18 8 12 12C6 16 2 22 2 22Z" fill="currentColor" />
                                <path d="M2 22Q12 12 22 2" stroke="currentColor" strokeWidth="1.5" />
                              </svg>
                              <span className="text-[11px] text-[#6E6E6E] font-sans leading-snug">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Trust Row (Separated by thin vertical lines) */}
            <div className="mt-10 md:mt-14 border-t border-b border-[#C89B5D]/25 py-4 px-4 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 items-center justify-center">

                {/* Trust Item 1 */}
                <div className="flex flex-row sm:flex-col items-center justify-start sm:justify-center text-left sm:text-center gap-3 sm:gap-0 lg:px-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#C89B5D]/40 flex items-center justify-center shadow-sm sm:mb-2 shrink-0">
                    <Image
                      src="/icons/calibration.png"
                      alt="Premium Quality"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-start sm:items-center">
                    <h4 className="text-[10px] sm:text-[10.5px] font-bold tracking-[1px] sm:tracking-[1.2px] text-[#23322F] uppercase">Premium Quality</h4>
                    <p className="!text-[8.5px] sm:!text-[9px] text-[#6E6E6E] mt-0.5 uppercase tracking-[0.5px]">Top-notch equipment & expertise</p>
                  </div>
                </div>

                {/* Trust Item 2 */}
                <div className="flex flex-row sm:flex-col items-center justify-start sm:justify-center text-left sm:text-center gap-3 sm:gap-0 lg:px-4 lg:border-l lg:border-[#C89B5D]/25">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#C89B5D]/40 flex items-center justify-center shadow-sm sm:mb-2 shrink-0">
                    <Image
                      src="/icons/delivery.png"
                      alt="On-Time Delivery"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-start sm:items-center">
                    <h4 className="text-[10px] sm:text-[10.5px] font-bold tracking-[1px] sm:tracking-[1.2px] text-[#23322F] uppercase">On-Time Delivery</h4>
                    <p className="!text-[8.5px] sm:!text-[9px] text-[#6E6E6E] mt-0.5 uppercase tracking-[0.5px]">We value your time & moments</p>
                  </div>
                </div>

                {/* Trust Item 3 */}
                <div className="flex flex-row sm:flex-col items-center justify-start sm:justify-center text-left sm:text-center gap-3 sm:gap-0 lg:px-4 lg:border-l lg:border-[#C89B5D]/25">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#C89B5D]/40 flex items-center justify-center shadow-sm sm:mb-2 shrink-0">
                    <Image
                      src="/icons/gifts.png"
                      alt="100% Satisfaction"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-start sm:items-center">
                    <h4 className="text-[10px] sm:text-[10.5px] font-bold tracking-[1px] sm:tracking-[1.2px] text-[#23322F] uppercase">100% Satisfaction</h4>
                    <p className="!text-[8.5px] sm:!text-[9px] text-[#6E6E6E] mt-0.5 uppercase tracking-[0.5px]">Your happiness is our priority</p>
                  </div>
                </div>

                {/* Trust Item 4 */}
                <div className="flex flex-row sm:flex-col items-center justify-start sm:justify-center text-left sm:text-center gap-3 sm:gap-0 lg:px-4 lg:border-l lg:border-[#C89B5D]/25">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#C89B5D]/40 flex items-center justify-center shadow-sm sm:mb-2 shrink-0">
                    <Image
                      src="/icons/albums.png"
                      alt="Capturing Legacies"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-start sm:items-center">
                    <h4 className="text-[10px] sm:text-[10.5px] font-bold tracking-[1px] sm:tracking-[1.2px] text-[#23322F] uppercase">Capturing Legacies</h4>
                    <p className="!text-[8.5px] sm:!text-[9px] text-[#6E6E6E] mt-0.5 uppercase tracking-[0.5px]">Memories that last forever</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
