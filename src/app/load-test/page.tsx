"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface CloudinaryImageRecord {
  cloudinaryUrl: string;
  bytes: number;
  format: string;
  wasCompressed?: boolean;
  originalBytes?: number;
}

export default function LoadTestPage() {
  const [images, setImages] = useState<{ path: string; details: CloudinaryImageRecord }[]>([]);
  const [loadStartTime] = useState<number>(Date.now());
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null);
  const [loadedImagesCount, setLoadedImagesCount] = useState<number>(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState<boolean>(false);
  const [imagesLoadDuration, setImagesLoadDuration] = useState<number | null>(null);
  const [totalSizeMB, setTotalSizeMB] = useState<number>(0);
  const [originalTotalSizeMB, setOriginalTotalSizeMB] = useState<number>(0);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch("/api/db/photos");
        if (!res.ok) throw new Error("Failed to fetch photos");
        const data = await res.json();
        
        const records = data.map((p: any) => ({
          path: p.publicId || p.id,
          details: {
            cloudinaryUrl: p.url,
            bytes: p.bytes || 0,
            originalBytes: p.originalBytes || p.bytes || 0,
            wasCompressed: p.wasCompressed || false,
            format: p.format || "jpg"
          }
        }));
        
        setImages(records);
        
        // Calculate sizes
        let compressedSum = 0;
        let originalSum = 0;
        records.forEach((img: any) => {
          compressedSum += img.details.bytes || 0;
          originalSum += img.details.originalBytes || img.details.bytes || 0;
        });

        setTotalSizeMB(compressedSum / (1024 * 1024));
        setOriginalTotalSizeMB(originalSum / (1024 * 1024));
        
        // Page interactive time
        const duration = Date.now() - loadStartTime;
        setPageLoadTime(duration);
      } catch (error) {
        console.error("Failed to load images from database:", error);
      }
    }
    loadImages();
  }, []);

  const handleImageLoad = () => {
    setLoadedImagesCount((prev) => {
      const next = prev + 1;
      if (next === images.length && images.length > 0) {
        setAllImagesLoaded(true);
        setImagesLoadDuration(Date.now() - loadStartTime);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-transparent text-[#18352F] font-sans flex flex-col justify-between scroll-smooth">
      <Header />

      <main className="flex-1 pt-[80px] md:pt-[100px] pb-16 w-full max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="mb-8 pb-4 border-b border-[#D9E6E0] flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#0F5C4D] inline-block" />
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#0F5C4D] font-bold">
                Performance Check
              </span>
            </div>
            <h1 className="font-serif text-[28px] md:text-[36px] text-[#18352F] font-normal tracking-tight mt-1">
              Cloudinary Load Test
            </h1>
            <p className="text-[#5E6C66] text-xs sm:text-sm mt-1 max-w-[600px]">
              This sample page renders all successfully uploaded images from your Cloudinary cloud. Use this to benchmark loading speeds and verify compression quality.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="h-9 px-5 rounded-[12px] bg-[#0F5C4D]/10 text-[#0F5C4D] hover:bg-[#0F5C4D] hover:text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center transition-all duration-300 self-start md:self-auto shadow-sm"
          >
            &larr; Back to Portfolio
          </Link>
        </div>

        {/* Dashboard Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Total Images */}
          <div className="bg-white border border-[#D9E6E0] rounded-[18px] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6C66]">Total Images</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-[24px] font-serif text-[#0F5C4D] font-bold leading-none">
                {images.length}
              </span>
              <span className="text-xs text-[#5E6C66]">files</span>
            </div>
            <span className="text-[9px] text-[#5E6C66]/80 mt-1 block">Active on Cloudinary</span>
          </div>

          {/* Card 2: Bandwidth Savings */}
          <div className="bg-white border border-[#D9E6E0] rounded-[18px] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6C66]">Bandwidth Footprint</span>
            <div className="flex flex-col mt-2">
              <span className="text-[18px] font-serif text-[#0F5C4D] font-bold leading-none">
                {totalSizeMB.toFixed(1)} MB
              </span>
              <span className="text-[10px] text-red-500 line-through mt-1">
                Was {originalTotalSizeMB.toFixed(1)} MB
              </span>
            </div>
            <span className="text-[9px] text-[#3F9B73] font-bold mt-1 block">
              Saved {((1 - (totalSizeMB / (originalTotalSizeMB || 1))) * 100).toFixed(1)}% size
            </span>
          </div>

          {/* Card 3: Load Status */}
          <div className="bg-white border border-[#D9E6E0] rounded-[18px] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6C66]">Loaded State</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-[24px] font-serif text-[#0F5C4D] font-bold leading-none">
                {loadedImagesCount}
              </span>
              <span className="text-xs text-[#5E6C66]">/ {images.length}</span>
            </div>
            <span className="text-[9px] mt-1 block font-semibold text-[#0F5C4D]">
              {allImagesLoaded ? "🟢 All fully loaded" : "🔵 Loading images..."}
            </span>
          </div>

          {/* Card 4: Load Speed */}
          <div className="bg-white border border-[#D9E6E0] rounded-[18px] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6C66]">Page Load Speed</span>
            <div className="flex flex-col mt-2">
              <span className="text-[18px] font-serif text-[#0F5C4D] font-bold leading-none">
                {pageLoadTime ? `${(pageLoadTime / 1000).toFixed(2)}s` : "Calculating..."}
              </span>
              <span className="text-[10px] text-[#5E6C66] mt-1">
                Image stream: {imagesLoadDuration ? `${(imagesLoadDuration / 1000).toFixed(2)}s` : "loading..."}
              </span>
            </div>
            <span className="text-[9px] text-[#5E6C66]/80 mt-1 block">Time to interact</span>
          </div>
        </div>

        {/* Live Loading Progress Bar */}
        {!allImagesLoaded && images.length > 0 && (
          <div className="w-full bg-[#DCEFE8] rounded-full h-2 mb-8 overflow-hidden">
            <div
              className="bg-[#0F5C4D] h-full transition-all duration-300"
              style={{ width: `${(loadedImagesCount / images.length) * 100}%` }}
            />
          </div>
        )}

        {/* Image Masonry Grid */}
        {images.length === 0 ? (
          <div className="py-24 text-center max-w-[400px] mx-auto bg-white border border-[#D9E6E0] rounded-2xl p-8 shadow-sm">
            <h4 className="font-serif text-[18px] text-[#18352F] mb-1">No Cloudinary Images Found</h4>
            <p className="text-[#5E6C66] text-xs font-sans">
              Ensure you have successfully run the upload script and that `cloudinary_urls.json` contains valid success entries.
            </p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-5">
            {images.map((img) => (
              <div
                key={img.path}
                className="break-inside-avoid mb-4 md:mb-5 group relative rounded-xl overflow-hidden bg-white border border-[#D9E6E0] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={img.details.cloudinaryUrl}
                  alt={img.path.split("/").pop()}
                  onLoad={handleImageLoad}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-[2px] p-2 text-white text-[9px] font-sans flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="truncate max-w-[120px]" title={img.path.split("/").pop()}>
                    {img.path.split("/").pop()}
                  </span>
                  <span className="bg-[#DCEFE8] text-[#0F5C4D] px-1.5 py-0.5 rounded font-bold">
                    {(img.details.bytes / 1024).toFixed(0)} KB
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
