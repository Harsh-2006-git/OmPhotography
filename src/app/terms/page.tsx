"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const terms = [
    {
      num: "01",
      title: "Payment Schedule / भुगतान अनुसूची",
      hinglish: "30% Booking ke waqt, 50% Event ke din, aur bacha hua 20% balance Data Selection/Delivery se pehle dena anivary (mandatory) hai.",
      english: "30% at booking, 50% on the event day, and the remaining 20% balance must be paid before data selection/delivery."
    },
    {
      num: "02",
      title: "No Full Payment, No Delivery / भुगतान नहीं तो डिलीवरी नहीं",
      hinglish: "Jab tak poora payment clear nahi hoga, tab tak final high-resolution photos, videos aur printed album deliver nahi kiye jayenge.",
      english: "No final high-resolution photos, videos, or printed albums will be delivered until the full payment is cleared."
    },
    {
      num: "03",
      title: "Late Payment Charge / विलंब शुल्क",
      hinglish: "Event khatam hone ke 15 din baad tak payment na hone par, bache hue amount par 2% prati mahina (per month) late fee joddi jayegi.",
      english: "If payment is not completed within 15 days of the event, a late fee of 2% per month will be added to the remaining balance."
    },
    {
      num: "04",
      title: "Data Storage Limit / डेटा स्टोरेज सीमा",
      hinglish: "Event ke baad aapka photo/video data hamare paas sirf 3 mahine tak safe rahega. Iske baad data delete hone par studio ki zimmedari nahi hogi.",
      english: "Your photo and video data will only be stored securely for 3 months after the event. The studio is not responsible for data loss after this period."
    },
    {
      num: "05",
      title: "Cancellation Policy / रद्दीकरण नीति",
      hinglish: "Kisi bhi kaaran se event cancel hone par booking amount (advance) refund nahi kiya jayega, ise agli kisi date ke liye adjust kiya ja sakta hai (availability ke hisab se).",
      english: "Booking advance is non-refundable upon cancellation for any reason. However, it can be adjusted for a future date, subject to availability."
    },
    {
      num: "06",
      title: "Editing Timeline / संपादन समय सीमा",
      hinglish: "Final payment aur photo selection milne ke baad album print hone mein 20 se 30 din ka samay lagega.",
      english: "Album printing and final delivery take 20 to 30 days starting from the date of final payment clearance and photo selection."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-[120px] pb-16 px-4 sm:px-6 md:px-12 xl:px-24 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-[#0F5C4D]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-[#E8DCC2]/15 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Page Heading */}
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <span className="font-sans text-[11px] font-bold text-[#0F5C4D] tracking-[0.25em] uppercase block mb-3">
              OM PHOTOGRAPHY STUDIO
            </span>
            <h1 className="font-serif text-[38px] md:text-[50px] font-bold text-[#18352F] leading-tight mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="font-script text-[24px] text-[#0F5C4D] mb-6">
              Shartein / शर्तें
            </p>
            <div className="w-[100px] h-[1px] bg-[#0F5C4D] mx-auto my-6" />
            <p className="font-sans text-[14px] text-[#5E6C66] leading-relaxed">
              Please read our studio rules and guidelines carefully before booking your event. 
              These conditions ensure a smooth, professional, and timely creative process for both parties.
            </p>
          </div>

          {/* Grid of Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {terms.map((term, index) => (
              <div 
                key={index} 
                className="bg-white border border-[#E6ECE8] rounded-[24px] p-6 md:p-8 hover:border-[#0F5C4D]/45 hover:shadow-[0_12px_40px_rgba(15,92,77,0.06)] transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Number tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-[18px] font-bold text-[#0F5C4D] bg-[#EEF7F2] w-[44px] h-[44px] rounded-full flex items-center justify-center">
                      {term.num}
                    </span>
                    <span className="h-[1px] bg-[#E6ECE8] flex-1 ml-4 group-hover:bg-[#0F5C4D]/20 transition-all duration-300" />
                  </div>

                  <h3 className="font-serif text-[18px] md:text-[20px] font-bold text-[#18352F] mb-4">
                    {term.title}
                  </h3>

                  {/* Hinglish text block */}
                  <div className="bg-[#EEF7F2]/40 border-l-2 border-[#0F5C4D] p-4 rounded-r-[12px] mb-4">
                    <p className="font-sans font-medium text-[13.5px] text-[#2C3E35] leading-relaxed italic">
                      &ldquo;{term.hinglish}&rdquo;
                    </p>
                  </div>
                </div>

                {/* English equivalent */}
                <div className="mt-2 border-t border-[#F0F5F2] pt-4">
                  <span className="font-sans text-[9px] uppercase tracking-wider text-[#8A9B92] block mb-1 font-bold">English Equivalent:</span>
                  <p className="font-sans text-[12.5px] text-[#5E6C66] leading-relaxed">
                    {term.english}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-br from-[#0F5C4D] to-[#0A3D33] rounded-[32px] p-8 md:p-12 text-center text-white shadow-[0_20px_50px_rgba(15,92,77,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none select-none opacity-10">
              <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M0,50 Q25,30 50,50 T100,50" />
                <path d="M0,60 Q25,40 50,60 T100,60" />
              </svg>
            </div>
            
            <div className="relative z-10 max-w-[650px] mx-auto">
              <h2 className="font-serif text-[28px] md:text-[36px] font-bold mb-4">
                Have any questions about booking?
              </h2>
              <p className="font-sans text-[13px] md:text-[14px] text-white/80 leading-relaxed mb-8">
                If you need any clarifications regarding our payment structures, editing schedules, or cancellation policy, please contact our team directly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="tel:+916265303386"
                  className="w-full sm:w-auto h-[48px] px-6 bg-white text-[#0F5C4D] font-bold text-[12px] tracking-wider uppercase rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#EEF7F2] transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call +91 62653 03386</span>
                </a>
                
                <a 
                  href="mailto:om.photography.2003@gmail.com"
                  className="w-full sm:w-auto h-[48px] px-6 border border-white/30 text-white font-bold text-[12px] tracking-wider uppercase rounded-[12px] flex items-center justify-center gap-2 hover:bg-white/10 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
