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

  // Sidebar expanded and dropdown states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [foldersDropdownOpen, setFoldersDropdownOpen] = useState(true);
  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(true);
  const [recentDropdownOpen, setRecentDropdownOpen] = useState(false);

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
        setGalleries(gals);

        // Pre-select first category if available
        if (cats.length > 0) {
          const firstCat = cats[0];
          setActiveCategory(firstCat);
          const catGals = gals.filter((g) => g.categoryId === firstCat.id);
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
  }, []);

  // Get all unique photos across all galleries
  const getAllPhotos = () => {
    const uniqueUrls = new Set<string>();
    const list: Photo[] = [];
    if (Array.isArray(galleries)) {
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
    }
    return list;
  };

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
    const cover = newCatCover.trim() || "/placeholder.svg";

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
        {/* FIRST FOLD CONTAINER: HERO */}
        <div className="h-[280px] md:h-[380px] w-full flex flex-col justify-center relative bg-transparent shrink-0">
          {/* HERO SECTION */}
          <section className="relative w-full h-full overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1600&q=80"
                alt="Luxury wedding background"
                fill
                priority
                className="object-cover brightness-[0.55] object-[center_68%] md:object-center"
              />
            </div>

            <div className="relative z-20 text-center px-4 max-w-[800px] mx-auto">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="w-8 h-[1px] bg-[#DCEFE8]" />
                <span className="text-[#DCEFE8] text-[10px] md:text-[11px] font-sans font-semibold tracking-[3px] uppercase">
                  OUR PORTFOLIO
                </span>
                <span className="w-8 h-[1px] bg-[#DCEFE8]" />
              </div>
              <h1 className="font-serif text-[21px] xs:text-[25px] sm:text-[36px] md:text-[46px] text-white font-normal leading-tight tracking-tight mb-2 uppercase whitespace-nowrap">
                Stories That Last Forever
              </h1>
              <p className="!text-white/85 !text-xs sm:!text-[13px] md:!text-[14px] max-w-[500px] mx-auto font-sans leading-relaxed">
                A collection of beautiful moments, captured realistically with premium passion and custom visual artistry.
              </p>
            </div>
          </section>
        </div>

        {/* Backdrop for expanded sidebar on mobile */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[3px] md:hidden transition-all duration-300"
          />
        )}

        {/* Double-Column Layout: Sidebar + Curated Portfolio */}
        <div className="flex flex-row w-full max-w-[1440px] mx-auto min-h-screen relative mt-8 gap-0 md:gap-6 px-0 md:px-6">
          
          {/* SIDEBAR COLUMN */}
          <aside 
            className={`transition-all duration-300 border-r border-[#D9E6E0] shrink-0 bg-white
              ${sidebarOpen 
                ? "w-[260px] fixed left-0 top-0 bottom-0 h-screen z-50 shadow-2xl rounded-r-2xl" 
                : "w-[50px] relative border-r"
              }
              md:w-[250px] lg:w-[270px] md:relative md:left-auto md:top-auto md:bottom-auto md:h-auto md:shadow-none md:border-r md:z-auto md:rounded-none
            `}
          >
            {/* Sidebar Sticky Wrapper */}
            <div className="h-full md:sticky md:top-[95px] md:h-[calc(100vh-120px)] overflow-y-auto flex flex-col justify-between py-5 select-none scrollbar-none">
              
              {/* Top part: Toggles and contents */}
              <div className={`flex flex-col gap-5 ${sidebarOpen ? "px-5" : "px-2 md:px-5"}`}>
                
                {/* Mobile Expand / Collapse Toggle button */}
                <div className="md:hidden pb-2 border-b border-[#D9E6E0]/45 flex justify-center items-center">
                  {!sidebarOpen ? (
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="w-8 h-8 rounded-full bg-[#0F5C4D]/5 border border-[#0F5C4D]/15 flex items-center justify-center text-[#0F5C4D] hover:bg-[#0F5C4D]/10 transition-all mx-auto"
                      aria-label="Open filters"
                    >
                      <ChevronRight size={14} className="animate-pulse" />
                    </button>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F5C4D]">
                        Filters Menu
                      </span>
                      <button
                        onClick={() => setSidebarOpen(false)}
                        className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#5E6C66] hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                        aria-label="Close filters"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {/* 1. Search Box */}
                <div className="relative">
                  {/* Mobile Collapsed Search Button */}
                  <div className={`${sidebarOpen ? "hidden" : "block md:hidden"} text-center`}>
                    <button 
                      onClick={() => setSidebarOpen(true)}
                      className="w-8 h-8 rounded-full bg-[#0F5C4D]/5 border border-[#0F5C4D]/15 flex items-center justify-center text-[#0F5C4D] hover:bg-[#0F5C4D]/10 transition-colors mx-auto"
                      aria-label="Search"
                    >
                      <Search size={14} />
                    </button>
                  </div>
                  
                  {/* Active Search Input (visible on desktop always, and on mobile when open) */}
                  <div className={`${sidebarOpen ? "block" : "hidden md:block"} relative w-full`}>
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search captures..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-8.5 pl-9 pr-3 rounded-full border border-[#D9E6E0] text-xs focus:outline-none focus:border-[#0F5C4D] bg-white transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* 2. Dropdown 1: Portfolio Categories */}
                <div className="flex flex-col gap-1.5">
                  <button 
                    onClick={() => {
                      if (!sidebarOpen) {
                        setSidebarOpen(true);
                        setFoldersDropdownOpen(true);
                      } else {
                        setFoldersDropdownOpen(!foldersDropdownOpen);
                      }
                    }}
                    className="flex items-center justify-between w-full text-left py-1 text-[#18352F] hover:text-[#0F5C4D] transition-colors"
                  >
                    <div className={`flex items-center gap-2.5 w-full md:w-auto ${sidebarOpen ? "justify-start" : "justify-center md:justify-start"}`}>
                      <Folder size={16} className="text-[#0F5C4D]" />
                      <span className={`text-[11px] font-bold uppercase tracking-wider font-sans ${sidebarOpen ? "block" : "hidden md:block"}`}>
                        Categories
                      </span>
                      {isAdmin && sidebarOpen && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowAddFolderModal(true);
                          }}
                          className="ml-2 p-1 text-[#0F5C4D] hover:bg-[#0F5C4D]/10 rounded-full transition-colors flex items-center justify-center"
                          title="Create Category"
                        >
                          <Plus size={11} />
                        </button>
                      )}
                      {isAdmin && !sidebarOpen && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowAddFolderModal(true);
                          }}
                          className="hidden md:flex ml-2 p-1 text-[#0F5C4D] hover:bg-[#0F5C4D]/10 rounded-full transition-colors items-center justify-center"
                          title="Create Category"
                        >
                          <Plus size={11} />
                        </button>
                      )}
                    </div>
                    <ChevronRight 
                      size={12} 
                      className={`text-gray-400 transition-transform duration-200 ${sidebarOpen ? "block" : "hidden md:block"} ${foldersDropdownOpen ? "rotate-90" : ""}`} 
                    />
                  </button>
                  
                  {/* Dropdown List */}
                  {foldersDropdownOpen && (
                    <div className={`${sidebarOpen ? "flex" : "hidden md:flex"} flex-col pl-6 gap-1.5 border-l border-gray-100`}>
                      {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center justify-between group/cat py-0.5">
                          <button
                            onClick={() => {
                              handleSelectCategory(cat);
                              if (window.innerWidth < 768) setSidebarOpen(false);
                            }}
                            className={`text-left text-xs py-1 transition-colors flex-1 truncate ${activeCategory?.id === cat.id ? "text-[#0F5C4D] font-bold" : "text-[#5E6C66] hover:text-[#0F5C4D]"}`}
                          >
                            {cat.name}
                          </button>
                          {isAdmin && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCategory(cat.id, cat.name, e);
                              }}
                              className="opacity-0 group-hover/cat:opacity-100 p-1 text-[#C85D5D] hover:bg-red-50 rounded transition-all ml-1.5 flex items-center justify-center"
                              title="Delete Category"
                            >
                              <Trash2 size={11} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Dropdown 2: Quick Filters */}
                <div className="flex flex-col gap-1.5">
                  <button 
                    onClick={() => {
                      if (!sidebarOpen) {
                        setSidebarOpen(true);
                        setFiltersDropdownOpen(true);
                      } else {
                        setFiltersDropdownOpen(!filtersDropdownOpen);
                      }
                    }}
                    className="flex items-center justify-between w-full text-left py-1 text-[#18352F] hover:text-[#0F5C4D] transition-colors"
                  >
                    <div className={`flex items-center gap-2.5 w-full md:w-auto ${sidebarOpen ? "justify-start" : "justify-center md:justify-start"}`}>
                      <Heart size={16} className="text-[#0F5C4D]" />
                      <span className={`text-[11px] font-bold uppercase tracking-wider font-sans ${sidebarOpen ? "block" : "hidden md:block"}`}>
                        Quick Filters
                      </span>
                    </div>
                    <ChevronRight 
                      size={12} 
                      className={`text-gray-400 transition-transform duration-200 ${sidebarOpen ? "block" : "hidden md:block"} ${filtersDropdownOpen ? "rotate-90" : ""}`} 
                    />
                  </button>

                  {filtersDropdownOpen && (
                    <div className={`${sidebarOpen ? "flex" : "hidden md:flex"} flex-col pl-6 gap-1 border-l border-gray-100`}>
                      <button
                        onClick={() => {
                          setFavoritesOnly(false);
                          if (window.innerWidth < 768) setSidebarOpen(false);
                        }}
                        className={`text-left text-xs py-1.5 transition-colors ${!favoritesOnly ? "text-[#0F5C4D] font-bold" : "text-[#5E6C66] hover:text-[#0F5C4D]"}`}
                      >
                        All Shoots
                      </button>
                      <button
                        onClick={() => {
                          setFavoritesOnly(true);
                          if (window.innerWidth < 768) setSidebarOpen(false);
                        }}
                        className={`text-left text-xs py-1.5 transition-colors flex items-center justify-between ${favoritesOnly ? "text-red-500 font-bold" : "text-[#5E6C66] hover:text-red-500"}`}
                      >
                        <span>Favorites</span>
                        <span className="text-[9.5px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded-full font-bold">
                          {clientFavorites.length}
                        </span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Dropdown 3: Recent Shoots */}
                <div className="flex flex-col gap-1.5">
                  <button 
                    onClick={() => {
                      if (!sidebarOpen) {
                        setSidebarOpen(true);
                        setRecentDropdownOpen(true);
                      } else {
                        setRecentDropdownOpen(!recentDropdownOpen);
                      }
                    }}
                    className="flex items-center justify-between w-full text-left py-1 text-[#18352F] hover:text-[#0F5C4D] transition-colors"
                  >
                    <div className={`flex items-center gap-2.5 w-full md:w-auto ${sidebarOpen ? "justify-start" : "justify-center md:justify-start"}`}>
                      <Camera size={16} className="text-[#0F5C4D]" />
                      <span className={`text-[11px] font-bold uppercase tracking-wider font-sans ${sidebarOpen ? "block" : "hidden md:block"}`}>
                        Recent Shoots
                      </span>
                    </div>
                    <ChevronRight 
                      size={12} 
                      className={`text-gray-400 transition-transform duration-200 ${sidebarOpen ? "block" : "hidden md:block"} ${recentDropdownOpen ? "rotate-90" : ""}`} 
                    />
                  </button>

                  {recentDropdownOpen && (
                    <div className={`${sidebarOpen ? "flex" : "hidden md:flex"} flex-col pl-6 gap-1.5 border-l border-gray-100 max-h-[160px] overflow-y-auto`}>
                      {galleries.slice(0, 8).map((gal) => (
                        <button
                          key={gal.id}
                          onClick={() => {
                            setActiveGallery(gal);
                            if (window.innerWidth < 768) setSidebarOpen(false);
                          }}
                          className={`text-left text-[11px] py-1 truncate transition-colors ${activeGallery?.id === gal.id ? "text-[#0F5C4D] font-bold" : "text-[#5E6C66] hover:text-[#0F5C4D]"}`}
                        >
                          {gal.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Admin Control */}
              <div className={`pt-4 border-t border-[#D9E6E0]/45 flex flex-col gap-2 ${sidebarOpen ? "px-5" : "px-2 md:px-5"}`}>
                {!sidebarOpen ? (
                  <button 
                    onClick={() => handleToggleAdmin()}
                    className="w-8 h-8 rounded-full bg-[#0F5C4D]/5 border border-[#0F5C4D]/15 flex items-center justify-center text-[#0F5C4D] hover:bg-[#0F5C4D]/10 transition-colors mx-auto"
                    aria-label="Admin control"
                  >
                    {isAdmin ? <LogOut size={13} /> : <Lock size={13} />}
                  </button>
                ) : (
                  <button
                    onClick={handleToggleAdmin}
                    className="flex items-center justify-center gap-1.5 h-8.5 w-full rounded-full text-[9.5px] font-bold tracking-wider uppercase transition-all duration-300 border border-[#0F5C4D] text-[#0F5C4D] bg-transparent hover:bg-[#0F5C4D]/10 md:hidden"
                  >
                    {isAdmin ? <LogOut size={11} /> : <Lock size={11} />}
                    <span>{isAdmin ? "Logout" : "Admin Dashboard"}</span>
                  </button>
                )}
                <div className="hidden md:block">
                  <button
                    onClick={handleToggleAdmin}
                    className={`flex items-center justify-center gap-1.5 h-8.5 w-full rounded-full text-[9.5px] font-bold tracking-wider uppercase transition-all duration-300 border ${isAdmin
                        ? "bg-[#0F5C4D] border-transparent text-white shadow-sm"
                        : "border-[#0F5C4D] text-[#0F5C4D] bg-transparent hover:bg-[#0F5C4D]/10"
                      }`}
                  >
                    {isAdmin ? <LogOut size={11} /> : <Lock size={11} />}
                    <span>{isAdmin ? "Logout Admin" : "Admin Dashboard"}</span>
                  </button>
                </div>
              </div>

            </div>
          </aside>
          
          {/* MAIN CONTENT AREA */}
          <div className="flex-1 min-w-0 pl-4 md:pl-0 pr-4 md:pr-0">
             


            {/* CURATED PORTFOLIO GRID HEADER */}
            <div className="w-full mt-6 mb-6">
              <div className="pb-3 border-b border-[#D9E6E0]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-[1px] bg-[#0F5C4D] inline-block" />
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#0F5C4D] font-bold">
                    CURATED PORTFOLIO
                  </span>
                </div>
                <h2 className="font-serif text-[19px] sm:text-[23px] text-[#18352F] font-normal tracking-tight mt-1">
                  A Showcase of Beautiful Moments
                </h2>
              </div>
            </div>

            {/* PINTEREST MASONRY SECTION */}
            <div className="w-full mb-16 relative z-10">
              {filteredPhotos.length === 0 ? (
                <div className="py-16 text-center max-w-[400px] mx-auto bg-white border border-[#D9E6E0] rounded-2xl p-8 shadow-sm">
                  <ShieldAlert size={32} className="text-gray-400 mx-auto mb-3 animate-pulse" />
                  <h4 className="font-serif text-[18px] text-[#18352F] mb-1">No Photos Found</h4>
                  <p className="text-[#5E6C66] text-xs font-sans">Try searching a different tag or clear favorites filter.</p>
                </div>
              ) : (
                <>
                  <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-5">
                    {filteredPhotos.map((photo, idx) => (
                      <div
                        key={photo.id}
                        className="break-inside-avoid mb-4 md:mb-5 group relative rounded-xl overflow-hidden bg-white border border-[#D9E6E0] cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
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
                </>
              )}
            </div>

          </div>
        </div>

        {/* Booking Call to Action Banner */}
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 mt-12 mb-8">
          <div className="relative rounded-[24px] overflow-hidden bg-[#0F5C4D] text-white p-8 md:p-12 text-center shadow-xl border border-[#1F6F63]/30">
            {/* Subtle background gradient texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,239,232,0.12),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(11,61,52,0.4))] pointer-events-none" />
            
            <div className="relative z-10 max-w-[650px] mx-auto space-y-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#DCEFE8]">
                Reserve Your Date
              </span>
              <h2 className="font-serif text-[24px] md:text-[34px] font-normal leading-tight tracking-tight text-white uppercase">
                Let's Immortalize Your Moments
              </h2>
              <p className="text-[#DCEFE8]/90 text-xs md:text-sm font-sans leading-relaxed max-w-[500px] mx-auto font-normal">
                Specializing in candid emotions, dramatic lighting, and cinematic story-telling. Let us capture your legacy of emotions with micro-precision.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-white text-[#0F5C4D] font-bold text-xs uppercase tracking-wider hover:bg-[#DCEFE8] hover:scale-[1.02] transition-all duration-300 shadow-md"
                >
                  Book Your Session &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Terminating Separator Line */}
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 mt-16 mb-4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D9E6E0] to-transparent w-full" />
        </div>
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
