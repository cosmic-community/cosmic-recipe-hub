import { createBucketClient } from '@cosmicjs/sdk'
import { Recipe, Category, Author } from '@/types'

if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
  throw new Error('Missing required Cosmic environment variables')
}

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
})

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'recipes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return objects || []
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe> {
  const { object } = await cosmic.objects
    .findOne({ type: 'recipes', slug })
    .props(['id', 'title', 'slug', 'metadata'])
    .depth(1)

  return object
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])

    return objects || []
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const { object } = await cosmic.objects
    .findOne({ type: 'categories', slug })
    .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])

  return object
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
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getCategoriesWithRecipeCount(): Promise<Array<Category & { recipeCount: number }>> {
  try {
    const categories = await getCategories()
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const recipes = await getRecipesByCategory(category.id)
        return {
          ...category,
          recipeCount: recipes.length
        }
      })
    )

    return categoriesWithCount
  } catch (error) {
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
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  const { object } = await cosmic.objects
    .findOne({ type: 'authors', slug })
    .props(['id', 'title', 'slug', 'metadata'])

  return object
}

export async function getFeaturedRecipes(limit: number = 6): Promise<Recipe[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'recipes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit)

    return objects || []
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}