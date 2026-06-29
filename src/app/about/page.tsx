"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { TimelineContent } from "../../components/ui/timeline-animation";
import { VerticalCutReveal } from "../../components/ui/vertical-cut-reveal";

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
        <section className="relative pt-[120px] pb-16 md:pt-[160px] md:pb-24 bg-[#EEF7F2]/45 border-b border-[#D9E6E0]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-24 text-center">
            <TimelineContent
              as="div"
              animationNum={1}
              customVariants={revealVariants}
              className="font-script text-[26px] md:text-[38px] text-[#1F6F63] mb-2 select-none"
            >
              Meet the Artist
            </TimelineContent>

            <TimelineContent
              as="h1"
              animationNum={2}
              customVariants={revealVariants}
              className="font-serif text-[36px] sm:text-[48px] md:text-[60px] text-[#18352F] font-normal leading-[1.1] tracking-tight max-w-[800px] mx-auto"
            >
              <VerticalCutReveal splitBy="words" staggerDuration={0.035} containerClassName="justify-center">
                Crafting Timeless Legacies Through a Realistic Lens
              </VerticalCutReveal>
            </TimelineContent>

            <TimelineContent
              as="p"
              animationNum={3}
              customVariants={revealVariants}
              className="text-[#5E6C66] text-[14px] md:text-[17px] leading-relaxed max-w-[620px] mx-auto mt-4 font-inter"
            >
              A glimpse into the eyes behind the camera, our creative philosophy, and the journey of Om Photography.
            </TimelineContent>
          </div>
        </section>

        {/* 2. THE FOUNDER'S STORY & BIO */}
        <section className="py-16 md:py-28 px-4 sm:px-6 md:px-12 xl:px-24 bg-white">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Founder Photo & Frame */}
            <TimelineContent
              as="div"
              animationNum={1}
              customVariants={revealVariants}
              className="lg:col-span-5 relative max-w-[360px] mx-auto w-full flex justify-center"
            >
              <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden p-2 border border-[#0F5C4D]/10 bg-white shadow-xl">
                <div className="relative w-full h-full rounded-[18px] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80"
                    alt="Om - Lead Photographer"
                    fill
                    sizes="(max-width: 1024px) 40vw, 100vw"
                    className="object-cover hover:scale-103 transition-transform duration-500"
                  />
                </div>
                {/* Outer green border frame line wrapping the image */}
                <div className="absolute inset-0 border-2 border-[#0F5C4D] rounded-[24px] pointer-events-none"></div>
              </div>
            </TimelineContent>

            {/* Right Column: Founder Intro Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <TimelineContent
                as="span"
                animationNum={2}
                customVariants={revealVariants}
                className="text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase text-[#1F6F63] border-b border-[#0F5C4D]/25 pb-1"
              >
                FOUNDER & LEAD PHOTOGRAPHER
              </TimelineContent>

              <TimelineContent
                as="h2"
                animationNum={3}
                customVariants={revealVariants}
                className="font-serif text-[32px] sm:text-[42px] text-[#18352F] font-normal leading-tight tracking-tight"
              >
                Capturing Love in Its Purest, Most Authentic Form
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={4}
                customVariants={revealVariants}
                className="text-[#5E6C66] !text-[13px] xs:!text-[14px] md:!text-[15.5px] leading-[1.75] font-inter"
              >
                Hi, I am Om, the lead photographer and founder of Om Photography. With over a decade of capturing premium luxury weddings across India and worldwide, our vision is simple: <strong>to capture your lifetime memories realistically.</strong>
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={5}
                customVariants={revealVariants}
                className="text-[#5E6C66] !text-[13px] xs:!text-[14px] md:!text-[15.5px] leading-[1.75] font-inter"
              >
                We specialize in candid emotions, dramatic lighting, and cinematic story-telling. We believe that a wedding isn't just an event; it's a legacy of emotions, laughter, and tears that you will pass down for generations. Our team operates with micro-precision, ensuring that every fleeting moment is immortalized with editorial elegance.
              </TimelineContent>

              {/* Experience Counters Grid */}
              <TimelineContent
                as="div"
                animationNum={6}
                customVariants={revealVariants}
                className="grid grid-cols-3 gap-4 md:gap-8 w-full pt-6 border-t border-[#D9E6E0]"
              >
                <div className="flex flex-col">
                  <div className="text-[24px] md:text-[32px] font-serif font-bold text-[#0F5C4D]">10+</div>
                  <div className="text-[9px] md:text-[11px] uppercase tracking-[1px] text-[#5E6C66] mt-0.5">Years Experience</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[24px] md:text-[32px] font-serif font-bold text-[#0F5C4D]">350+</div>
                  <div className="text-[9px] md:text-[11px] uppercase tracking-[1px] text-[#5E6C66] mt-0.5">Weddings Shot</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[24px] md:text-[32px] font-serif font-bold text-[#0F5C4D]">100%</div>
                  <div className="text-[9px] md:text-[11px] uppercase tracking-[1px] text-[#5E6C66] mt-0.5">Happy Clients</div>
                </div>
              </TimelineContent>
            </div>
          </div>
        </section>

        {/* 3. OUR CREATIVE VALUES */}
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 xl:px-24 bg-[#F5FBF8] border-t border-b border-[#D9E6E0]/70">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center max-w-[700px] mx-auto mb-12 md:mb-16">
              <TimelineContent
                as="span"
                animationNum={1}
                customVariants={revealVariants}
                className="text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase text-[#1F6F63]"
              >
                THE PRINCIPLES WE STAND BY
              </TimelineContent>
              
              <TimelineContent
                as="h2"
                animationNum={2}
                customVariants={revealVariants}
                className="font-serif text-[28px] sm:text-[36px] md:text-[44px] text-[#18352F] font-normal leading-tight tracking-tight mt-2"
              >
                Our Core Creative Values
              </TimelineContent>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {/* Value 1 */}
              <TimelineContent
                as="div"
                animationNum={3}
                customVariants={revealVariants}
                className="bg-white border border-[#D9E6E0] rounded-[20px] p-6 md:p-8 flex flex-col items-start shadow-[0_10px_30px_rgba(15,92,77,0.02)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] mb-6">
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <h3 className="font-serif text-[18px] md:text-[21px] text-[#18352F] font-normal mb-3">Authentic Realism</h3>
                <p className="text-[#5E6C66] text-[13px] md:text-[14px] leading-relaxed font-sans">
                  We believe in capturing reactions and emotions as they happen. No awkward poses or artificial scripts—just the raw, beautiful reality of your love story.
                </p>
              </TimelineContent>

              {/* Value 2 */}
              <TimelineContent
                as="div"
                animationNum={4}
                customVariants={revealVariants}
                className="bg-white border border-[#D9E6E0] rounded-[20px] p-6 md:p-8 flex flex-col items-start shadow-[0_10px_30px_rgba(15,92,77,0.02)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] mb-6">
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                </div>
                <h3 className="font-serif text-[18px] md:text-[21px] text-[#18352F] font-normal mb-3">Editorial Artistry</h3>
                <p className="text-[#5E6C66] text-[13px] md:text-[14px] leading-relaxed font-sans">
                  Combining fine-art landscape composition with high-fashion lighting techniques to turn your simple portraits into magazine-worthy editorial covers.
                </p>
              </TimelineContent>

              {/* Value 3 */}
              <TimelineContent
                as="div"
                animationNum={5}
                customVariants={revealVariants}
                className="bg-white border border-[#D9E6E0] rounded-[20px] p-6 md:p-8 flex flex-col items-start shadow-[0_10px_30px_rgba(15,92,77,0.02)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] mb-6">
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-[18px] md:text-[21px] text-[#18352F] font-normal mb-3">Heritage Quality</h3>
                <p className="text-[#5E6C66] text-[13px] md:text-[14px] leading-relaxed font-sans">
                  Our craftsmanship ends with premium leather, gold-gilded heirloom albums that are made to survive generations, passing down the memory of your special day.
                </p>
              </TimelineContent>
            </div>
          </div>
        </section>

        {/* 4. THE EXPERIENCE PROCESS */}
        <section className="py-16 md:py-28 px-4 sm:px-6 md:px-12 xl:px-24 bg-white">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Process Details */}
            <div className="flex flex-col items-start space-y-6">
              <TimelineContent
                as="span"
                animationNum={1}
                customVariants={revealVariants}
                className="text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase text-[#1F6F63]"
              >
                HOW WE WORK
              </TimelineContent>

              <TimelineContent
                as="h2"
                animationNum={2}
                customVariants={revealVariants}
                className="font-serif text-[32px] sm:text-[42px] text-[#18352F] font-normal leading-tight tracking-tight"
              >
                A Seamless Photographic Journey
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={3}
                customVariants={revealVariants}
                className="text-[#5E6C66] text-[13.5px] md:text-[15px] leading-[1.7] font-inter"
              >
                We operate with strict micro-precision. From the first consultation to the delivery of your custom album box, we ensure that your creative desires are honored.
              </TimelineContent>

              <div className="flex flex-col space-y-6 w-full pt-4">
                {/* Step 1 */}
                <TimelineContent
                  as="div"
                  animationNum={4}
                  customVariants={revealVariants}
                  className="flex gap-4"
                >
                  <span className="w-8 h-8 rounded-full bg-[#0F5C4D] text-white flex items-center justify-center font-serif text-[13px] font-bold shrink-0">1</span>
                  <div>
                    <h4 className="font-serif text-[16px] md:text-[18px] text-[#18352F] font-bold">Creative Consultation</h4>
                    <p className="text-[#5E6C66] text-[12.5px] md:text-[13.5px] mt-1 font-sans">We sit together (or hop on a Zoom call) to understand your aesthetic preferences, style ideas, and timeline flow.</p>
                  </div>
                </TimelineContent>

                {/* Step 2 */}
                <TimelineContent
                  as="div"
                  animationNum={5}
                  customVariants={revealVariants}
                  className="flex gap-4"
                >
                  <span className="w-8 h-8 rounded-full bg-[#0F5C4D] text-white flex items-center justify-center font-serif text-[13px] font-bold shrink-0">2</span>
                  <div>
                    <h4 className="font-serif text-[16px] md:text-[18px] text-[#18352F] font-bold">The Shoot Day</h4>
                    <p className="text-[#5E6C66] text-[12.5px] md:text-[13.5px] mt-1 font-sans">Operating in stealth mode, we document all natural movements, while orchestrating high-end cinematic editorial portraits.</p>
                  </div>
                </TimelineContent>

                {/* Step 3 */}
                <TimelineContent
                  as="div"
                  animationNum={6}
                  customVariants={revealVariants}
                  className="flex gap-4"
                >
                  <span className="w-8 h-8 rounded-full bg-[#0F5C4D] text-white flex items-center justify-center font-serif text-[13px] font-bold shrink-0">3</span>
                  <div>
                    <h4 className="font-serif text-[16px] md:text-[18px] text-[#18352F] font-bold">Artistic Post-Production</h4>
                    <p className="text-[#5E6C66] text-[12.5px] md:text-[13.5px] mt-1 font-sans">Each image is individually retouched, color-graded in our signature palette, and laid out inside custom wedding album frames.</p>
                  </div>
                </TimelineContent>
              </div>
            </div>

            {/* Right Column: Beautiful Wedding Detail Picture */}
            <TimelineContent
              as="div"
              animationNum={2}
              customVariants={revealVariants}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-[24px] overflow-hidden border border-[#D9E6E0] shadow-[0_12px_40px_rgba(15,92,77,0.06)] group"
            >
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
                alt="Intricate details from premium Indian luxury wedding shoot"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover group-hover:scale-102 transition-transform duration-700 pointer-events-none select-none"
              />
            </TimelineContent>

          </div>
        </section>

        {/* 5. CALL TO ACTION */}
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 xl:px-24 bg-[#0b3d34] text-white text-center relative overflow-hidden">
          {/* Decorative circular vector outlines */}
          <div className="absolute left-[10%] top-[-20%] w-[450px] h-[450px] border border-white/5 rounded-full pointer-events-none select-none hidden lg:block" />
          <div className="absolute right-[10%] bottom-[-20%] w-[450px] h-[450px] border border-white/5 rounded-full pointer-events-none select-none hidden lg:block" />
          
          <div className="relative z-10 max-w-[800px] mx-auto flex flex-col items-center">
            <TimelineContent
              as="span"
              animationNum={1}
              customVariants={revealVariants}
              className="text-[10px] md:text-[11px] font-bold tracking-[3.5px] uppercase text-[#E8DCC2] select-none"
            >
              LET'S CAPTURE YOUR STORY
            </TimelineContent>
            
            <TimelineContent
              as="h2"
              animationNum={2}
              customVariants={revealVariants}
              className="font-serif text-[32px] sm:text-[44px] md:text-[52px] font-normal leading-tight tracking-tight mt-3 mb-6"
            >
              Ready to Document Your Legacy?
            </TimelineContent>

            <TimelineContent
              as="p"
              animationNum={3}
              customVariants={revealVariants}
              className="text-white/80 text-[14px] md:text-[16px] leading-relaxed max-w-[560px] mb-8 font-sans"
            >
              We operate across India and worldwide. Connect with us to discuss dates, creative vision, and customized package pricing.
            </TimelineContent>

            <TimelineContent
              as="div"
              animationNum={4}
              customVariants={revealVariants}
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 h-[52px] bg-[#E8DCC2] text-[#0b3d34] font-semibold text-[12.5px] uppercase tracking-wider rounded-[8px] hover:bg-white hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
              >
                <span>GET IN TOUCH NOW</span>
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </TimelineContent>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
