import { createBucketClient } from '@cosmicjs/sdk'
import { Recipe, Category, Author, CategoryWithCount } from '@/types'

if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
  throw new Error('Missing required Cosmic environment variables')
}

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
  apiEnvironment: "staging"
})

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'recipes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects || []
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    console.error('Error fetching recipes:', error)
    throw error
  }
}

export async function getRecipe(slug: string): Promise<Recipe> {
  return getRecipeBySlug(slug)
}

export async function getRecipeBySlug(slug: string): Promise<Recipe> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'recipes', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object
  } catch (error: unknown) {
    console.error('Error fetching recipe by slug:', error)
    throw error
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])

    return objects || []
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])

    return object
  } catch (error: unknown) {
    console.error('Error fetching category by slug:', error)
    throw error
  }
}

export async function getRecipesByCategory(categoryId: string): Promise<Recipe[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'recipes',
        'metadata.category': categoryId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects || []
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    console.error('Error fetching recipes by category:', error)
    throw error
  }
}

export async function getCategoriesWithRecipeCount(): Promise<CategoryWithCount[]> {
  try {
    const categories = await getCategories()
    const categoriesWithCount = await Promise.all(
      categories.map(async (category): Promise<CategoryWithCount> => {
        const recipes = await getRecipesByCategory(category.id)
        return {
          ...category,
          recipeCount: recipes.length
        }
      })
    )

    return categoriesWithCount
  } catch (error: unknown) {
    console.error('Error fetching categories with recipe count:', error)
    return []
  }
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])

    return objects || []
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    console.error('Error fetching authors:', error)
    throw error
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'title', 'slug', 'metadata'])

    return object
  } catch (error: unknown) {
    console.error('Error fetching author by slug:', error)
    throw error
  }
}

export async function getFeaturedRecipes(limit: number = 6): Promise<Recipe[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'recipes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit)

    return objects || []
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    console.error('Error fetching featured recipes:', error)
    throw error
  }
}