import { getRecipes } from '@/lib/cosmic'
import RecipeCard from '@/components/RecipeCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Recipes - Cosmic Recipe Hub',
  description: 'Browse our complete collection of recipes from talented chefs around the world.',
}

export default async function RecipesPage() {
  const recipes = await getRecipes()

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Recipes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of {recipes.length} delicious recipes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  )
}