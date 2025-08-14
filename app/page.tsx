import { getRecipes, getCategories } from '@/lib/cosmic'
import RecipeCard from '@/components/RecipeCard'
import CategoryCard from '@/components/CategoryCard'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [recipes, categories] = await Promise.all([
    getRecipes(),
    getCategories()
  ])

  const featuredRecipes = recipes.slice(0, 6)

  return (
    <>
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recipe Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover recipes organized by meal type and cuisine style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Recipes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hand-picked recipes from our talented chef community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}