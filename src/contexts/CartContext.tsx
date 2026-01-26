"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Course, COURSES } from "@/app/catalogo/data";
import { AcademyCourse, ACADEMY_COURSES } from "@/app/academy/data";

interface CartContextType {
  favorites: string[]; // Array de slugs dos cursos favoritados
  addToFavorites: (slug: string) => void;
  removeFromFavorites: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  getFavoriteCourses: () => Course[];
  getFavoriteAcademyCourses: () => AcademyCourse[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Lazy initializer: carregar do localStorage
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem("landspace_favorites");
      if (savedFavorites) {
        try {
          return JSON.parse(savedFavorites);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Salvar no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem("landspace_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (slug: string) => {
    setFavorites((prev) => {
      if (prev.includes(slug)) {
        return prev;
      }
      return [...prev, slug];
    });
  };

  const removeFromFavorites = (slug: string) => {
    setFavorites((prev) => prev.filter((s) => s !== slug));
  };

  const isFavorite = (slug: string) => {
    return favorites.includes(slug);
  };

  const getFavoriteCourses = (): Course[] => {
    return COURSES.filter((course: Course) => favorites.includes(course.slug));
  };

  const getFavoriteAcademyCourses = (): AcademyCourse[] => {
    return ACADEMY_COURSES.filter((course: AcademyCourse) => favorites.includes(course.slug));
  };

  return (
    <CartContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getFavoriteCourses,
        getFavoriteAcademyCourses,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

