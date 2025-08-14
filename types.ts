// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// Recipe interface
export interface Recipe extends CosmicObject {
  type: 'recipes';
  metadata: {
    recipe_name?: string;
    description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    ingredients?: string;
    instructions?: string;
    prep_time?: number;
    cook_time?: number;
    servings?: number;
    difficulty_level?: {
      key: DifficultyLevel;
      value: string;
    };
    category?: Category;
    author?: Author;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string; // Made required since it's essential for display
    description?: string;
  };
  thumbnail?: string;
}

// Category with recipe count for homepage and category pages
export interface CategoryWithCount extends Category {
  recipeCount: number;
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    specialty_cuisine?: string;
  };
}

// Type literals for select-dropdown values
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
}

// Type guards for runtime type checking
export function isRecipe(obj: CosmicObject): obj is Recipe {
  return obj.type === 'recipes';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

// Utility types
export type RecipeCardProps = {
  recipe: Recipe;
  className?: string;
};

export type CategoryCardProps = {
  category: CategoryWithCount;
  className?: string;
};

export type AuthorCardProps = {
  author: Author;
  recipeCount?: number;
  className?: string;
};