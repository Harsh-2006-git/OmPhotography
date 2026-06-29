"use client";

export interface Photo {
  id: string;
  url: string;
  category: string; // 'Ceremony' | 'Portraits' | 'Bride Portraits' | 'Reception' | 'Candid Moments' | 'Details'
  likes?: number;
}

export interface ClientGallery {
  id: string;
  categoryId: string; // e.g. 'weddings'
  name: string;
  description: string;
  date: string;
  location: string;
  photographer: string;
  coverUrl?: string;
  photos: Photo[];
  isPublic: boolean;
  password?: string;
  favorites?: string[]; // list of photo IDs favorited by clients
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  coverUrl: string;
  shootCount: number;
  order: number;
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "weddings",
    name: "Weddings",
    coverUrl: "/placeholder.svg",
    shootCount: 245,
    order: 1,
  },
  {
    id: "pre-weddings",
    name: "Pre Weddings",
    coverUrl: "/placeholder.svg",
    shootCount: 120,
    order: 2,
  },
  {
    id: "birthdays",
    name: "Birthdays",
    coverUrl: "/placeholder.svg",
    shootCount: 80,
    order: 3,
  },
  {
    id: "events",
    name: "Parties & Events",
    coverUrl: "/placeholder.svg",
    shootCount: 78,
    order: 4,
  },
  {
    id: "maternity",
    name: "Maternity",
    coverUrl: "/placeholder.svg",
    shootCount: 45,
    order: 5,
  },
  {
    id: "destination-weddings",
    name: "Destination Weddings",
    coverUrl: "/placeholder.svg",
    shootCount: 54,
    order: 6,
  },
  {
    id: "portraits",
    name: "Fashion & Portraits",
    coverUrl: "/placeholder.svg",
    shootCount: 71,
    order: 7,
  },
];

const MOCK_WEDDING_PHOTOS: Photo[] = [
  {
    id: "w1",
    url: "/placeholder.svg",
    category: "Couple Portraits",
    likes: 12,
  },
  {
    id: "w2",
    url: "/placeholder.svg",
    category: "Bride Portraits",
    likes: 8,
  },
  {
    id: "w3",
    url: "/placeholder.svg",
    category: "Ceremony",
    likes: 15,
  },
  {
    id: "w4",
    url: "/placeholder.svg",
    category: "Candid Moments",
    likes: 24,
  },
  {
    id: "w5",
    url: "/placeholder.svg",
    category: "Reception",
    likes: 6,
  },
  {
    id: "w6",
    url: "/placeholder.svg",
    category: "Details",
    likes: 19,
  },
  {
    id: "w7",
    url: "/placeholder.svg",
    category: "Ceremony",
    likes: 14,
  },
  {
    id: "w8",
    url: "/placeholder.svg",
    category: "Couple Portraits",
    likes: 31,
  },
  {
    id: "w9",
    url: "/placeholder.svg",
    category: "Bride Portraits",
    likes: 21,
  },
  {
    id: "w10",
    url: "/placeholder.svg",
    category: "Candid Moments",
    likes: 42,
  },
  {
    id: "w11",
    url: "/placeholder.svg",
    category: "Reception",
    likes: 11,
  },
  {
    id: "w12",
    url: "/placeholder.svg",
    category: "Details",
    likes: 5,
  },
];

