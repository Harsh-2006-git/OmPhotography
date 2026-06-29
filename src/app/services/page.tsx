"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Animated component dependencies
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { TimelineContent } from "../../components/ui/timeline-animation";
import { VerticalCutReveal } from "../../components/ui/vertical-cut-reveal";
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

// Inner Pricing Switch
const PricingSwitch = ({
  onSwitch,
  className,
}: {
  onSwitch: (value: string) => void;
  className?: string;
}) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="relative z-10 mx-auto flex w-fit rounded-xl bg-white border border-[#D9E6E0] p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit cursor-pointer h-12 rounded-xl sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors sm:text-base text-sm",
            selected === "0"
              ? "text-[#18352F]"
              : "text-muted-foreground hover:text-black",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId="pricing_switch"
              className="absolute top-0 left-0 h-12 w-full rounded-xl border-2 shadow-sm shadow-[#0F5C4D]/10 border-[#0F5C4D] bg-[#0F5C4D]/5"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative font-semibold font-sans">Standard Booking</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit cursor-pointer h-12 flex-shrink-0 rounded-xl sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors sm:text-base text-sm",
            selected === "1"
              ? "text-[#18352F]"
              : "text-muted-foreground hover:text-black",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId="pricing_switch"
              className="absolute top-0 left-0 h-12 w-full rounded-xl border-2 shadow-sm shadow-[#0F5C4D]/10 border-[#0F5C4D] bg-[#0F5C4D]/5"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2 font-semibold font-sans">
            Advance Booking
            <span className="rounded-full bg-[#DCEFE8] px-2 py-0.5 text-xs font-semibold text-[#0F5C4D]">
              Save 20%
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default function Services() {
  // Animated cards timeline configurations
  const pricingSectionRef = useRef<HTMLDivElement>(null);
  const [isAdvancePeriod, setIsAdvancePeriod] = useState(false);

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

  const togglePricingPeriod = (value: string) => {
    setIsAdvancePeriod(Number.parseInt(value) === 1);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#18352F] overflow-x-hidden font-sans scroll-smooth flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-[90px] md:pt-[120px] pb-16 w-full">
        {/* 1. HERO SECTION */}
        <section className="relative px-4 sm:px-6 md:px-12 xl:px-24 max-w-[1440px] mx-auto w-full mb-12 md:mb-20 text-center">
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] mix-blend-overlay">
            <Image
              src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80"
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
          <div className="max-w-[800px] mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#0F5C4D]" />
              <span className="text-[#0F5C4D] text-[10px] md:text-[11px] font-sans font-semibold tracking-[3px] uppercase">Our Investment</span>
              <span className="w-8 h-[1px] bg-[#0F5C4D]" />
            </div>
            <h1 className="font-serif text-[38px] sm:text-[48px] md:text-[56px] text-[#18352F] font-normal leading-tight tracking-tight mb-4">
              Services & Packages
            </h1>
            <div className="font-script text-[28px] md:text-[42px] text-[#1F6F63] leading-none mb-4 select-none">
              Crafting visual heirlooms for your legacy
            </div>
            <p className="text-[#5E6C66] text-[13.5px] sm:text-[15px] md:text-[16.5px] leading-[1.7] max-w-[620px] mx-auto font-sans">
              We offer curated visual experiences designed to immortalize every gaze, laughter, and tear. Discover our collections or design your custom package below.
            </p>
          </div>
        </section>

        {/* 2. CORE SERVICES SHOWCASE */}
        <section className="px-4 sm:px-6 md:px-12 xl:px-24 max-w-[1440px] mx-auto w-full mb-16 md:mb-28">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-[26px] sm:text-[34px] text-[#18352F] font-normal tracking-tight">What We Provide</h2>
            <p className="text-[#5E6C66] text-[13px] md:text-[14.5px] mt-1.5 font-sans">Every element crafted to perfection to document your story</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Service card 1 */}
            <div className="bg-white border border-[#D9E6E0] rounded-[16px] p-5 flex flex-col justify-between h-full hover:shadow-[0_12px_30px_rgba(15,92,77,0.04)] hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="font-serif text-[18px] text-[#18352F] font-bold leading-tight mt-0.5">Wedding Photography</h3>
                  </div>
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-[#D9E6E0] shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=150&q=80"
                      alt="Wedding Day Photography"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <p className="text-[#5E6C66] text-[10.5px] leading-relaxed font-sans mb-4 min-h-[64px] sm:min-h-[80px] lg:min-h-[96px] xl:min-h-[64px]">
                  A combination of editorial portraits and candid moments, focusing on natural emotions, premium framing, and dramatic ambient lighting.
                </p>
              </div>
              <ul className="space-y-1.5 text-[10px] text-[#5E6C66] font-medium border-t border-[#D9E6E0]/60 pt-3.5 mt-auto">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> Led by Om + Candid Specialist
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> High-Res Digital Photo Gallery
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> Custom Edit & Color Grading
                </li>
              </ul>
            </div>

            {/* Service card 2 */}
            <div className="bg-white border border-[#D9E6E0] rounded-[16px] p-5 flex flex-col justify-between h-full hover:shadow-[0_12px_30px_rgba(15,92,77,0.04)] hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="font-serif text-[18px] text-[#18352F] font-bold leading-tight mt-0.5">Cinematic Films</h3>
                  </div>
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-[#D9E6E0] shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=150&q=80"
                      alt="Cinematic Wedding Films"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <p className="text-[#5E6C66] text-[10.5px] leading-relaxed font-sans mb-4 min-h-[64px] sm:min-h-[80px] lg:min-h-[96px] xl:min-h-[64px]">
                  High-end cinematic films capturing the soul of your wedding. Includes custom scoring, clean audio, emotional voiceovers, and drone views.
                </p>
              </div>
              <ul className="space-y-1.5 text-[10px] text-[#5E6C66] font-medium border-t border-[#D9E6E0]/60 pt-3.5 mt-auto">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> 4K Resolution & Drone Footage
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> 5-7 min Cinematic Highlight Film
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> Full Documentary Ceremony Cut
                </li>
              </ul>
            </div>

            {/* Service card 3 */}
            <div className="bg-white border border-[#D9E6E0] rounded-[16px] p-5 flex flex-col justify-between h-full hover:shadow-[0_12px_30px_rgba(15,92,77,0.04)] hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="font-serif text-[18px] text-[#18352F] font-bold leading-tight mt-0.5">Pre-Wedding Sessions</h3>
                  </div>
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-[#D9E6E0] shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=150&q=80"
                      alt="Pre-Wedding Shoot"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <p className="text-[#5E6C66] text-[10.5px] leading-relaxed font-sans mb-4 min-h-[64px] sm:min-h-[80px] lg:min-h-[96px] xl:min-h-[64px]">
                  A dedicated pre-wedding editorial session. Guided styling and location settings to capture premium cinematic trailers and couple portraits.
                </p>
              </div>
              <ul className="space-y-1.5 text-[10px] text-[#5E6C66] font-medium border-t border-[#D9E6E0]/60 pt-3.5 mt-auto">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> Full Location & Wardrobe Consult
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> 40+ Retouched Digital Art Photos
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> Pre-Wedding Teaser Film (1 min)
                </li>
              </ul>
            </div>

            {/* Service card 4 */}
            <div className="bg-white border border-[#D9E6E0] rounded-[16px] p-5 flex flex-col justify-between h-full hover:shadow-[0_12px_30px_rgba(15,92,77,0.04)] hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="font-serif text-[18px] text-[#18352F] font-bold leading-tight mt-0.5">Premium Print & Albums</h3>
                  </div>
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-[#D9E6E0] shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=150&q=80"
                      alt="Heirloom Albums"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <p className="text-[#5E6C66] text-[10.5px] leading-relaxed font-sans mb-4 min-h-[64px] sm:min-h-[80px] lg:min-h-[96px] xl:min-h-[64px]">
                  Premium fine-art albums handcrafted with silk, linen, or gold-gilded leather covers, delivered inside a custom wooden keepsake box.
                </p>
              </div>
              <ul className="space-y-1.5 text-[10px] text-[#5E6C66] font-medium border-t border-[#D9E6E0]/60 pt-3.5 mt-auto">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> Custom Layout Design Service
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> Handcrafted Luxury Leather / Silk
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#0F5C4D]" /> Archival Print Guarantee (100 Years)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. PRE-SET COLLECTIONS (ANIMATED AND DYNAMIC) */}
        <section
          ref={pricingSectionRef}
          className="bg-[#F5FBF8]/40 backdrop-blur-sm border-t border-b border-[#D9E6E0] py-16 md:py-24 px-4 sm:px-6 md:px-12 xl:px-24 w-full mb-16 md:mb-28 relative"
        >
          <div className="max-w-[1440px] mx-auto">
            {/* Animated Title & Headers */}
            <article className="text-center mb-12 space-y-4 max-w-3xl mx-auto flex flex-col items-center">
              <span className="text-[10.5px] tracking-[3.5px] font-bold text-[#0F5C4D] uppercase font-sans block">
                CURATED INVESTMENT PLANS
              </span>
              <h2 className="font-serif text-[34px] sm:text-[44px] md:text-[54px] text-[#18352F] font-normal leading-tight tracking-tight mt-1 mb-2">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.15}
                  staggerFrom="first"
                  reverse={true}
                  containerClassName="justify-center"
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 40,
                    delay: 0,
                  }}
                >
                  We've got a plan that's perfect for you
                </VerticalCutReveal>
              </h2>

              <TimelineContent
                as="p"
                animationNum={0}
                timelineRef={pricingSectionRef}
                customVariants={revealVariants}
                className="text-[#5E6C66] text-[13.5px] md:text-[15.5px] max-w-[580px] leading-relaxed font-sans"
              >
                Trusted by hundreds of couples worldwide. We help capture legacy stories with artistic elegance. Explore our booking packages below.
              </TimelineContent>

            </article>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-[1200px] mx-auto pt-6">
              {plans.map((plan, index) => (
                <TimelineContent
                  key={plan.name}
                  as="div"
                  animationNum={2 + index}
                  timelineRef={pricingSectionRef}
                  customVariants={revealVariants}
                >
                  <Card
                    className={`relative border border-[#D9E6E0] rounded-[18px] flex flex-col justify-between h-full p-6 md:p-8 transition-all duration-300 ${plan.popular
                        ? "ring-2 ring-[#0F5C4D] bg-[#F5FBF8] shadow-[0_12px_40px_rgba(15,92,77,0.08)]"
                        : "bg-white hover:shadow-lg"
                      }`}
                  >
                    <CardHeader className="text-left p-0 mb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-[17px] sm:text-[19px] md:text-[21px] lg:text-[18px] xl:text-[21px] font-bold text-[#18352F] mb-1 font-serif tracking-tight min-h-[44px] sm:min-h-[54px] md:min-h-[58px] lg:min-h-[44px] xl:min-h-[58px] flex items-center">
                            {plan.name}
                          </h3>
                          <span className="text-[10px] text-[#5E6C66] uppercase font-semibold font-sans tracking-wide">
                            {plan.name.includes("Classic") && "For Intimate & Mini Events"}
                            {plan.name.includes("Cinematic") && "Signature Photo & Film Combo"}
                            {plan.name.includes("Royal") && "Elite Destination Package"}
                          </span>
                        </div>
                        {plan.popular && (
                          <span className="bg-[#0F5C4D] text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-[#5E6C66] mt-3 font-sans leading-relaxed min-h-[56px] sm:min-h-[44px] lg:min-h-[56px] xl:min-h-[38px]">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline mt-4 border-t border-[#D9E6E0] pt-4">
                        <span className="text-[26px] font-sans font-medium text-[#18352F] mr-1.5 select-none">
                          ₹
                        </span>
                        <NumberFlow
                          format={{
                            useGrouping: true,
                          }}
                          value={isAdvancePeriod ? plan.yearlyPrice : plan.price}
                          className="text-[32px] font-serif font-bold text-[#18352F]"
                        />
                        <span className="text-[#5E6C66] ml-1.5 text-[12px] font-sans">
                          {isAdvancePeriod ? "/ advance rate" : "/ standard rate"}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="p-0 flex-1 flex flex-col justify-start">
                      {/* Action buttons */}
                      <div className="space-y-2.5 mb-6 shrink-0">
                        <a
                          href={plan.link}
                          className={`w-full h-[46px] rounded-[14px] flex items-center justify-center font-bold text-[11px] md:text-[12px] tracking-[1.5px] uppercase transition-all duration-300 shadow-sm cursor-pointer ${plan.popular
                              ? "bg-[#0F5C4D] border border-[#0F5C4D] text-white hover:bg-[#1F6F63] hover:shadow-md"
                              : "bg-white border border-[#0F5C4D] text-[#0F5C4D] hover:bg-[#0F5C4D] hover:text-white"
                            }`}
                        >
                          {plan.buttonText}
                        </a>
                      </div>

                      {/* Features list */}
                      <div className="space-y-3 pt-5 border-t border-[#D9E6E0]">
                        <h4 className="font-semibold text-[11.5px] uppercase tracking-wider text-[#18352F] mb-2 font-sans">
                          {plan.includes[0]}
                        </h4>
                        <ul className="space-y-2.5">
                          {plan.includes.slice(1).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <span className="h-5 w-5 bg-white border border-[#0F5C4D] rounded-full grid place-content-center mt-0.5 mr-2.5 shrink-0">
                                <CheckCheck className="h-3.5 w-3.5 text-[#0F5C4D]" />
                              </span>
                              <span className="text-[12px] text-[#5E6C66] font-sans leading-tight">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TimelineContent>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
