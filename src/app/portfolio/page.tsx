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
  Tag,
} from "lucide-react";

const compressImage = async (file: File): Promise<File> => {
  const MAX_SIZE = 500 * 1024; // 0.5 MB
  if (file.size <= MAX_SIZE) return file;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        const maxDim = 2000;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.85;
        const compressNext = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }
              if (blob.size <= MAX_SIZE || quality <= 0.15) {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                quality -= 0.1;
                compressNext();
              }
            },
            "image/jpeg",
            quality
          );
        };
        compressNext();
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
};

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
  const [sectionsDropdownOpen, setSectionsDropdownOpen] = useState(true);
  const [foldersDropdownOpen, setFoldersDropdownOpen] = useState(false);
  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);
  const [recentDropdownOpen, setRecentDropdownOpen] = useState(false);

  // Photo section (default = Wedding)
  const [selectedSection, setSelectedSection] = useState("Wedding");
  const [allGalleries, setAllGalleries] = useState<ClientGallery[]>([]);

  // Admin States
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoginError, setAdminLoginError] = useState("");
  const [adminLoginLoading, setAdminLoginLoading] = useState(false);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [showMovePhotoModal, setShowMovePhotoModal] = useState(false);
  const [photoToMove, setPhotoToMove] = useState<(Photo & { gallery?: ClientGallery }) | null>(null);
  const [moveTargetSections, setMoveTargetSections] = useState<string[]>([]);
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);
  // Upload state
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [addPhotoGalleryId, setAddPhotoGalleryId] = useState("");
  const [newPhotoCats, setNewPhotoCats] = useState<string[]>([]);
  const [compressionStatus, setCompressionStatus] = useState("");

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
        setAllGalleries(gals);
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
    const list: (Photo & { gallery?: ClientGallery })[] = [];

    // Use allGalleries to search globally, falling back to galleries
    const sourceGalleries = allGalleries && allGalleries.length > 0 ? allGalleries : galleries;

    if (sourceGalleries) {
      sourceGalleries.forEach((g) => {
        if (g.photos) {
          g.photos.forEach((p) => {
            if (!uniqueUrls.has(p.url)) {
              uniqueUrls.add(p.url);
              list.push({ ...p, gallery: g });
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
    setSelectedSection("All");
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
    if (isAdmin) {
      // Logout
      setIsAdmin(false);
      localStorage.removeItem("om_admin_mode");
    } else {
      // Open login modal
      setAdminPassword("");
      setAdminLoginError("");
      setShowAdminLoginModal(true);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginLoading(true);
    setAdminLoginError("");
    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
        localStorage.setItem("om_admin_mode", "true");
        setShowAdminLoginModal(false);
        setAdminPassword("");
      } else {
        setAdminLoginError(data.error || "Incorrect password.");
      }
    } catch {
      setAdminLoginError("Network error. Please try again.");
    } finally {
      setAdminLoginLoading(false);
    }
  };

  const handleMovePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoToMove) return;
    try {
      const allGals = await getGalleries();
      // Find which gallery currently owns this photo
      const sourceGallery = allGals.find(g => g.photos?.some(p => p.id === photoToMove.id));
      if (!sourceGallery) return;

      // Update the photo's category (section tags) in-place within the same gallery
      const sectionsString = moveTargetSections.join(", ");
      const updatedPhotos = sourceGallery.photos.map(p =>
        p.id === photoToMove.id ? { ...p, category: sectionsString } : p
      );
      await updateGallery({ ...sourceGallery, photos: updatedPhotos });

      // Refresh
      const refreshed = await getGalleries();
      setAllGalleries(refreshed);
      if (activeCategory) setGalleries(refreshed.filter(g => g.categoryId === activeCategory.id));

      setShowMovePhotoModal(false);
      setPhotoToMove(null);
      setMoveTargetSections([]);
    } catch (err) {
      console.error("Failed to change photo section:", err);
    }
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

  const handleDeletePhoto = async () => {
    if (!photoToDelete) return;
    try {
      // Find which gallery owns this photo — works even when activeGallery is null
      const allGals = await getGalleries();
      const ownerGallery = allGals.find(g => g.photos?.some(p => p.id === photoToDelete.id));
      if (!ownerGallery) {
        console.error("Gallery not found for photo", photoToDelete.id);
        setPhotoToDelete(null);
        return;
      }

      const updatedGallery = {
        ...ownerGallery,
        photos: ownerGallery.photos.filter((p) => p.id !== photoToDelete.id),
      };

      await updateGallery(updatedGallery);

      // Refresh all state
      const refreshed = await getGalleries();
      setAllGalleries(refreshed);
      if (activeCategory) setGalleries(refreshed.filter((g) => g.categoryId === activeCategory.id));
      // If the deleted photo was in the currently active gallery, update it too
      if (activeGallery && activeGallery.id === ownerGallery.id) {
        setActiveGallery(updatedGallery);
      }

      setPhotoToDelete(null);
    } catch (error) {
      console.error("Failed to delete photo:", error);
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

    // 1. Sidebar Image Type Section Filter
    if (selectedSection !== "All") {
      list = list.filter((p) => {
        const catLower = (p.category || "").toLowerCase();
        const galNameLower = (p.gallery?.name || "").toLowerCase();
        const galIdLower = (p.gallery?.categoryId || "").toLowerCase();
        const urlLower = (p.url || "").toLowerCase();
        const idLower = (p.id || "").toLowerCase();

        if (selectedSection === "Haldi") {
          return catLower.includes("haldi") || galNameLower.includes("haldi") || urlLower.includes("haldi") || idLower.includes("haldi");
        }
        if (selectedSection === "Collage") {
          return catLower.includes("collage") || urlLower.includes("collage") || idLower.includes("collage");
        }
        if (selectedSection === "Destination") {
          return galIdLower.includes("destination") || galNameLower.includes("destination") || catLower.includes("destination");
        }
        if (selectedSection === "Portraits") {
          return catLower.includes("portrait") || galIdLower.includes("portrait") || catLower.includes("fashion") || catLower.includes("bride") || catLower.includes("groom");
        }
        if (selectedSection === "Ring Ceremony") {
          return catLower.includes("ring") || galNameLower.includes("ring") || urlLower.includes("ring") || idLower.includes("ring");
        }
        if (selectedSection === "Wedding") {
          const isHaldi = catLower.includes("haldi") || galNameLower.includes("haldi") || urlLower.includes("haldi") || idLower.includes("haldi");
          const isCollage = catLower.includes("collage") || urlLower.includes("collage") || idLower.includes("collage");
          const isDestination = galIdLower.includes("destination") || galNameLower.includes("destination") || catLower.includes("destination");
          const isPortrait = catLower.includes("portrait") || galIdLower.includes("portrait") || catLower.includes("fashion") || catLower.includes("bride") || catLower.includes("groom");
          const isRing = catLower.includes("ring") || galNameLower.includes("ring") || urlLower.includes("ring") || idLower.includes("ring");

          return !isHaldi && !isCollage && !isDestination && !isPortrait && !isRing;
        }
        return true;
      });
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        (p.category || "").toLowerCase().includes(q) ||
        (p.gallery?.name || "").toLowerCase().includes(q)
      );
    }

    // 3. Favorites only filter
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

        {/* Double-Column Layout: Sidebar + Curated Portfolio */}
        <div className="flex flex-row w-full relative mt-8 min-h-[80vh]">

          {/* Mobile backdrop — fixed below header, covers visible viewport only */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed left-0 right-0 top-[60px] bottom-0 z-40 bg-black/40 backdrop-blur-[3px] md:hidden transition-all duration-300"
            />
          )}

          {/* SIDEBAR — mobile: sticky thin strip; expanded: fixed panel anchored below header */}
          <aside
            className={`transition-all duration-300 border-r border-[#D9E6E0] shrink-0 bg-white
              ${sidebarOpen
                ? "fixed left-0 top-[60px] w-[260px] h-[calc(100vh-60px)] z-50 shadow-2xl rounded-r-2xl overflow-y-auto"
                : "sticky top-[70px] self-start h-[calc(100vh-70px)] w-[50px] z-10 border-r"
              }
              md:sticky md:top-[70px] md:self-start md:h-[calc(100vh-70px)] md:w-[250px] lg:md:w-[270px] md:border-r md:z-10 md:shadow-sm md:rounded-none md:left-auto
            `}
          >
            {/* Sidebar Content Wrapper */}
            <div className="h-full overflow-y-auto flex flex-col justify-between py-5 select-none scrollbar-none">

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

                {/* Photo Sections Filter */}
                <div className="flex flex-col gap-2.5">
                  <div className={`flex items-center gap-2.5 w-full md:w-auto ${sidebarOpen ? "justify-start" : "justify-center md:justify-start"} pb-2 border-b border-[#D9E6E0]/45`}>
                    <ImageIcon size={15} className="text-[#0F5C4D]" />
                    <span className={`text-[11px] font-bold uppercase tracking-wider font-sans ${sidebarOpen ? "block" : "hidden md:block"} text-[#18352F]`}>
                      Filter By Section
                    </span>
                  </div>

                  <div className={`${sidebarOpen ? "flex" : "hidden md:flex"} flex-col pl-2 gap-1.5`}>
                    {["All", "Wedding", "Haldi", "Destination", "Portraits", "Collage", "Ring Ceremony"].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => {
                          setSelectedSection(sec);
                          if (window.innerWidth < 768) setSidebarOpen(false);
                        }}
                        className={`text-left text-xs py-1.5 px-3 rounded-lg transition-all ${selectedSection === sec
                          ? "bg-[#0F5C4D] text-white font-semibold shadow-sm"
                          : "text-[#5E6C66] hover:bg-gray-50 hover:text-[#0F5C4D]"
                          }`}
                      >
                        {sec} {sec === "All" ? "Captures" : ""}
                      </button>
                    ))}
                  </div>
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
                  <div className="flex flex-col gap-1.5 w-full">
                    <button
                      onClick={handleToggleAdmin}
                      className="flex items-center justify-center gap-1.5 h-8.5 w-full rounded-full text-[9.5px] font-bold tracking-wider uppercase transition-all duration-300 border border-[#0F5C4D] text-[#0F5C4D] bg-transparent hover:bg-[#0F5C4D]/10 md:hidden"
                    >
                      {isAdmin ? <LogOut size={11} /> : <Lock size={11} />}
                      <span>{isAdmin ? "Logout" : "Admin Dashboard"}</span>
                    </button>
                    {isAdmin && (
                      <Link
                        href="/portfolio/classify"
                        className="flex items-center justify-center gap-1.5 h-8.5 w-full rounded-full text-[9.5px] font-bold tracking-wider uppercase bg-[#1F6F63] border border-transparent text-white hover:bg-[#0F5C4D] transition-colors md:hidden"
                      >
                        <Tag size={11} />
                        <span>Classify Tool</span>
                      </Link>
                    )}
                  </div>
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
                {isAdmin && (
                  <div className="hidden md:flex flex-col gap-1.5">
                    <Link
                      href="/portfolio/classify"
                      className="flex items-center justify-center gap-1.5 h-8.5 w-full rounded-full text-[9.5px] font-bold tracking-wider uppercase bg-[#1F6F63] border border-transparent text-white hover:bg-[#0F5C4D] transition-colors"
                    >
                      <Tag size={11} />
                      <span>Classify Tool</span>
                    </Link>
                    <button
                      onClick={() => setShowAddPhotoModal(true)}
                      className="flex items-center justify-center gap-1.5 h-8.5 w-full rounded-full text-[9.5px] font-bold tracking-wider uppercase bg-[#0F5C4D]/10 border border-[#0F5C4D] text-[#0F5C4D] hover:bg-[#0F5C4D]/20 transition-colors"
                    >
                      <Plus size={11} />
                      <span>Add Photo</span>
                    </button>

                  </div>
                )}
              </div>

            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 min-w-0 pl-2 md:pl-6 pr-4 md:pr-6">



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
                    {filteredPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="break-inside-avoid mb-4 md:mb-5 group relative rounded-xl overflow-hidden bg-white border border-[#D9E6E0] cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                        onClick={() => handleOpenLightbox(filteredPhotos.findIndex((p) => p.id === photo.id))}
                      >
                        <img
                          src={photo.url}
                          alt={photo.category}
                          loading="lazy"
                          className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                          <div className="flex justify-between items-start">
                            {/* Admin controls — only visible when logged in as admin */}
                            {isAdmin ? (
                              <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                                {/* Move to another gallery */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPhotoToMove(photo);
                                    setMoveTargetSections((photo.category || "").split(",").map(t => t.trim()).filter(Boolean));
                                    setShowMovePhotoModal(true);
                                  }}
                                  className="w-7 h-7 rounded-full bg-blue-500/80 backdrop-blur-md border border-blue-300/40 flex items-center justify-center text-white hover:bg-blue-400 transition-colors"
                                  title="Move to another section"
                                >
                                  <Tag size={11} />
                                </button>
                                {/* Delete photo */}
                                <button
                                  onClick={(e) => { e.stopPropagation(); setPhotoToDelete(photo); }}
                                  className="w-7 h-7 rounded-full bg-red-500/80 backdrop-blur-md border border-red-300/40 flex items-center justify-center text-white hover:bg-red-400 transition-colors"
                                  title="Delete photo"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            ) : <div />}
                            {/* Favorite button */}
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
                            <div className="text-[11px] font-sans text-white/95 mt-0.5">View Frame &rsaquo;</div>
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
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 mt-16 mb-8">
          <div
            className="relative rounded-[28px] overflow-hidden shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #071a14 0%, #0d3d30 35%, #0F5C4D 65%, #071a14 100%)",
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

            {/* Decorative corner bracket — top left */}
            <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-[#9FDDC1]/30 rounded-tl-lg" />
            {/* Decorative corner bracket — top right */}
            <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-[#9FDDC1]/20 rounded-tr-lg" />
            {/* Decorative corner bracket — bottom left */}
            <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-[#9FDDC1]/20 rounded-bl-lg" />
            {/* Decorative corner bracket — bottom right */}
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
                <span className="w-1.5 h-1.5 rounded-full bg-[#9FDDC1] animate-pulse" />
                <span className="text-[9.5px] font-bold uppercase tracking-[0.3em] text-[#9FDDC1] font-sans">
                  Reserve Your Date
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#9FDDC1] animate-pulse" />
              </div>

              {/* Main heading — fully white */}
              <h2 className="font-serif text-[28px] sm:text-[38px] md:text-[50px] lg:text-[56px] font-normal leading-[1.15] tracking-tight mb-5 uppercase text-white">
                Let&apos;s{" "}
                <span className="text-[#9FDDC1] relative inline-block">
                  Immortalize
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #9FDDC1, transparent)",
                    }}
                  />
                </span>{" "}
                Your<br className="hidden sm:block" /> Moments
              </h2>

              {/* Decorative divider */}
              <div className="flex items-center gap-3 mb-6 w-full max-w-[360px]">
                <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#9FDDC1]/40" />
                <Camera size={14} className="text-[#9FDDC1] shrink-0" />
                <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#9FDDC1]/40" />
              </div>

              {/* Description */}
              <div className="text-white text-[13px] md:text-[15px] font-sans leading-relaxed max-w-[520px] font-normal mb-8" style={{ color: '#ffffff' }}>
                Specializing in candid emotions, dramatic lighting, and cinematic story-telling.{" "}
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Let us capture your legacy of emotions with micro-precision.
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 h-12 px-8 rounded-full bg-white text-[#0F5C4D] font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#9FDDC1] transition-all duration-300 shadow-lg hover:shadow-[0_0_35px_rgba(159,221,193,0.35)] hover:scale-[1.03]"
                >
                  Book Your Session
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
              <div className="mt-7 text-[10.5px] font-sans tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.65)' }}>
                ✦ &nbsp; Trusted by 200+ couples across India &nbsp; ✦
              </div>
            </div>
          </div>
        </div>

        {/* Terminating Separator Line */}
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 mt-16 mb-4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D9E6E0] to-transparent w-full" />
        </div>
      </main>

      {/* DELETE PHOTO CONFIRMATION MODAL */}
      {photoToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#D9E6E0] rounded-[24px] w-full max-w-[360px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Red danger header strip */}
            <div className="h-1 w-full bg-gradient-to-r from-red-400 via-red-500 to-red-400" />

            <div className="p-6 flex flex-col items-center text-center gap-4">
              {/* Warning icon */}
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                <Trash2 size={20} className="text-red-500" />
              </div>

              {/* Title */}
              <div>
                <h3 className="text-[15px] font-bold text-[#18352F] mb-1">Delete this photo?</h3>
                <p className="text-[11px] text-[#5E6C66] leading-relaxed">
                  This action is <span className="font-semibold text-red-500">permanent</span> and cannot be undone.
                  The photo will be removed from the gallery.
                </p>
              </div>

              {/* Photo preview */}
              <div className="w-full rounded-[14px] overflow-hidden border border-[#D9E6E0] relative">
                <img
                  src={photoToDelete.url}
                  alt="Photo to delete"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 border border-white/30">
                    {photoToDelete.category}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5 w-full">
                <button
                  onClick={() => setPhotoToDelete(null)}
                  className="flex-1 h-10 rounded-[14px] border border-[#D9E6E0] text-[#5E6C66] font-bold text-[11px] uppercase tracking-wider hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePhoto}
                  className="flex-1 h-10 rounded-[14px] bg-red-500 text-white font-bold text-[11px] uppercase tracking-wider hover:bg-red-600 transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow-red-200 hover:shadow-md"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN LOGIN MODAL */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#D9E6E0] rounded-[24px] w-full max-w-[380px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div
              className="px-6 py-5 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, #071a14 0%, #0F5C4D 100%)" }}
            >
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <Lock size={16} className="text-white" />
              </div>
              <div>
                <div style={{ color: '#ffffff', fontSize: 14, fontWeight: 700 }}>Admin Dashboard</div>
                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11 }}>Enter your password to continue</div>
              </div>
              <button
                onClick={() => setShowAdminLoginModal(false)}
                className="ml-auto w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X size={13} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAdminLogin} className="p-6 flex flex-col gap-4">
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  required
                  placeholder="Admin password"
                  value={adminPassword}
                  onChange={(e) => { setAdminPassword(e.target.value); setAdminLoginError(""); }}
                  className="w-full h-11 px-4 pr-10 border border-[#D9E6E0] rounded-[14px] text-[13px] focus:outline-none focus:border-[#0F5C4D] focus:ring-2 focus:ring-[#0F5C4D]/10 transition-all text-[#18352F] bg-[#F5FBF8]"
                />
                <Lock size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Error */}
              {adminLoginError && (
                <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-100 rounded-xl">
                  <ShieldAlert size={13} className="text-red-500 shrink-0" />
                  <span className="text-[11px] text-red-600">{adminLoginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={adminLoginLoading}
                className="h-11 rounded-[14px] bg-[#0F5C4D] text-white font-bold text-[11px] uppercase tracking-wider hover:bg-[#1F6F63] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
              >
                {adminLoginLoading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying...</>
                ) : (
                  <><Unlock size={13} /> Login as Admin</>
                )}
              </button>

              <div className="text-center">
                <span className="text-[10px] text-[#5E6C66]">Password is stored securely in environment variables</span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PHOTO MODAL — Multi-image Cloudinary upload with real galleries & compression */}
      {showAddPhotoModal && (() => {
        const sidebarSectionsList = ["Wedding", "Haldi", "Destination", "Portraits", "Collage", "Ring Ceremony"];

        const handleFileChange = (filesList: FileList | null) => {
          if (!filesList) return;
          const filesArray = Array.from(filesList);
          setUploadFiles(filesArray);
          const previews = filesArray.map(file => URL.createObjectURL(file));
          setUploadPreviews(previews);
        };

        const handleToggleNewPhotoCat = (sec: string) => {
          setNewPhotoCats(prev =>
            prev.includes(sec) ? prev.filter(s => s !== sec) : [...prev, sec]
          );
        };

        const handleUploadAndAdd = async (e: React.FormEvent) => {
          e.preventDefault();
          if (uploadFiles.length === 0) return;
          const targetGallery = allGalleries.find(g => g.id === (addPhotoGalleryId || allGalleries[0]?.id));
          if (!targetGallery) return;

          setIsUploading(true);
          setUploadProgress(5);

          try {
            const uploadedPhotos: Photo[] = [];
            const sectionsString = newPhotoCats.join(", ");

            for (let i = 0; i < uploadFiles.length; i++) {
              const file = uploadFiles[i];
              setCompressionStatus(`Compressing ${i + 1}/${uploadFiles.length}: ${file.name}...`);

              // Perform client-side compression
              const compressedFile = await compressImage(file);
              const originalSizeMB = (file.size / (1024 * 1024)).toFixed(2);
              const compressedSizeMB = (compressedFile.size / (1024 * 1024)).toFixed(2);

              setCompressionStatus(`Uploading ${i + 1}/${uploadFiles.length}: ${file.name} (${compressedSizeMB}MB)...`);

              const fd = new FormData();
              fd.append("file", compressedFile);

              const res = await fetch("/api/upload", { method: "POST", body: fd });
              if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || `Upload failed for ${file.name}`);
              }

              const data = await res.json();
              if (!data.url) throw new Error(`Upload failed for ${file.name}`);

              uploadedPhotos.push({
                id: "ph-" + Date.now() + "-" + i,
                url: data.url,
                category: sectionsString,
                likes: 0,
              });

              const stepProgress = Math.round(((i + 1) / uploadFiles.length) * 90);
              setUploadProgress(stepProgress);
            }

            setCompressionStatus("Saving all photos to MongoDB gallery...");
            const updated = {
              ...targetGallery,
              photos: [...(targetGallery.photos || []), ...uploadedPhotos]
            };
            await updateGallery(updated);
            setUploadProgress(100);
            setCompressionStatus("Successfully uploaded all photos!");

            // Refresh data
            const refreshed = await getGalleries();
            setAllGalleries(refreshed);
            if (activeCategory) setGalleries(refreshed.filter(g => g.categoryId === activeCategory.id));
            if (activeGallery && activeGallery.id === targetGallery.id) {
              setActiveGallery(updated);
            }

            setTimeout(() => {
              setShowAddPhotoModal(false);
              setUploadFiles([]);
              setUploadPreviews([]);
              setNewPhotoCats([]);
              setCompressionStatus("");
              setIsUploading(false);
              setUploadProgress(0);
            }, 800);

          } catch (err: any) {
            console.error(err);
            setCompressionStatus(`Error: ${err.message || "Upload failed."}`);
            setIsUploading(false);
          }
        };

        return (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white border border-[#D9E6E0] rounded-[24px] w-full max-w-[480px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="px-5 py-4 border-b border-[#D9E6E0]/40 flex justify-between items-center bg-[#F5FBF8]">
                <div className="flex items-center gap-2">
                  <ImageIcon size={15} className="text-[#0F5C4D]" />
                  <h3 className="text-[14px] font-bold text-[#18352F]">Upload Photos</h3>
                </div>
                <button
                  onClick={() => {
                    setShowAddPhotoModal(false);
                    setUploadFiles([]);
                    setUploadPreviews([]);
                    setNewPhotoCats([]);
                  }}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[#5E6C66] hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>

              <form onSubmit={handleUploadAndAdd} className="p-5 space-y-4">
                {/* File Picker */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6C66] mb-1.5">Select Photos</label>
                  <label
                    htmlFor="photo-upload-input"
                    className={`flex flex-col items-center justify-center w-full rounded-[14px] border-2 border-dashed cursor-pointer transition-all ${uploadPreviews.length > 0 ? "border-[#0F5C4D]/40 bg-[#F5FBF8] p-3" : "border-[#D9E6E0] hover:border-[#0F5C4D]/50 bg-[#F5FBF8] p-6"
                      }`}
                  >
                    {uploadPreviews.length > 0 ? (
                      <div className="w-full">
                        <div className="grid grid-cols-4 gap-2 max-h-[160px] overflow-y-auto p-1">
                          {uploadPreviews.map((src, idx) => (
                            <div key={idx} className="relative aspect-square rounded-[8px] overflow-hidden border border-[#D9E6E0]">
                              <img src={src} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                        <div className="text-center mt-2.5 text-[11px] font-bold text-[#0F5C4D]">
                          {uploadFiles.length} file{uploadFiles.length > 1 ? "s" : ""} selected
                        </div>
                      </div>
                    ) : (
                      <>
                        <Camera size={24} className="text-[#0F5C4D]/40 mb-2" />
                        <span className="text-[11px] font-semibold text-[#5E6C66]">Click to select images</span>
                        <span className="text-[10px] text-[#5E6C66]/60 mt-0.5">Select one or more files — Auto Compressed</span>
                      </>
                    )}
                  </label>
                  <input
                    id="photo-upload-input"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files)}
                  />
                </div>

                {/* Upload & Compression Progress */}
                {isUploading && (
                  <div className="space-y-1.5 p-3.5 bg-[#F5FBF8] border border-[#0F5C4D]/10 rounded-[14px]">
                    <div className="flex justify-between text-[10px] text-[#5E6C66]">
                      <span className="font-semibold text-[#0F5C4D]">{compressionStatus}</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#D9E6E0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0F5C4D] rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}



                {/* Multi-Section Selection Tag Chips */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6C66] mb-2">Sections / Tags</label>
                  <div className="grid grid-cols-2 gap-2">
                    {sidebarSectionsList.map((sec) => {
                      const isChecked = newPhotoCats.includes(sec);
                      return (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => handleToggleNewPhotoCat(sec)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-[10px] border text-left text-xs transition-all ${isChecked
                            ? "border-[#0F5C4D] bg-[#0F5C4D]/5 text-[#0F5C4D] font-bold"
                            : "border-[#D9E6E0] bg-[#F5FBF8] text-[#18352F] hover:border-[#0F5C4D]/35"
                            }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-[4px] border flex items-center justify-center transition-all ${isChecked
                            ? "border-[#0F5C4D] bg-[#0F5C4D] text-white"
                            : "border-gray-300 bg-white"
                            }`}>
                            {isChecked && <Check size={8} strokeWidth={3} />}
                          </span>
                          <span>{sec}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddPhotoModal(false);
                      setUploadFiles([]);
                      setUploadPreviews([]);
                      setNewPhotoCats([]);
                    }}
                    className="h-9 px-4 rounded-[12px] text-[11px] font-bold text-[#5E6C66] hover:bg-gray-100 transition-colors"
                  >Cancel</button>
                  <button
                    type="submit"
                    disabled={uploadFiles.length === 0 || isUploading}
                    className="h-9 px-5 rounded-[12px] text-[11px] font-bold bg-[#0F5C4D] text-white hover:bg-[#1F6F63] disabled:opacity-50 transition-colors flex items-center gap-1.5"
                  >
                    {isUploading ? (
                      <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading…</>
                    ) : (
                      <><Plus size={12} /> Upload & Add</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      })()}

      {/* CHANGE PHOTO SECTION MODAL */}
      {showMovePhotoModal && photoToMove && (() => {
        const sidebarSectionsList = ["Wedding", "Haldi", "Destination", "Portraits", "Collage", "Ring Ceremony"];

        const handleToggleSection = (section: string) => {
          setMoveTargetSections((prev) =>
            prev.includes(section)
              ? prev.filter((s) => s !== section)
              : [...prev, section]
          );
        };

        return (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white border border-[#D9E6E0] rounded-[24px] w-full max-w-[400px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="px-5 py-4 border-b border-[#D9E6E0]/40 flex justify-between items-center bg-[#F5FBF8]">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[#0F5C4D]" />
                  <h3 className="text-[14px] font-bold text-[#18352F]">Change Photo Sections</h3>
                </div>
                <button
                  onClick={() => { setShowMovePhotoModal(false); setPhotoToMove(null); setMoveTargetSections([]); }}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[#5E6C66] hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Photo preview with current section badge */}
                <div className="flex gap-3 items-center p-3 bg-[#F5FBF8] border border-[#D9E6E0] rounded-[14px]">
                  <img src={photoToMove.url} alt="" className="w-14 h-14 object-cover rounded-lg shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#5E6C66]">Current section tags</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {(photoToMove.category || "").split(",").map(s => s.trim()).filter(Boolean).map((s, idx) => (
                        <span key={idx} className="text-[9px] font-bold text-[#0F5C4D] px-2 py-0.5 rounded-full bg-[#0F5C4D]/10 border border-[#0F5C4D]/25">
                          {s}
                        </span>
                      ))}
                      {!(photoToMove.category || "").trim() && (
                        <span className="text-[9px] font-bold text-gray-400 px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                          Untagged
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#5E6C66] mt-1.5">Gallery: {photoToMove.gallery?.name ?? "Unknown"}</div>
                  </div>
                </div>

                <form onSubmit={handleMovePhoto} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5E6C66] mb-2">
                      Select Sections
                      <span className="ml-1.5 text-[#0F5C4D] normal-case font-normal">(Select all that apply)</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                      {sidebarSectionsList.map((sec) => {
                        const isChecked = moveTargetSections.includes(sec);
                        return (
                          <button
                            key={sec}
                            type="button"
                            onClick={() => handleToggleSection(sec)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] border text-left text-xs transition-all ${isChecked
                              ? "border-[#0F5C4D] bg-[#0F5C4D]/5 text-[#0F5C4D] font-bold"
                              : "border-[#D9E6E0] bg-[#F5FBF8] text-[#18352F] hover:border-[#0F5C4D]/35"
                              }`}
                          >
                            <span className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all ${isChecked
                              ? "border-[#0F5C4D] bg-[#0F5C4D] text-white"
                              : "border-gray-300 bg-white"
                              }`}>
                              {isChecked && <Check size={10} strokeWidth={3} />}
                            </span>
                            <span>{sec}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => { setShowMovePhotoModal(false); setPhotoToMove(null); setMoveTargetSections([]); }}
                      className="h-9 px-4 rounded-[12px] text-[11px] font-bold text-[#5E6C66] hover:bg-gray-100 transition-colors"
                    >Cancel</button>
                    <button
                      type="submit"
                      className="h-9 px-5 rounded-[12px] text-[11px] font-bold bg-[#0F5C4D] text-white hover:bg-[#1F6F63] transition-colors flex items-center gap-1.5"
                    >
                      <Tag size={11} /> Save Sections
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      })()}

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
