"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getGalleries, ClientGallery, Photo } from "../../../lib/portfolioStore";
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Tag, 
  Save, 
  Database, 
  Info,
  Loader2,
  Lock,
  Unlock,
  Sparkles,
  Heart,
  Grid,
  AlertCircle,
  HelpCircle
} from "lucide-react";

interface LabelPhoto {
  id: string;
  url: string;
  category: string;
  likes: number;
  galleryId: string;
  galleryName: string;
}

const SECTIONS = ["Wedding", "Haldi", "Destination", "Portraits", "Collage", "Ring Ceremony"];

export default function ClassifyImages() {
  const [galleries, setGalleries] = useState<ClientGallery[]>([]);
  const [photos, setPhotos] = useState<LabelPhoto[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load photos from all galleries on mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("om_admin_mode");
    if (storedAdmin === "true") {
      setIsAdmin(true);
    }

    async function loadData() {
      try {
        setLoading(true);
        const gals = await getGalleries();
        setGalleries(gals);

        // Aggregate photos across all galleries
        const list: LabelPhoto[] = [];
        gals.forEach((g) => {
          if (g.photos) {
            g.photos.forEach((p) => {
              list.push({
                id: p.id,
                url: p.url,
                category: p.category || "",
                likes: p.likes || 0,
                galleryId: g.id,
                galleryName: g.name
              });
            });
          }
        });
        setPhotos(list);
      } catch (error) {
        console.error("Failed to load galleries:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Update selected tags when currentIndex changes
  useEffect(() => {
    if (photos.length > 0 && currentIndex < photos.length) {
      const currentPhoto = photos[currentIndex];
      // Current category could be comma separated tags (e.g. "Wedding, Portraits")
      const currentTags = (currentPhoto.category || "")
        .split(",")
        .map((t) => t.trim())
        .filter((t) => SECTIONS.includes(t));
      setSelectedTags(currentTags);
    }
  }, [currentIndex, photos]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Calculate the photo count of each section in real-time
  const getSectionCounts = () => {
    const counts: Record<string, number> = {
      Wedding: 0,
      Haldi: 0,
      Destination: 0,
      Portraits: 0,
      Collage: 0,
      "Ring Ceremony": 0,
      Unclassified: 0
    };

    photos.forEach((p) => {
      const tags = (p.category || "")
        .split(",")
        .map((t) => t.trim())
        .filter((t) => SECTIONS.includes(t));

      if (tags.length === 0) {
        counts.Unclassified += 1;
      } else {
        tags.forEach((t) => {
          if (counts[t] !== undefined) {
            counts[t] += 1;
          }
        });
      }
    });

    return counts;
  };

  const counts = getSectionCounts();

  // Save changes to database and move to next
  const handleSaveAndNext = async () => {
    if (photos.length === 0 || currentIndex >= photos.length) return;
    
    setSaving(true);
    setMessage(null);

    const currentPhoto = photos[currentIndex];
    const newCategoryString = selectedTags.join(", ");

    try {
      // Find the gallery of this photo
      const targetGallery = galleries.find((g) => g.id === currentPhoto.galleryId);
      if (!targetGallery) throw new Error("Gallery not found");

      // Update photo category in gallery photos array
      const updatedPhotos = targetGallery.photos.map((p) =>
        p.id === currentPhoto.id ? { ...p, category: newCategoryString } : p
      );

      const updatedGallery = {
        ...targetGallery,
        photos: updatedPhotos
      };

      // Call API PUT to save changes
      const res = await fetch(`/api/db/galleries/${currentPhoto.galleryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGallery)
      });

      if (!res.ok) {
        throw new Error("Failed to save changes to database");
      }

      // Update local state
      setGalleries((prev) =>
        prev.map((g) => (g.id === currentPhoto.galleryId ? updatedGallery : g))
      );
      setPhotos((prev) =>
        prev.map((p, i) =>
          i === currentIndex ? { ...p, category: newCategoryString } : p
        )
      );

      setMessage({ text: "Saved successfully!", type: "success" });
      
      // Auto dismiss message and move next
      setTimeout(() => {
        setMessage(null);
        if (currentIndex < photos.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 800);

    } catch (error: any) {
      console.error(error);
      setMessage({ text: error.message || "Failed to save category", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // Keyboard navigation hotkeys (1-5 to toggle tags, Space/Enter to save & next, Arrow keys to navigate)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (loading || saving || photos.length === 0) return;

      // 1-6 keys to toggle categories
      if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
        e.preventDefault();
        const tagIndex = parseInt(e.key) - 1;
        if (tagIndex < SECTIONS.length) {
          toggleTag(SECTIONS[tagIndex]);
        }
      }

      // Space or Enter to save & go next
      if (e.key === "Enter") {
        e.preventDefault();
        handleSaveAndNext();
      }

      // ArrowLeft to go back, ArrowRight to go forward
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentIndex < photos.length - 1) setCurrentIndex((prev) => prev + 1);
      }
    },
    [loading, saving, photos, currentIndex, selectedTags, galleries]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white text-[#18352F]">
        <Header />
        <div className="flex-1 pt-[100px] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 text-[#0F5C4D] animate-spin" />
          <span className="text-xs uppercase tracking-widest text-[#5E6C66] font-bold">
            Loading Portfolio Captures...
          </span>
        </div>
        <Footer />
      </div>
    );
  }

  // Admin access block wrapper (bypassed in local development for convenience)
  const isDev = process.env.NODE_ENV === "development";
  if (!isAdmin && !isDev) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white text-[#18352F]">
        <Header />
        <div className="flex-1 pt-[100px] max-w-[500px] mx-auto px-4 flex flex-col items-center justify-center text-center gap-4">
          <Lock className="w-12 h-12 text-red-500 animate-bounce" />
          <h2 className="font-serif text-[24px] text-[#18352F]">Admin Authorization Required</h2>
          <p className="text-[#5E6C66] text-sm leading-relaxed">
            This image classification dashboard is restricted to administrator accounts. Please log in through the Admin Dashboard on the main portfolio page.
          </p>
          <div className="pt-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#0F5C4D] text-white hover:bg-[#1F6F63] font-bold text-xs uppercase tracking-wider transition-all duration-300"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#18352F] font-sans flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-[80px] md:pt-[100px] pb-16 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-24">
        
        {/* Classifier Header */}
        <div className="border-b border-[#D9E6E0] pb-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#0F5C4D]" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#0F5C4D] font-bold">
                ADMIN CONSOLE
              </span>
            </div>
            <h1 className="font-serif text-[24px] md:text-[32px] text-[#18352F] font-normal tracking-tight mt-1">
              Image Section Tagging Assistant
            </h1>
          </div>
          
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center h-9.5 px-5 rounded-full border-2 border-[#0F5C4D] text-[#0F5C4D] hover:bg-[#0F5C4D] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300"
          >
            &larr; View Portfolio
          </Link>
        </div>

        {photos.length === 0 ? (
          <div className="py-20 text-center max-w-[400px] mx-auto bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-200">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-serif text-[18px] mb-1">No Photos Seeding</h3>
            <p className="text-gray-500 text-xs">Create client galleries and upload photos first to enable tag editing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: ACTIVE IMAGE & TAG SELECTION */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Image Preview Container */}
              <div className="relative w-full aspect-[4/3] max-h-[500px] rounded-2xl overflow-hidden border border-[#D9E6E0] bg-gray-900 shadow-lg flex items-center justify-center group">
                <Image
                  src={photos[currentIndex].url}
                  alt="Tagger Preview"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                
                {/* Overlay Metadata */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white flex justify-between items-end">
                  <div className="text-left space-y-0.5">
                    <span className="text-[9px] uppercase tracking-widest text-[#DCEFE8] font-bold">
                      Gallery: {photos[currentIndex].galleryName}
                    </span>
                    <h3 className="text-sm font-semibold opacity-95">
                      File ID: {photos[currentIndex].id}
                    </h3>
                  </div>
                  <span className="text-xs bg-[#0F5C4D] px-3 py-1 rounded-full text-white font-bold">
                    Image {currentIndex + 1} of {photos.length}
                  </span>
                </div>
              </div>

              {/* Navigation & Controls Row */}
              <div className="flex justify-between items-center bg-gray-50 border border-[#D9E6E0] rounded-xl p-3.5">
                <button
                  onClick={() => currentIndex > 0 && setCurrentIndex((prev) => prev - 1)}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5E6C66] hover:text-[#0F5C4D] disabled:opacity-30 disabled:hover:text-[#5E6C66] transition-colors"
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </button>

                <div className="text-xs font-bold text-[#5E6C66]">
                  Progress: {Math.round(((currentIndex + 1) / photos.length) * 100)}% Complete
                </div>

                <button
                  onClick={() => currentIndex < photos.length - 1 && setCurrentIndex((prev) => prev + 1)}
                  disabled={currentIndex === photos.length - 1}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5E6C66] hover:text-[#0F5C4D] disabled:opacity-30 disabled:hover:text-[#5E6C66] transition-colors"
                >
                  <span>Skip</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Tag Selection Checklist */}
              <div className="bg-white border border-[#D9E6E0] rounded-2xl p-6 shadow-sm space-y-5">
                <div>
                  <h3 className="font-serif text-[18px] text-[#18352F]">Assign Section Categories</h3>
                  <p className="text-xs text-[#5E6C66] mt-0.5">Select all sections this photograph fits in. Single image can hold multiple sections.</p>
                </div>

                {/* Checklist Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {SECTIONS.map((tag, idx) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`h-11 px-4.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between border-2 transition-all
                          ${isSelected 
                            ? "bg-[#0F5C4D] border-[#0F5C4D] text-white shadow-sm scale-[1.01]" 
                            : "border-gray-200 bg-white hover:border-[#0F5C4D]/40 text-[#5E6C66] hover:text-[#0F5C4D]"
                          }
                        `}
                      >
                        <span>{tag}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] transition-colors
                          ${isSelected 
                            ? "bg-white/20 border-white text-white" 
                            : "border-gray-300 bg-gray-50 text-transparent"
                          }
                        `}>
                          {isSelected && <Check size={11} className="stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Messages */}
                {message && (
                  <div className={`flex items-center gap-2 p-3 rounded-lg text-xs font-semibold
                    ${message.type === "success" 
                      ? "bg-green-50 text-green-700 border border-green-150 animate-fade-in" 
                      : "bg-red-50 text-red-700 border border-red-150"
                    }
                  `}>
                    <Info size={14} />
                    <span>{message.text}</span>
                  </div>
                )}

                {/* Save and Continue Button */}
                <div className="pt-2">
                  <button
                    onClick={handleSaveAndNext}
                    disabled={saving}
                    className="w-full h-12 rounded-xl bg-[#0F5C4D] hover:bg-[#1f6f63] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] disabled:opacity-65"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Saving to Database...</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Save Categories &amp; Next</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-2.5">
                    Hotkey Shortcut: Press <span className="font-bold text-gray-500 font-mono bg-gray-100 px-1 py-0.5 rounded">Enter</span> to save &amp; move to next image.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: SECTION COUNTS & HOTKEYS */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Counts Dashboard Card */}
              <div className="bg-[#0F5C4D] text-white border border-[#1f6f63] rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,239,232,0.08),transparent_70%)] pointer-events-none" />
                
                <h3 className="font-serif text-[17px] tracking-wide text-[#DCEFE8] mb-4 flex items-center gap-2">
                  <Database size={16} />
                  <span>Real-Time Section Counts</span>
                </h3>

                <div className="space-y-3.5">
                  {SECTIONS.map((sec) => (
                    <div key={sec} className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-xs uppercase tracking-wider text-white/85">{sec} Section</span>
                      <span className="text-sm font-bold bg-white/15 px-2.5 py-0.5 rounded-full font-mono">
                        {counts[sec] || 0}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs uppercase tracking-wider text-red-200">Unclassified</span>
                    <span className="text-sm font-bold bg-red-500/25 text-red-200 px-2.5 py-0.5 rounded-full font-mono animate-pulse">
                      {counts.Unclassified || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tagging Shortcuts Helper */}
              <div className="bg-white border border-[#D9E6E0] rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="font-serif text-[16px] text-[#18352F] flex items-center gap-2">
                  <Sparkles size={16} className="text-[#0F5C4D]" />
                  <span>Tagging Keyboard Hotkeys</span>
                </h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5E6C66]">Toggle Wedding</span>
                    <kbd className="font-mono bg-gray-150 px-2 py-0.5 rounded border text-[10px] font-bold text-[#18352F]">1</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5E6C66]">Toggle Haldi</span>
                    <kbd className="font-mono bg-gray-150 px-2 py-0.5 rounded border text-[10px] font-bold text-[#18352F]">2</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5E6C66]">Toggle Destination</span>
                    <kbd className="font-mono bg-gray-150 px-2 py-0.5 rounded border text-[10px] font-bold text-[#18352F]">3</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5E6C66]">Toggle Portraits</span>
                    <kbd className="font-mono bg-gray-150 px-2 py-0.5 rounded border text-[10px] font-bold text-[#18352F]">4</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5E6C66]">Toggle Collage</span>
                    <kbd className="font-mono bg-gray-150 px-2 py-0.5 rounded border text-[10px] font-bold text-[#18352F]">5</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5E6C66]">Toggle Ring Ceremony</span>
                    <kbd className="font-mono bg-gray-150 px-2 py-0.5 rounded border text-[10px] font-bold text-[#18352F]">6</kbd>
                  </div>
                  <div className="h-[1px] bg-[#D9E6E0] my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-[#5E6C66]">Save &amp; Next Image</span>
                    <kbd className="font-mono bg-gray-150 px-2.5 py-0.5 rounded border text-[9px] font-bold text-[#18352F]">ENTER</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#5E6C66]">Navigate Left/Right</span>
                    <kbd className="font-mono bg-gray-150 px-2 py-0.5 rounded border text-[10px] font-bold text-[#18352F]">&larr; / &rarr;</kbd>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* BOTTOM SECTION: SCROLLABLE THUMBNAILS MASONRY */}
        {photos.length > 0 && (
          <div className="mt-16 border-t border-[#D9E6E0] pt-10">
            <h3 className="font-serif text-[20px] text-[#18352F] mb-6 flex items-center gap-2">
              <Grid size={18} className="text-[#0F5C4D]" />
              <span>Full Portfolio Catalog ({photos.length} Photos)</span>
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {photos.map((ph, idx) => {
                const isActive = idx === currentIndex;
                const isClassified = (ph.category || "").trim().length > 0;
                
                return (
                  <div
                    key={ph.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative aspect-[3/4] rounded-lg overflow-hidden border cursor-pointer transition-all duration-200 hover:scale-[1.03]
                      ${isActive 
                        ? "border-[#0F5C4D] border-2 shadow-md ring-2 ring-[#0F5C4D]/25" 
                        : "border-[#D9E6E0] opacity-75 hover:opacity-100"
                      }
                    `}
                  >
                    <Image
                      src={ph.url}
                      alt="Thumbnail Catalog"
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                    
                    {/* Status Badge */}
                    {isClassified && (
                      <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-green-500 border border-white flex items-center justify-center text-[8px] text-white">
                        <Check size={8} className="stroke-[4]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