const DEFAULT_GALLERIES: ClientGallery[] = [
  {
    id: "rahul-priya-wedding",
    categoryId: "weddings",
    name: "Rahul & Priya Wedding",
    description: "A celebration of love, laughter and unforgettable memories in the heart of Delhi.",
    date: "2024-05-12",
    location: "Delhi, India",
    photographer: "Om",
    photos: MOCK_WEDDING_PHOTOS,
    isPublic: true,
    favorites: [],
    isFeatured: true,
  },
  {
    id: "amit-neha-wedding",
    categoryId: "weddings",
    name: "Amit & Neha Wedding",
    description: "An elegant regal affair set against the serene lakes and palaces of Udaipur.",
    date: "2024-11-18",
    location: "Udaipur, India",
    photographer: "Om",
    photos: MOCK_WEDDING_PHOTOS.map((p, idx) => ({
      ...p,
      id: `an-${idx}`,
    })),
    isPublic: true,
    favorites: [],
    isFeatured: false,
  },
  {
    id: "vikram-riya-wedding",
    categoryId: "weddings",
    name: "Vikram & Riya Wedding",
    description: "A glamorous dynamic celebration with fireworks and traditional Rajasthani royalty.",
    date: "2024-12-05",
    location: "Jaipur, India",
    photographer: "Om",
    photos: MOCK_WEDDING_PHOTOS.slice(2, 10).map((p, idx) => ({
      ...p,
      id: `vr-${idx}`,
    })),
    isPublic: true,
    favorites: [],
  },
  {
    id: "karan-anjali-wedding",
    categoryId: "weddings",
    name: "Karan & Anjali Wedding",
    description: "Breathtaking heritage portraits inside the historical blue-city forts of Jodhpur.",
    date: "2025-01-15",
    location: "Jodhpur, India",
    photographer: "Om",
    photos: MOCK_WEDDING_PHOTOS.slice(4, 12).map((p, idx) => ({
      ...p,
      id: `ka-${idx}`,
    })),
    isPublic: true,
    favorites: [],
  },
  {
    id: "siddharth-isha-wedding",
    categoryId: "weddings",
    name: "Siddharth & Isha Wedding",
    description: "A modern chic coastal wedding overlooking the shores of Mumbai.",
    date: "2025-02-20",
    location: "Mumbai, India",
    photographer: "Om",
    photos: MOCK_WEDDING_PHOTOS.slice(1, 8).map((p, idx) => ({
      ...p,
      id: `si-${idx}`,
    })),
    isPublic: true,
    favorites: [],
  },
  {
    id: "rohan-sneha-wedding",
    categoryId: "weddings",
    name: "Rohan & Sneha Wedding",
    description: "An intimate desert camp sand dunes ceremony with golden lighting.",
    date: "2025-03-10",
    location: "Jaisalmer, India",
    photographer: "Om",
    photos: MOCK_WEDDING_PHOTOS.map((p, idx) => ({
      ...p,
      id: `rs-${idx}`,
    })),
    isPublic: true,
    favorites: [],
  },
  {
    id: "arjun-pooja-wedding",
    categoryId: "weddings",
    name: "Arjun & Pooja Wedding",
    description: "A lush garden green wedding with traditional South Indian heritage rituals.",
    date: "2025-04-08",
    location: "Bangalore, India",
    photographer: "Om",
    photos: MOCK_WEDDING_PHOTOS.slice(0, 6).map((p, idx) => ({
      ...p,
      id: `ap-${idx}`,
    })),
    isPublic: true,
    favorites: [],
  },
  {
    id: "manish-kriti-wedding",
    categoryId: "weddings",
    name: "Manish & Kriti Wedding",
    description: "Sunset wedding celebrations on the sands of Goa with breezy white setups.",
    date: "2025-05-02",
    location: "Goa, India",
    photographer: "Om",
    photos: MOCK_WEDDING_PHOTOS.slice(3, 11).map((p, idx) => ({
      ...p,
      id: `mk-${idx}`,
    })),
    isPublic: true,
    favorites: [],
  },
  {
    id: "prewedding-1",
    categoryId: "pre-weddings",
    name: "Varun & Aditi Pre-Shoot",
    description: "A sunset love story session in the sand dunes.",
    date: "2025-02-14",
    location: "Jaisalmer, India",
    photographer: "Om",
    photos: [
      { id: "p1", url: "/placeholder.svg", category: "Couple Portraits" },
      { id: "p2", url: "/placeholder.svg", category: "Candid Moments" },
    ],
    isPublic: true,
    favorites: [],
  }
];

