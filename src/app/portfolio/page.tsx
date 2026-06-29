"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  getCategories,
  saveCategories,
  getGalleries,
  saveGalleries,
  ClientGallery,
  Photo,
  Category,
  addCategory,
  deleteCategory,
  addGallery,
  deleteGallery,
  updateGallery,
} from "../../lib/portfolioStore";
import {
  Folder,
  Plus,
  Trash2,
  Lock,
  Eye,
  LogOut,
  Image as ImageIcon,
  Heart,
  Download,
  Share2,
  Search,
  Calendar,
  MapPin,
  Camera,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Play,
  Pause,
  X,
  Copy,
  Mail,
  MessageSquare,
  QrCode,
  ShieldAlert,
  Unlock,
  Check,
  Award,
  Users,
  Flame,
  CameraOff,
} from "lucide-react";

export default function Portfolio() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [galleries, setGalleries] = useState<ClientGallery[]>([]);

  // Selection states
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeGallery, setActiveGallery] = useState<ClientGallery | null>(null);

  // Search, Filter, Sort
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Photos");
  const [sortBy, setSortBy] = useState("Latest");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Admin States
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);

  // Forms
  const [newCatName, setNewCatName] = useState("");
  const [newCatCover, setNewCatCover] = useState("");

  const [newGalName, setNewGalName] = useState("");
  const [newGalDesc, setNewGalDesc] = useState("");
  const [newGalDate, setNewGalDate] = useState("");
  const [newGalLoc, setNewGalLoc] = useState("");
  const [newGalCover, setNewGalCover] = useState("");
  const [newGalPublic, setNewGalPublic] = useState(true);
  const [newGalPass, setNewGalPass] = useState("");

  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoCat, setNewPhotoCat] = useState("Couple Portraits");

  // Private Gallery Lock
  const [galleryUnlocked, setGalleryUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // Favorites & Modals
  const [clientFavorites, setClientFavorites] = useState<string[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Request Access Modal
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [reqName, setReqName] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const [reqMsg, setReqMsg] = useState("");

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(false);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);
  const slideshowTimer = useRef<NodeJS.Timeout | null>(null);

  // Load state on mount
  useEffect(() => {
    const cats = getCategories();
    const gals = getGalleries();
    setCategories(cats);
    setGalleries(gals);

    const storedAdmin = localStorage.getItem("om_admin_mode");
    if (storedAdmin === "true") {
      setIsAdmin(true);
    }
  }, []);

  // Get all unique photos across all galleries
  const getAllPhotos = () => {
    const uniqueUrls = new Set<string>();
    const list: Photo[] = [];
    galleries.forEach((g) => {
      if (g.photos) {
        g.photos.forEach((p) => {
          if (!uniqueUrls.has(p.url)) {
            uniqueUrls.add(p.url);
            list.push(p);
          }
        });
      }
    });
    return list;
  };

  // Handle category selection change
  const handleSelectCategory = (cat: Category) => {
    setActiveCategory(cat);
    const catGals = getGalleries().filter((g) => g.categoryId === cat.id);
    setGalleries(catGals);
    if (catGals.length > 0) {
      setActiveGallery(catGals[0]);
    } else {
      setActiveGallery(null);
    }
    // Reset view options
    setSearchQuery("");
    setActiveFilter("All Photos");
    setFavoritesOnly(false);
    setVisibleCount(8);
  };

  // Lock logic
  useEffect(() => {
    if (activeGallery) {
      if (activeGallery.isPublic || isAdmin) {
        setGalleryUnlocked(true);
      } else {
        setGalleryUnlocked(false);
        setPasswordInput("");
        setPasswordError(false);
      }
    }
  }, [activeGallery, isAdmin]);

  // Slideshow
  useEffect(() => {
    if (isPlayingSlideshow && lightboxIndex !== null && filteredPhotos.length > 0) {
      slideshowTimer.current = setInterval(() => {
        setLightboxIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % filteredPhotos.length;
        });
      }, 3000);
    } else {
      if (slideshowTimer.current) clearInterval(slideshowTimer.current);
    }
    return () => {
      if (slideshowTimer.current) clearInterval(slideshowTimer.current);
    };
  }, [isPlayingSlideshow, lightboxIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevPhoto();
      else if (e.key === "ArrowRight") handleNextPhoto();
      else if (e.key === "Escape") handleCloseLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const handleToggleAdmin = () => {
    const nextAdmin = !isAdmin;
    setIsAdmin(nextAdmin);
    localStorage.setItem("om_admin_mode", String(nextAdmin));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const id = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const cover = newCatCover.trim() || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";

    const added = addCategory({
      id,
      name: newCatName,
      coverUrl: cover,
    });

    const updatedCats = getCategories();
    setCategories(updatedCats);
    setActiveCategory(added);
    setNewCatName("");
    setNewCatCover("");
    setShowAddFolderModal(false);
  };

  const handleDeleteCategory = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete the "${name}" folder? This will delete all client shoots inside.`)) {
      deleteCategory(id);
      const updatedCats = getCategories();
      setCategories(updatedCats);
      if (updatedCats.length > 0) {
        handleSelectCategory(updatedCats[0]);
      } else {
        setActiveCategory(null);
        setActiveGallery(null);
      }
    }
  };

  const handleUnlockGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeGallery && passwordInput === (activeGallery.password || "1234")) {
      setGalleryUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCategory || !newGalName.trim()) return;

    const id = newGalName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();
    const added = addGallery({
      id,
      categoryId: activeCategory.id,
      name: newGalName,
      description: newGalDesc || "A premium curated shoot capturing beautiful moments.",
      date: newGalDate || new Date().toISOString().split("T")[0],
      location: newGalLoc || "India",
      photographer: "Om",
      coverUrl: newGalCover || undefined,
      isPublic: newGalPublic,
      password: newGalPublic ? undefined : newGalPass || "1234",
    });

    const updatedGals = getGalleries().filter((g) => g.categoryId === activeCategory.id);
    setGalleries(updatedGals);
    setActiveGallery(added);

    setNewGalName("");
    setNewGalDesc("");
    setNewGalDate("");
    setNewGalLoc("");
    setNewGalCover("");
    setNewGalPublic(true);
    setNewGalPass("");
    setShowAddGalleryModal(false);
  };

  const handleDeleteGallery = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the client gallery "${name}"?`)) {
      deleteGallery(id);
      if (activeCategory) {
        const updatedGals = getGalleries().filter((g) => g.categoryId === activeCategory.id);
        setGalleries(updatedGals);
        if (updatedGals.length > 0) {
          setActiveGallery(updatedGals[0]);
        } else {
          setActiveGallery(null);
        }
      }
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGallery || !newPhotoUrl.trim()) return;

    const newPhoto: Photo = {
      id: "ph-" + Date.now(),
      url: newPhotoUrl,
      category: newPhotoCat,
      likes: 0,
    };

    const updatedGallery = {
      ...activeGallery,
      photos: [...activeGallery.photos, newPhoto],
    };

    updateGallery(updatedGallery);
    setActiveGallery(updatedGallery);

    if (activeCategory) {
      setGalleries(getGalleries().filter((g) => g.categoryId === activeCategory.id));
    }
    setNewPhotoUrl("");
  };

  const handleDeletePhoto = (photoId: string) => {
    if (!activeGallery) return;
    if (confirm("Delete this photo?")) {
      const updatedGallery = {
        ...activeGallery,
        photos: activeGallery.photos.filter((p) => p.id !== photoId),
      };

      updateGallery(updatedGallery);
      setActiveGallery(updatedGallery);
      if (activeCategory) {
        setGalleries(getGalleries().filter((g) => g.categoryId === activeCategory.id));
      }
    }
  };

  const handleToggleFavorite = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated = [...clientFavorites];
    if (updated.includes(photoId)) {
      updated = updated.filter((id) => id !== photoId);
    } else {
      updated.push(photoId);
    }
    setClientFavorites(updated);
  };

  // Filtering, Searching, Sorting
  const getFilteredPhotos = () => {
    let list = getAllPhotos();

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.category.toLowerCase().includes(q));
    }

    if (favoritesOnly) {
      list = list.filter((p) => clientFavorites.includes(p.id));
    }

    return list;
  };

  const filteredPhotos = getFilteredPhotos();
  const visiblePhotos = filteredPhotos.slice(0, visibleCount);

  // Lightbox handlers
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxZoom(false);
    setIsPlayingSlideshow(false);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    setIsPlayingSlideshow(false);
  };

  const handlePrevPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? filteredPhotos.length - 1 : prev - 1;
    });
    setLightboxZoom(false);
  };

  const handleNextPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % filteredPhotos.length;
    });
    setLightboxZoom(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSuccess(true);
    setTimeout(() => {
      setShowRequestModal(false);
      setRequestSuccess(false);
      setReqName("");
      setReqEmail("");
      setReqMsg("");
    }, 2500);
  };

  const getBannerUrl = () => {
    if (activeGallery?.coverUrl) return activeGallery.coverUrl;
    if (activeGallery?.photos && activeGallery.photos.length > 0) {
      return activeGallery.photos[0].url;
    }
    return "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1200&q=80";
  };

  // Get dynamic folder icon helper
  const getFolderIcon = (catId: string, size = 18) => {
    switch (catId) {
      case "weddings":
        return <Award size={size} className="text-[#0F5C4D]" />;
      case "pre-weddings":
        return <Heart size={size} className="text-[#0F5C4D]" />;
      case "birthdays":
        return <Users size={size} className="text-[#0F5C4D]" />;
      case "events":
        return <Flame size={size} className="text-[#0F5C4D]" />;
      default:
        return <Folder size={size} className="text-[#0F5C4D]" />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#18352F] font-sans flex flex-col justify-between scroll-smooth">
      <Header />

      {/* Main Container - Aligned exactly below sticky header */}
      <main className="flex-1 pt-[60px] md:pt-[70px] pb-16 w-full">
        {/* FIRST FOLD CONTAINER: HERO + CATEGORIES */}
        <div className="h-[calc(100dvh-60px)] md:h-[calc(100vh-70px)] w-full flex flex-col justify-between relative bg-transparent pb-2 shrink-0">
          {/* HERO SECTION */}
          <section className="relative w-full flex-1 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1600&q=80"
                alt="Luxury wedding background"
                fill
                priority
                className="object-cover brightness-[0.55]"
              />
            </div>

            <div className="relative z-20 text-center px-4 max-w-[800px] mx-auto mt-[10px] md:mt-[20px]">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="w-8 h-[1px] bg-[#DCEFE8]" />
                <span className="text-[#DCEFE8] text-[10px] md:text-[11px] font-sans font-semibold tracking-[3px] uppercase">
                  OUR PORTFOLIO
                </span>
                <span className="w-8 h-[1px] bg-[#DCEFE8]" />
              </div>
              <h1 className="font-serif text-[28px] sm:text-[38px] md:text-[46px] text-white font-normal leading-tight tracking-tight mb-2 uppercase">
                Stories That Last Forever
              </h1>
              <p className="text-white/80 text-xs sm:text-[13px] md:text-[14px] max-w-[500px] mx-auto font-sans leading-relaxed">
                A collection of beautiful moments, captured realistically with premium passion and custom visual artistry.
              </p>
            </div>
          </section>

          {/* CATEGORIES SELECTION SECTION (SINGLE ROW HORIZONTAL ROW) */}
          <section className="px-4 md:px-6 lg:px-8 xl:px-10 w-full mt-4 mb-2 relative z-20 shrink-0">
            <div className="flex flex-col md:flex-row justify-between items-center mb-3 pb-1.5 border-b border-[#D9E6E0] gap-2">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-6 h-[1px] bg-[#0F5C4D] inline-block" />
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#0F5C4D] font-bold">
                    PORTFOLIO COLLECTIONS
                  </span>
                </div>
                <h2 className="font-serif text-[18px] sm:text-[22px] text-[#18352F] font-normal tracking-tight mt-0.5">
                  Browse Our Featured Shoots
                </h2>
              </div>

              {/* Admin control switch */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleAdmin}
                  className={`flex items-center gap-1.5 h-8 px-3.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300 border ${isAdmin
                      ? "bg-[#0F5C4D] border-transparent text-white shadow-sm"
                      : "border-[#0F5C4D] text-[#0F5C4D] bg-transparent hover:bg-[#0F5C4D]/10"
                    }`}
                >
                  {isAdmin ? <LogOut size={11} /> : <Lock size={11} />}
                  <span>{isAdmin ? "Admin Active" : "Admin Dashboard"}</span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => setShowAddFolderModal(true)}
                    className="flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-[#18352F] text-white text-[10px] font-bold hover:bg-black transition-colors"
                  >
                    <Plus size={12} />
                    <span>Create Folder</span>
                  </button>
                )}
              </div>
            </div>

            {/* SINGLE ROW HORIZONTAL FLEX BOX */}
            <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#0F5C4D]/35 flex gap-4 md:gap-5 items-stretch">
              {categories
                .sort((a, b) => a.order - b.order)
                .map((cat) => {
                  return (
                    <Link
                      key={cat.id}
                      href={`/portfolio/${cat.id}`}
                      className="flex-shrink-0 w-[170px] md:w-[180px] text-left relative rounded-xl overflow-hidden bg-white border border-[#D9E6E0] hover:border-[#0F5C4D]/60 shadow-sm hover:shadow-[0_6px_18px_rgba(15,92,77,0.06)] hover:scale-[1.01] transition-all duration-350 flex flex-col justify-between group cursor-pointer"
                    >
                      {/* Thumbnail Image Cover */}
                      <div className="relative h-[105px] md:h-[120px] w-full overflow-hidden shrink-0">
                        <Image
                          src={cat.coverUrl}
                          alt={cat.name}
                          fill
                          sizes="180px"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70" />

                        {/* Floating Circle Icon */}
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                          {getFolderIcon(cat.id, 16)}
                        </div>
                      </div>

                      {/* Metadata text */}
                      <div className="p-2.5 md:p-3 bg-white flex-1 flex flex-col justify-center text-center">
                        <h3 className="font-serif text-[11.5px] md:text-[12.5px] font-bold uppercase tracking-wider text-[#18352F] truncate w-full">
                          {cat.name}
                        </h3>
                        <span className="text-[#5E6C66] text-[9.5px] md:text-[10px] tracking-wide font-sans mt-0.5 block">
                          {cat.shootCount || 0} Shoots
                        </span>
                      </div>

                      {/* Admin Delete Overlay */}
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteCategory(cat.id, cat.name, e);
                          }}
                          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 text-white hover:text-red-400 flex items-center justify-center transition-colors shadow-md z-30"
                        >
                          <Trash2 size={10} />
                        </button>
                      )}
                    </Link>
                  );
                })}
            </div>
          </section>
        </div>

        {/* CURATED PORTFOLIO GRID HEADER */}
        <div className="px-4 md:px-6 lg:px-8 xl:px-10 w-full mt-10 mb-6 shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-center pb-4 border-b border-[#D9E6E0] gap-4">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="w-6 h-[1px] bg-[#0F5C4D] inline-block" />
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#0F5C4D] font-bold">
                  CURATED PORTFOLIO
                </span>
              </div>
              <h2 className="font-serif text-[22px] sm:text-[26px] text-[#18352F] font-normal tracking-tight mt-1">
                A Showcase of Beautiful Moments
              </h2>
            </div>

            {/* SEARCH & FAVORITES */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-[200px]">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search captures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-full border border-gray-200 text-xs focus:outline-none focus:border-[#0F5C4D] bg-white"
                />
              </div>
              <button
                onClick={() => {
                  setFavoritesOnly(!favoritesOnly);
                  setVisibleCount(12);
                }}
                className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-[10.5px] font-bold transition-all border ${favoritesOnly
                    ? "bg-red-500 border-transparent text-white shadow-sm"
                    : "border-gray-200 text-[#5E6C66] bg-white hover:bg-gray-50"
                  }`}
              >
                <Heart size={11} className={favoritesOnly ? "fill-white" : ""} />
                <span>Favorites ({clientFavorites.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* PINTEREST MASONRY SECTION */}
        <section className="px-4 md:px-6 lg:px-8 xl:px-10 w-full mb-16 relative z-10 flex-1">
          {filteredPhotos.length === 0 ? (
            <div className="py-16 text-center max-w-[400px] mx-auto bg-white border border-[#D9E6E0] rounded-2xl p-8 shadow-sm">
              <ShieldAlert size={32} className="text-gray-400 mx-auto mb-3 animate-pulse" />
              <h4 className="font-serif text-[18px] text-[#18352F] mb-1">No Photos Found</h4>
              <p className="text-[#5E6C66] text-xs font-sans">Try searching a different tag or clear favorites filter.</p>
            </div>
          ) : (
            <>
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-5">
                {visiblePhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="break-inside-avoid mb-4 md:mb-5 group relative rounded-xl overflow-hidden bg-white border border-[#D9E6E0]/30 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                    onClick={() => handleOpenLightbox(idx)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.category}
                      loading="lazy"
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => handleToggleFavorite(photo.id, e)}
                          className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:text-red-500 hover:bg-white/40 transition-colors"
                        >
                          <Heart
                            size={13}
                            className={clientFavorites.includes(photo.id) ? "fill-red-500 text-red-500" : ""}
                          />
                        </button>
                      </div>
                      <div className="text-left">
                        <span className="text-[8.5px] uppercase tracking-wider text-[#DCEFE8] font-semibold">
                          {photo.category}
                        </span>
                        <p className="text-[11px] font-sans text-white/95 mt-0.5">View Frame &rsaquo;</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < filteredPhotos.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="h-11 px-8 rounded-[14px] border border-[#0F5C4D] text-[#0F5C4D] hover:bg-[#0F5C4D] hover:text-white font-semibold text-[10.5px] uppercase tracking-[1.5px] transition-all duration-300 shadow-sm"
                  >
                    Load More Photos
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* CREATE PORTFOLIO FOLDER MODAL */}
      {showAddFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#D9E6E0] rounded-[20px] max-w-[420px] w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-[#D9E6E0]/40 flex justify-between items-center bg-white">
              <h3 className="font-serif text-[16px] font-bold text-[#18352F]">Create Category Folder</h3>
              <button onClick={() => setShowAddFolderModal(false)} className="text-[#5E6C66] hover:text-black font-semibold text-lg">
                &times;
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6C66] mb-1">
                  Folder Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Birthdays, Corporate, Pre-Weddings"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full h-10 px-3 border border-[#D9E6E0] rounded-[14px] focus:outline-none focus:border-[#0F5C4D] text-[13px]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6C66] mb-1 flex items-center justify-between">
                  <span>Cover Image URL</span>
                  <span className="text-[9px] text-[#0F5C4D] lowercase font-semibold">Optional</span>
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newCatCover}
                  onChange={(e) => setNewCatCover(e.target.value)}
                  className="w-full h-10 px-3 border border-[#D9E6E0] rounded-[14px] focus:outline-none focus:border-[#0F5C4D] text-[13px]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddFolderModal(false)}
                  className="h-9 px-4 rounded-[14px] text-[11px] font-bold uppercase text-[#5E6C66] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-[14px] text-[11px] font-bold uppercase bg-[#0F5C4D] text-white hover:bg-[#1F6F63]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* LIGHTBOX / IMAGE VIEWER */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between select-none">
          <div className="h-[55px] px-5 border-b border-white/10 flex justify-between items-center text-white bg-black/40">
            <div className="text-xs font-sans text-white/70">
              {lightboxIndex + 1} of {filteredPhotos.length}
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
              <button
                onClick={(e) => handleToggleFavorite(filteredPhotos[lightboxIndex].id, e)}
                className="p-1.5 hover:text-red-500 hover:bg-white/10 rounded-md transition-colors"
                title="Favorite"
              >
                <Heart
                  size={16}
                  className={clientFavorites.includes(filteredPhotos[lightboxIndex].id) ? "fill-red-500 text-red-500" : ""}
                />
              </button>
              <a
                href={filteredPhotos[lightboxIndex].url}
                download={`om-photography-${filteredPhotos[lightboxIndex].id}.jpg`}
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
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].category}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
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
                {filteredPhotos[lightboxIndex].category}
              </span>
              | &copy; OM Photography
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
