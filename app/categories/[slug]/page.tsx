// app/categories/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getRecipesByCategory } from '@/lib/cosmic'
import { Category, Recipe } from '@/types'
import RecipeCard from '@/components/RecipeCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const category = await getCategoryBySlug(slug)
    
    return {
      title: `${category.metadata.name} Recipes - Cosmic Recipe Hub`,
      description: category.metadata.description || `Discover delicious ${category.metadata.name.toLowerCase()} recipes`,
    }
  } catch {
    return {
      title: 'Category Not Found - Cosmic Recipe Hub',
      description: 'The requested category could not be found.',
    }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps): Promise<JSX.Element> {
  const { slug } = await params
  
  let category: Category
  let recipes: Recipe[] = []

  try {
    category = await getCategoryBySlug(slug)
    recipes = await getRecipesByCategory(category.id)
  } catch (error) {
    console.error('Error fetching category or recipes:', error)
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        {/* Category Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            {category.metadata.name}
          </h1>
          {category.metadata.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {category.metadata.description}
            </p>
          )}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <span className="text-orange-600 font-medium">
              {recipes.length} {recipes.length === 1 ? 'Recipe' : 'Recipes'}
            </span>
          </div>
        </div>

        {/* Recipes Grid */}
        {recipes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">
              No recipes found in this category yet.
            </p>
            <a 
              href="/recipes" 
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition-colors duration-200"
            >
              Browse All Recipes
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}