export function getCategories(): Category[] {
  if (typeof window === "undefined") return DEFAULT_CATEGORIES;
  const stored = localStorage.getItem("om_categories");
  if (!stored) {
    localStorage.setItem("om_categories", JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  }
  try {
    const parsed = JSON.parse(stored);
    let updated = false;
    const cleaned = parsed.map((cat: any) => {
      if (cat.coverUrl && cat.coverUrl.includes("unsplash.com")) {
        cat.coverUrl = "/placeholder.svg";
        updated = true;
      }
      return cat;
    });
    if (updated) {
      localStorage.setItem("om_categories", JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
}

export function saveCategories(categories: Category[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("om_categories", JSON.stringify(categories));
}

export function getGalleries(): ClientGallery[] {
  if (typeof window === "undefined") return DEFAULT_GALLERIES;
  const stored = localStorage.getItem("om_galleries");
  if (!stored) {
    localStorage.setItem("om_galleries", JSON.stringify(DEFAULT_GALLERIES));
    return DEFAULT_GALLERIES;
  }
  try {
    const parsed = JSON.parse(stored);
    let updated = false;
    const cleaned = parsed.map((gal: any) => {
      if (gal.coverUrl && gal.coverUrl.includes("unsplash.com")) {
        gal.coverUrl = "/placeholder.svg";
        updated = true;
      }
      if (gal.photos) {
        gal.photos = gal.photos.map((p: any) => {
          if (p.url && p.url.includes("unsplash.com")) {
            p.url = "/placeholder.svg";
            updated = true;
          }
          return p;
        });
      }
      return gal;
    });
    if (updated) {
      localStorage.setItem("om_galleries", JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (e) {
    return DEFAULT_GALLERIES;
  }
}

export function saveGalleries(galleries: ClientGallery[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("om_galleries", JSON.stringify(galleries));
}

export function addCategory(category: Omit<Category, "shootCount" | "order">) {
  const categories = getCategories();
  const newCat: Category = {
    ...category,
    shootCount: 0,
    order: categories.length + 1,
  };
  categories.push(newCat);
  saveCategories(categories);
  return newCat;
}

export function updateCategory(category: Category) {
  const categories = getCategories();
  const idx = categories.findIndex((c) => c.id === category.id);
  if (idx !== -1) {
    categories[idx] = category;
    saveCategories(categories);
  }
}

export function deleteCategory(id: string) {
  let categories = getCategories();
  categories = categories.filter((c) => c.id !== id);
  saveCategories(categories);
  
  // also clean up galleries in this category
  let galleries = getGalleries();
  galleries = galleries.filter((g) => g.categoryId !== id);
  saveGalleries(galleries);
}

export function addGallery(gallery: Omit<ClientGallery, "favorites" | "photos"> & { photos?: Photo[] }) {
  const galleries = getGalleries();
  const newGal: ClientGallery = {
    ...gallery,
    photos: gallery.photos || [],
    favorites: [],
  };
  galleries.push(newGal);
  saveGalleries(galleries);

  // Update category count
  const categories = getCategories();
  const cat = categories.find((c) => c.id === gallery.categoryId);
  if (cat) {
    cat.shootCount = (cat.shootCount || 0) + 1;
    saveCategories(categories);
  }

  return newGal;
}

export function updateGallery(gallery: ClientGallery) {
  const galleries = getGalleries();
  const idx = galleries.findIndex((g) => g.id === gallery.id);
  if (idx !== -1) {
    galleries[idx] = gallery;
    saveGalleries(galleries);
  }
}

export function deleteGallery(id: string) {
  const galleries = getGalleries();
  const gallery = galleries.find((g) => g.id === id);
  if (!gallery) return;

  const updated = galleries.filter((g) => g.id !== id);
  saveGalleries(updated);

  // Update category count
  const categories = getCategories();
  const cat = categories.find((c) => c.id === gallery.categoryId);
  if (cat && cat.shootCount > 0) {
    cat.shootCount -= 1;
    saveCategories(categories);
  }
}
