// src/types/index.ts - dodaj jeśli nie masz
export type SortOption = 
  | "default" 
  | "price-asc" 
  | "price-desc" 
  | "title-asc" 
  | "title-desc" 
  | "author-asc"

export interface BooksProps {
  selectedCategory: string
  selectedSort: SortOption
  searchQuery?: string // Dodaj opcjonalny prop
}