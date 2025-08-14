import { Metadata } from 'next'
import { getCategoriesWithRecipeCount } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const metadata: Metadata = {
  title: 'Recipe Categories - Cosmic Recipe Hub',
  description: 'Browse all recipe categories and discover new cooking inspirations.',
}

interface CategoryWithCount {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    description?: string
  }
  recipeCount: number
  thumbnail?: string
}

export default async function CategoriesPage(): Promise<JSX.Element> {
  let categories: CategoryWithCount[] = []

  try {
    categories = await getCategoriesWithRecipeCount()
  } catch (error) {
    console.error('Error fetching categories:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Recipe Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of recipe categories and find your next culinary adventure
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}