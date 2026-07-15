"use client";

import { use, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
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
} from "../../../lib/portfolioStore";
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

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.category;

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
    async function loadData() {
      try {
        const cats = await getCategories();
        const gals = await getGalleries();
        setCategories(cats);

        // Dynamic Route pre-selection based on parameter categoryId
        const currentCat = cats.find((c) => c.id === categoryId) || cats.find((c) => c.id === "weddings") || cats[0] || null;
        setActiveCategory(currentCat);

        if (currentCat) {
          const catGals = gals.filter((g) => g.categoryId === currentCat.id);
          setGalleries(catGals);
          if (catGals.length > 0) {
            setActiveGallery(catGals[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load portfolio data:", error);
      }
    }
    loadData();

    const storedAdmin = localStorage.getItem("om_admin_mode");
    if (storedAdmin === "true") {
      setIsAdmin(true);
    }
  }, [categoryId]);

  // Handle category selection change
  const handleSelectCategory = async (cat: Category) => {
    setActiveCategory(cat);
    try {
      const allGals = await getGalleries();
      const catGals = allGals.filter((g) => g.categoryId === cat.id);
      setGalleries(catGals);
      if (catGals.length > 0) {
        setActiveGallery(catGals[0]);
      } else {
        setActiveGallery(null);
      }
    } catch (e) {
      console.error(e);
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

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const id = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const cover = newCatCover.trim() || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";

    try {
      const added = await addCategory({
        id,
        name: newCatName,
        coverUrl: cover,
      });

      const updatedCats = await getCategories();
      setCategories(updatedCats);
      setActiveCategory(added);
      setNewCatName("");
      setNewCatCover("");
      setShowAddFolderModal(false);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleDeleteCategory = async (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete the "${name}" folder? This will delete all client shoots inside.`)) {
      try {
        await deleteCategory(id);
        const updatedCats = await getCategories();
        setCategories(updatedCats);
        if (updatedCats.length > 0) {
          await handleSelectCategory(updatedCats[0]);
        } else {
          setActiveCategory(null);
          setActiveGallery(null);
        }
      } catch (error) {
        console.error("Failed to delete category:", error);
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

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCategory || !newGalName.trim()) return;

    const id = newGalName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();
    try {
      const added = await addGallery({
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

      const allGals = await getGalleries();
      const updatedGals = allGals.filter((g) => g.categoryId === activeCategory.id);
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
    } catch (error) {
      console.error("Failed to create gallery:", error);
    }
  };

  const handleDeleteGallery = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the client gallery "${name}"?`)) {
      try {
        await deleteGallery(id);
        if (activeCategory) {
          const allGals = await getGalleries();
          const updatedGals = allGals.filter((g) => g.categoryId === activeCategory.id);
          setGalleries(updatedGals);
          if (updatedGals.length > 0) {
            setActiveGallery(updatedGals[0]);
          } else {
            setActiveGallery(null);
          }
        }
      } catch (error) {
        console.error("Failed to delete gallery:", error);
      }
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
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

    try {
      await updateGallery(updatedGallery);
      setActiveGallery(updatedGallery);

      if (activeCategory) {
        const allGals = await getGalleries();
        setGalleries(allGals.filter((g) => g.categoryId === activeCategory.id));
      }
      setNewPhotoUrl("");
    } catch (error) {
      console.error("Failed to add photo:", error);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!activeGallery) return;
    if (confirm("Delete this photo?")) {
      const updatedGallery = {
        ...activeGallery,
        photos: activeGallery.photos.filter((p) => p.id !== photoId),
      };

      try {
        await updateGallery(updatedGallery);
        setActiveGallery(updatedGallery);
        if (activeCategory) {
          const allGals = await getGalleries();
          setGalleries(allGals.filter((g) => g.categoryId === activeCategory.id));
        }
      } catch (error) {
        console.error("Failed to delete photo:", error);
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
    if (!activeGallery) return [];
    let list = [...activeGallery.photos];

    if (activeFilter !== "All Photos") {
      list = list.filter((p) => p.category === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.category.toLowerCase().includes(q));
    }

    if (favoritesOnly) {
      list = list.filter((p) => clientFavorites.includes(p.id));
    }

    if (sortBy === "Latest") {
      list = list.reverse();
    } else if (sortBy === "Popular") {
      list = list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
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
        return <Award size={size} className="text-[#D4AF37]" />;
      case "pre-weddings":
        return <Heart size={size} className="text-[#D4AF37]" />;
      case "birthdays":
        return <Users size={size} className="text-[#D4AF37]" />;
      case "events":
        return <Flame size={size} className="text-[#D4AF37]" />;
      default:
        return <Folder size={size} className="text-[#D4AF37]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#222222] font-sans flex flex-col justify-between scroll-smooth">
      <Header />

      {/* Main Container - Aligned exactly below sticky header */}
      <main className="flex-1 pt-[60px] md:pt-[70px] pb-16 w-full">
        {/* BACK TO PORTFOLIO BUTTON */}
        <div className="px-4 md:px-6 lg:px-8 xl:px-10 w-full pt-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#666666] hover:text-[#D4AF37] font-bold text-xs uppercase tracking-wider transition-colors group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-300 text-[#D4AF37]" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* CATEGORY DETAILS (SIDEBAR + RIGHT MASONRY GRID) */}
        <section className="px-4 md:px-6 lg:px-8 xl:px-10 w-full mt-6">
          <div className="bg-white border border-[#E7D8B5]/50 rounded-[20px] md:rounded-[24px] overflow-hidden shadow-sm flex flex-col lg:flex-row min-h-[600px] relative z-10">
            
            {/* LEFT SIDEBAR OF CLIENT GALLERIES */}
            <aside className="w-full lg:w-[280px] bg-[#FEFCF8]/60 border-b lg:border-b-0 lg:border-r border-[#E7D8B5]/50 flex flex-col shrink-0">
              <div className="p-5 border-b border-[#E7D8B5]/40 bg-[#FEFCF8]/95 flex justify-between items-center">
                <div>
                  <span className="text-[8.5px] uppercase tracking-[0.25em] font-bold text-[#D4AF37] block">
                    {activeCategory?.name || "SHOOTS"}
                  </span>
                  <h3 className="font-serif text-[16px] text-[#222222] font-semibold uppercase tracking-tight">
                    Client Galleries
                  </h3>
                </div>

                {isAdmin && activeCategory && (
                  <button
                    onClick={() => setShowAddGalleryModal(true)}
                    className="flex items-center justify-center w-8 h-8 bg-[#222222] text-white hover:bg-black rounded-lg transition-colors shadow-sm"
                    title="Add new client gallery"
                  >
                    <Plus size={14} />
                  </button>
                )}
              </div>

              {/* Galleries List */}
              <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1 max-h-[260px] lg:max-h-none">
                {galleries.length === 0 ? (
                  <div className="py-10 text-center">
                    <CameraOff size={28} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-[#666666] text-[11px] font-sans">No shoots found in this category.</p>
                  </div>
                ) : (
                  galleries.map((gal) => (
                    <div key={gal.id} className="relative group">
                      <button
                        onClick={() => {
                          setActiveGallery(gal);
                          setSearchQuery("");
                          setActiveFilter("All Photos");
                          setFavoritesOnly(false);
                          setVisibleCount(8);
                        }}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-300 ${
                          activeGallery?.id === gal.id
                            ? "bg-[#F5EDD8] text-[#222222] border-l-4 border-[#D4AF37]"
                            : "hover:bg-[#F8F5F0] text-[#666666] hover:text-[#222222]"
                        }`}
                      >
                        <Folder size={14} className={activeGallery?.id === gal.id ? "text-[#D4AF37]" : "text-gray-400"} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold truncate leading-snug">{gal.name}</p>
                          <span className="text-[9.5px] text-gray-400 block mt-0.5">
                            {gal.photos?.length || 0} Photos
                          </span>
                        </div>
                        {!gal.isPublic && <Lock size={10} className="text-gray-400 shrink-0" />}
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteGallery(gal.id, gal.name)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md transition-all z-10"
                          title="Delete shoot"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Sidebar Access Request Button */}
              <div className="p-4 border-t border-[#E7D8B5]/40 bg-[#FEFCF8]/90">
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="w-full h-[40px] rounded-lg border border-dashed border-[#D4AF37] hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/5 font-bold text-[10.5px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <Plus size={12} />
                  <span>Request Full Gallery</span>
                </button>
              </div>
            </aside>

            {/* RIGHT GALLERY AREA */}
            <div className="flex-1 bg-[#F8F5F0] flex flex-col">
              {activeGallery ? (
                <>
                  {/* Private Gallery Lock Screen */}
                  {!galleryUnlocked ? (
                    <div className="flex-1 flex items-center justify-center p-6 min-h-[450px]">
                      <div className="bg-white border border-[#E7D8B5]/60 p-8 rounded-2xl max-w-[380px] w-full text-center shadow-lg">
                        <div className="w-12 h-12 rounded-full bg-[#F5EDD8] border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4">
                          <Lock size={20} className="text-[#D4AF37]" />
                        </div>
                        <h3 className="font-serif text-[20px] text-[#222222] font-semibold mb-2">Protected Shoot</h3>
                        <p className="text-[#666666] text-[12px] leading-relaxed mb-5 font-sans">
                          Enter passcode to view private client photos.
                        </p>
                        <form onSubmit={handleUnlockGallery} className="space-y-3">
                          <input
                            type="password"
                            required
                            placeholder="Enter Passcode"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className={`w-full h-10 px-4 border rounded-[8px] text-center focus:outline-none focus:border-[#D4AF37] text-[14px] font-mono tracking-widest ${
                              passwordError ? "border-red-500 bg-red-50" : "border-[#E7D8B5]"
                            }`}
                          />
                          {passwordError && (
                            <p className="text-red-500 text-[10px] font-sans">Incorrect passcode.</p>
                          )}
                          <button
                            type="submit"
                            className="w-full h-10 bg-[#D4AF37] hover:bg-[#C9A227] text-[#222222] font-bold text-xs uppercase tracking-wider rounded-[8px] transition-colors"
                          >
                            Unlock
                          </button>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* CLIENT HERO BANNER */}
                      <section className="relative w-full h-[220px] md:h-[280px] overflow-hidden flex items-end">
                        <div className="absolute inset-0 z-0">
                          <Image
                            src={getBannerUrl()}
                            alt={activeGallery.name}
                            fill
                            priority
                            className="object-cover brightness-[0.4]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5F0] via-black/10 to-transparent z-10" />
                        </div>

                        <div className="relative z-20 w-full px-6 pb-6 text-left">
                          <span className="text-white/60 text-[9px] uppercase tracking-widest font-sans font-bold block mb-1">
                            {activeCategory?.name} Collection
                          </span>
                          <h2 className="font-serif text-[22px] sm:text-[30px] text-white font-normal uppercase tracking-tight mb-3">
                            {activeGallery.name}
                          </h2>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/80 text-[10.5px] font-sans pt-3 border-t border-white/10 w-full">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-[#D4AF37]" />
                              {new Date(activeGallery.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={12} className="text-[#D4AF37]" />
                              {activeGallery.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <ImageIcon size={12} className="text-[#D4AF37]" />
                              {activeGallery.photos?.length || 0} Photos
                            </span>
                          </div>
                        </div>
                      </section>

                      {/* TOOLBAR */}
                      <div className="px-5 py-4 border-b border-[#E7D8B5]/30 bg-white flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                          <div className="relative flex-1 sm:flex-initial">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search photos..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full sm:w-[180px] h-8 pl-8 pr-3 rounded-full border border-gray-200 text-xs focus:outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                          <button
                            onClick={() => setFavoritesOnly(!favoritesOnly)}
                            className={`flex items-center gap-1 h-8 px-3 rounded-full text-[10.5px] font-bold transition-all ${
                              favoritesOnly
                                ? "bg-red-500 text-white shadow-sm"
                                : "bg-gray-100 hover:bg-gray-200 text-[#666666]"
                            }`}
                          >
                            <Heart size={11} className={favoritesOnly ? "fill-white" : ""} />
                            <span>Favorites ({clientFavorites.length})</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="h-8 px-2 rounded-lg border border-gray-200 text-[10.5px] font-medium bg-transparent cursor-pointer outline-none"
                          >
                            <option value="Latest">Latest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="Popular">Popular</option>
                          </select>
                          <button
                            onClick={() => setShowDownloadModal(true)}
                            className="h-8 px-3 rounded-lg border border-[#E7D8B5] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors text-[10.5px] font-bold flex items-center gap-1"
                          >
                            <Download size={12} />
                            <span>Download</span>
                          </button>
                          <button
                            onClick={() => setShowShareModal(true)}
                            className="h-8 px-3 rounded-lg bg-[#D4AF37] text-[#222222] hover:bg-[#C9A227] transition-colors text-[10.5px] font-bold flex items-center gap-1 shadow-sm"
                          >
                            <Share2 size={12} />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>

                      {/* FILTERS */}
                      <div className="px-5 py-2.5 bg-[#FEFCF8]/60 border-b border-[#E7D8B5]/20 overflow-x-auto flex items-center gap-1 scrollbar-none">
                        {[
                          "All Photos",
                          "Ceremony",
                          "Couple Portraits",
                          "Bride Portraits",
                          "Reception",
                          "Family",
                          "Candid Moments",
                          "Details",
                        ].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => {
                              setActiveFilter(tab);
                              setVisibleCount(8);
                            }}
                            className={`h-7 px-3.5 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-all ${
                              activeFilter === tab
                                ? "bg-[#222222] text-white"
                                : "hover:bg-gray-100 text-[#666666] hover:text-[#222222]"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* ADMIN PHOTO ADD STRIP */}
                      {isAdmin && (
                        <div className="mx-5 mt-4 p-3.5 border border-[#D4AF37]/45 bg-[#FEFCF8] rounded-xl flex flex-col sm:flex-row gap-3 items-center">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#222222] flex items-center gap-1">
                            <ImageIcon size={14} className="text-[#D4AF37]" /> Upload Photo
                          </span>
                          <form onSubmit={handleAddPhoto} className="flex-1 flex flex-col sm:flex-row gap-2 w-full">
                            <input
                              type="url"
                              required
                              placeholder="Paste Unsplash URL..."
                              value={newPhotoUrl}
                              onChange={(e) => setNewPhotoUrl(e.target.value)}
                              className="flex-1 h-8 px-3 border border-gray-200 rounded-lg text-xs focus:outline-none"
                            />
                            <select
                              value={newPhotoCat}
                              onChange={(e) => setNewPhotoCat(e.target.value)}
                              className="h-8 px-2 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none"
                            >
                              <option value="Couple Portraits">Couple Portraits</option>
                              <option value="Bride Portraits">Bride Portraits</option>
                              <option value="Ceremony">Ceremony</option>
                              <option value="Reception">Reception</option>
                              <option value="Candid Moments">Candid Moments</option>
                              <option value="Details">Details</option>
                              <option value="Family">Family</option>
                            </select>
                            <button
                              type="submit"
                              className="h-8 px-4 rounded-lg bg-[#222222] text-white hover:bg-black transition-colors text-xs font-semibold"
                            >
                              Add
                            </button>
                          </form>
                        </div>
                      )}

                      {/* PINTEREST MASONRY SECTION */}
                      <div className="p-5 flex-1">
                        {filteredPhotos.length === 0 ? (
                          <div className="py-16 text-center max-w-[400px] mx-auto bg-white border rounded-xl p-6">
                            <ShieldAlert size={32} className="text-gray-400 mx-auto mb-3" />
                            <h4 className="font-serif text-[16px] text-[#222222] mb-1">No Photos Found</h4>
                            <p className="text-[#666666] text-xs">Try searching a different category or heart tag.</p>
                          </div>
                        ) : (
                          <>
                            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
                              {visiblePhotos.map((photo, idx) => (
                                <div
                                  key={photo.id}
                                  className="break-inside-avoid mb-4 group relative rounded-xl overflow-hidden bg-white border border-[#E7D8B5]/20 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
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
                                      <span className="text-[8.5px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                                        {photo.category}
                                      </span>
                                      <p className="text-[11px] font-sans text-white/95 mt-0.5">View Frame &rsaquo;</p>
                                    </div>
                                  </div>

                                  {isAdmin && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeletePhoto(photo.id);
                                      }}
                                      className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/60 text-white hover:text-red-450 hover:bg-black flex items-center justify-center transition-colors shadow-md z-20"
                                    >
                                      <Trash2 size={11} />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>

                            {visibleCount < filteredPhotos.length && (
                              <div className="text-center mt-8">
                                <button
                                  onClick={() => setVisibleCount((prev) => prev + 8)}
                                  className="h-10 px-6 rounded-lg border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#222222] font-semibold text-[10.5px] uppercase tracking-[1px] transition-all duration-300 shadow-sm"
                                >
                                  Load More Photos
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8 text-center min-h-[400px]">
                  <div>
                    <Folder size={40} className="text-gray-300 mx-auto mb-3" />
                    <h3 className="font-serif text-[18px] text-[#222222] mb-1">No Shoots in Folder</h3>
                    <p className="text-[#666666] text-xs font-sans">
                      Add a client gallery inside this category folder to populate photos.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* CREATE PORTFOLIO FOLDER MODAL */}
      {showAddFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#E7D8B5] rounded-[20px] max-w-[420px] w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-[#E7D8B5]/40 flex justify-between items-center bg-[#FEFCF8]">
              <h3 className="font-serif text-[16px] font-bold text-[#222222]">Create Category Folder</h3>
              <button onClick={() => setShowAddFolderModal(false)} className="text-[#666666] hover:text-black font-semibold text-lg">
                &times;
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="p-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#666666] mb-1">
                  Folder Category Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Birthdays, Corporate, Pre-Weddings"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full h-10 px-3 border border-[#E7D8B5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[13px]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#666666] mb-1 flex items-center justify-between">
                  <span>Cover Image URL</span>
                  <span className="text-[9px] text-[#D4AF37] lowercase">Optional</span>
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newCatCover}
                  onChange={(e) => setNewCatCover(e.target.value)}
                  className="w-full h-10 px-3 border border-[#E7D8B5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[13px]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddFolderModal(false)}
                  className="h-9 px-4 rounded-lg text-[11px] font-bold uppercase text-[#666666] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-lg text-[11px] font-bold uppercase bg-[#D4AF37] text-[#222222] hover:bg-[#C9A227]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE CLIENT SHOOT MODAL */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#E7D8B5] rounded-[20px] max-w-[450px] w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-[#E7D8B5]/40 flex justify-between items-center bg-[#FEFCF8]">
              <h3 className="font-serif text-[16px] font-bold text-[#222222]">Create Client Shoot</h3>
              <button onClick={() => setShowAddGalleryModal(false)} className="text-[#666666] hover:text-black font-semibold text-lg">
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateGallery} className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                  Client Shoot Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Vikram & Riya Wedding"
                  value={newGalName}
                  onChange={(e) => setNewGalName(e.target.value)}
                  className="w-full h-10 px-3 border border-[#E7D8B5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                  Description
                </label>
                <textarea
                  placeholder="e.g. Romantic twilight session..."
                  value={newGalDesc}
                  onChange={(e) => setNewGalDesc(e.target.value)}
                  className="w-full h-16 p-2.5 border border-[#E7D8B5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[13px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    Shoot Date
                  </label>
                  <input
                    type="date"
                    value={newGalDate}
                    onChange={(e) => setNewGalDate(e.target.value)}
                    className="w-full h-10 px-3 border border-[#E7D8B5] rounded-lg focus:outline-none text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Jaipur, India"
                    value={newGalLoc}
                    onChange={(e) => setNewGalLoc(e.target.value)}
                    className="w-full h-10 px-3 border border-[#E7D8B5] rounded-lg focus:outline-none text-[13px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                  Cover Photo URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newGalCover}
                  onChange={(e) => setNewGalCover(e.target.value)}
                  className="w-full h-10 px-3 border border-[#E7D8B5] rounded-lg focus:outline-none text-[13px]"
                />
              </div>

              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#666666]">Public Access</span>
                  <input
                    type="checkbox"
                    checked={newGalPublic}
                    onChange={(e) => setNewGalPublic(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                  />
                </div>
                {!newGalPublic && (
                  <div className="mt-2.5">
                    <label className="block text-[9.5px] font-bold uppercase text-[#666666] mb-0.5">
                      Passcode Protection
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Password"
                      value={newGalPass}
                      onChange={(e) => setNewGalPass(e.target.value)}
                      className="w-full h-8 px-2.5 border border-[#E7D8B5] bg-white rounded-md focus:outline-none text-xs font-mono"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddGalleryModal(false)}
                  className="h-9 px-3.5 rounded-lg text-[11px] font-bold uppercase text-[#666666] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-lg text-[11px] font-bold uppercase bg-[#D4AF37] text-[#222222] hover:bg-[#C9A227]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REQUEST FULL GALLERY ACCESS MODAL */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#E7D8B5] rounded-[20px] max-w-[420px] w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-[#E7D8B5]/40 flex justify-between items-center bg-[#FEFCF8]">
              <h3 className="font-serif text-[16px] font-bold text-[#222222]">Request Full Gallery Access</h3>
              <button onClick={() => setShowRequestModal(false)} className="text-[#666666] hover:text-black font-semibold text-lg">
                &times;
              </button>
            </div>
            {requestSuccess ? (
              <div className="p-7 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <Check size={20} />
                </div>
                <h4 className="font-serif text-[16px] text-[#222222]">Request Sent</h4>
                <p className="text-[#666666] text-xs leading-relaxed max-w-[280px] mx-auto font-sans">
                  The studio team has been notified. Access credentials will be sent shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="p-5 space-y-3.5">
                <p className="text-[#666666] text-[11.5px] leading-relaxed font-sans">
                  Request access credentials to download original files.
                </p>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reqName}
                    onChange={(e) => setReqName(e.target.value)}
                    placeholder="Priyesh Sharma"
                    className="w-full h-9 px-3 border border-[#E7D8B5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={reqEmail}
                    onChange={(e) => setReqEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full h-9 px-3 border border-[#E7D8B5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-[#666666] mb-1">
                    Message
                  </label>
                  <textarea
                    rows={2}
                    value={reqMsg}
                    onChange={(e) => setReqMsg(e.target.value)}
                    placeholder="e.g. Brother of the bride, requesting download code."
                    className="w-full p-2.5 border border-[#E7D8B5] rounded-lg focus:outline-none focus:border-[#D4AF37] text-[13px]"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="h-9 px-3.5 rounded-lg text-[11px] font-bold uppercase text-[#666666] hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-9 px-5 rounded-lg text-[11px] font-bold uppercase bg-[#D4AF37] text-[#222222] hover:bg-[#C9A227]"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DOWNLOAD RESOLUTION SELECT MODAL */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#E7D8B5] rounded-[20px] max-w-[380px] w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-[#E7D8B5]/40 flex justify-between items-center bg-[#FEFCF8]">
              <h3 className="font-serif text-[16px] font-bold text-[#222222]">Download Shoot Gallery</h3>
              <button onClick={() => setShowDownloadModal(false)} className="text-[#666666] hover:text-black font-semibold text-lg">
                &times;
              </button>
            </div>
            {downloadSuccess ? (
              <div className="p-7 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <Check size={20} />
                </div>
                <h4 className="font-serif text-[16px] text-[#222222]">Zipping Archive</h4>
                <p className="text-[#666666] text-xs leading-relaxed max-w-[280px] mx-auto font-sans">
                  The download has been prepared. Your zip archive contains all original photos.
                </p>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                <p className="text-[#666666] text-[11.5px] font-sans">Select resolution format:</p>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => {
                      setDownloadSuccess(true);
                      setTimeout(() => {
                        setShowDownloadModal(false);
                        setDownloadSuccess(false);
                      }, 2500);
                    }}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-[#D4AF37] hover:bg-[#F5EDD8]/10 text-left transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F5EDD8] flex items-center justify-center shrink-0 text-[#D4AF37]">
                      <Download size={14} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#222222]">High Resolution</h4>
                      <p className="text-[10px] text-[#666666] font-sans mt-0.5">Best for professional printing.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setDownloadSuccess(true);
                      setTimeout(() => {
                        setShowDownloadModal(false);
                        setDownloadSuccess(false);
                      }, 2500);
                    }}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-200 hover:border-[#D4AF37] hover:bg-[#F5EDD8]/10 text-left transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F5EDD8] flex items-center justify-center shrink-0 text-[#D4AF37]">
                      <Eye size={14} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#222222]">Web Optimized</h4>
                      <p className="text-[10px] text-[#666666] font-sans mt-0.5">Best for social sharing.</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#E7D8B5] rounded-[20px] max-w-[380px] w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-[#E7D8B5]/40 flex justify-between items-center bg-[#FEFCF8]">
              <h3 className="font-serif text-[16px] font-bold text-[#222222]">Share Shoot Gallery</h3>
              <button onClick={() => setShowShareModal(false)} className="text-[#666666] hover:text-black font-semibold text-lg">
                &times;
              </button>
            </div>
            <div className="p-5 space-y-5">
              <p className="text-[#666666] text-[11.5px] leading-relaxed font-sans">
                Share link:
              </p>
              <div className="grid grid-cols-4 gap-3 text-center">
                <a
                  href={`https://api.whatsapp.com/send?text=Check%20out%20our%20wedding%20gallery%20at%20${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 text-gray-650 hover:text-green-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                    <MessageSquare size={16} />
                  </div>
                  <span className="text-[9.5px] font-semibold font-sans">WhatsApp</span>
                </a>
                <a
                  href={`mailto:?subject=Wedding%20Gallery&body=Check%20out%20our%20wedding%20gallery%20at%20${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  className="flex flex-col items-center gap-1.5 text-gray-650 hover:text-blue-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <span className="text-[9.5px] font-semibold font-sans">Email</span>
                </a>
                <div className="flex flex-col items-center gap-1.5 text-gray-650 hover:text-purple-500 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                    <QrCode size={16} />
                  </div>
                  <span className="text-[9.5px] font-semibold font-sans">QR Code</span>
                </div>
                <div
                  onClick={handleCopyLink}
                  className="flex flex-col items-center gap-1.5 text-gray-650 hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                    {copiedLink ? <Check size={16} className="text-[#D4AF37]" /> : <Copy size={16} />}
                  </div>
                  <span className="text-[9.5px] font-semibold font-sans">{copiedLink ? "Copied" : "Copy Link"}</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== "undefined" ? window.location.href : ""}
                  className="w-full h-9 px-3 pr-16 border border-[#E7D8B5] bg-gray-50 rounded-lg text-xs font-sans text-gray-500 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="absolute right-1 top-1 h-7 px-3 bg-[#D4AF37] hover:bg-[#C9A227] text-white text-[9.5px] font-bold uppercase rounded-md transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
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
                <ZoomIn size={16} className={lightboxZoom ? "text-[#D4AF37]" : ""} />
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
              className="absolute left-4 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <div
              className={`relative max-w-full max-h-[80vh] flex items-center justify-center transition-all duration-300 ${
                lightboxZoom ? "scale-125 cursor-zoom-out" : "scale-100"
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
              className="absolute right-4 w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all z-10"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="h-[50px] px-5 border-t border-white/10 flex items-center justify-center bg-black/40 text-white/60 text-[11px] font-sans">
            <div>
              <span className="text-[#D4AF37] font-semibold uppercase mr-1.5">
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
