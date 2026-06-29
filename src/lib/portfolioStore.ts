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
    coverUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    shootCount: 245,
    order: 1,
  },
  {
    id: "pre-weddings",
    name: "Pre Weddings",
    coverUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    shootCount: 120,
    order: 2,
  },
  {
    id: "birthdays",
    name: "Birthdays",
    coverUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    shootCount: 80,
    order: 3,
  },
  {
    id: "events",
    name: "Parties & Events",
    coverUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    shootCount: 78,
    order: 4,
  },
  {
    id: "maternity",
    name: "Maternity",
    coverUrl: "https://images.unsplash.com/photo-1551972251-12cb72448d5a?auto=format&fit=crop&w=800&q=80",
    shootCount: 45,
    order: 5,
  },
  {
    id: "destination-weddings",
    name: "Destination Weddings",
    coverUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    shootCount: 54,
    order: 6,
  },
  {
    id: "portraits",
    name: "Fashion & Portraits",
    coverUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    shootCount: 71,
    order: 7,
  },
];

const MOCK_WEDDING_PHOTOS: Photo[] = [
  {
    id: "w1",
    url: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=800&q=80",
    category: "Couple Portraits",
    likes: 12,
  },
  {
    id: "w2",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    category: "Bride Portraits",
    likes: 8,
  },
  {
    id: "w3",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    category: "Ceremony",
    likes: 15,
  },
  {
    id: "w4",
    url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80",
    category: "Candid Moments",
    likes: 24,
  },
  {
    id: "w5",
    url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
    category: "Reception",
    likes: 6,
  },
  {
    id: "w6",
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    category: "Details",
    likes: 19,
  },
  {
    id: "w7",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    category: "Ceremony",
    likes: 14,
  },
  {
    id: "w8",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    category: "Couple Portraits",
    likes: 31,
  },
  {
    id: "w9",
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
    category: "Bride Portraits",
    likes: 21,
  },
  {
    id: "w10",
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    category: "Candid Moments",
    likes: 42,
  },
  {
    id: "w11",
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    category: "Reception",
    likes: 11,
  },
  {
    id: "w12",
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
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
      url: p.url.replace("w=", "w=700&q=80"), // slight variation
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
      { id: "p1", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", category: "Couple Portraits" },
      { id: "p2", url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80", category: "Candid Moments" },
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
  return JSON.parse(stored);
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
  return JSON.parse(stored);
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
