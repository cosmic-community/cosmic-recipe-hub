// app/recipes/[slug]/page.tsx
import { getRecipe, getRecipes } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

interface RecipePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const recipes = await getRecipes()
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipe(slug)

  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    }
  }

  return {
    title: `${recipe.title} - Cosmic Recipe Hub`,
    description: recipe.metadata?.description || `Learn how to make ${recipe.title}`,
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params
  const recipe = await getRecipe(slug)

  if (!recipe) {
    notFound()
  }

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  }

  return (
    <article className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/recipes" 
            className="text-primary hover:text-primary-hover font-medium"
          >
            ← Back to Recipes
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {recipe.title}
          </h1>
          
          {recipe.metadata?.description && (
            <p className="text-xl text-gray-600 mb-6">
              {recipe.metadata.description}
            </p>
          )}

          {/* Recipe Meta Information */}
          <div className="flex flex-wrap gap-4 mb-6">
            {recipe.metadata?.prep_time && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Prep:</span>
                <span className="ml-1">{recipe.metadata.prep_time} min</span>
              </div>
            )}
            {recipe.metadata?.cook_time && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Cook:</span>
                <span className="ml-1">{recipe.metadata.cook_time} min</span>
              </div>
            )}
            {recipe.metadata?.servings && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Serves:</span>
                <span className="ml-1">{recipe.metadata.servings}</span>
              </div>
            )}
            {recipe.metadata?.difficulty_level && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                difficultyColors[recipe.metadata.difficulty_level.key] || 'bg-gray-100 text-gray-800'
              }`}>
                {recipe.metadata.difficulty_level.value}
              </span>
            )}
          </div>

          {/* Category and Author */}
          <div className="flex flex-wrap gap-4 mb-8">
            {recipe.metadata?.category && (
              <Link
                href={`/categories/${recipe.metadata.category.slug}`}
                className="text-sm text-primary hover:text-primary-hover font-medium"
              >
                {recipe.metadata.category.title}
              </Link>
            )}
            {recipe.metadata?.author && (
              <Link
                href={`/authors/${recipe.metadata.author.slug}`}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                By {recipe.metadata.author.title}
              </Link>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {recipe.metadata?.featured_image && (
          <div className="mb-8">
            <img
              src={`${recipe.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={recipe.title}
              width="800"
              height="500"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ingredients
            </h2>
            {recipe.metadata?.ingredients && (
              <div 
                className="prose-recipe"
                dangerouslySetInnerHTML={{ __html: recipe.metadata.ingredients }}
              />
            )}
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Instructions
            </h2>
            {recipe.metadata?.instructions && (
              <div 
                className="prose-recipe"
                dangerouslySetInnerHTML={{ __html: recipe.metadata.instructions }}
              />
            )}
          </div>
        </div>

        {/* Author Section */}
        {recipe.metadata?.author && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start space-x-4">
              {recipe.metadata.author.metadata?.profile_photo && (
                <img
                  src={`${recipe.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={recipe.metadata.author.title}
                  width="80"
                  height="80"
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {recipe.metadata.author.title}
                </h3>
                {recipe.metadata.author.metadata?.specialty_cuisine && (
                  <p className="text-sm text-primary font-medium mb-2">
                    Specialty: {recipe.metadata.author.metadata.specialty_cuisine}
                  </p>
                )}
                {recipe.metadata.author.metadata?.bio && (
                  <p className="text-gray-600">
                    {recipe.metadata.author.metadata.bio}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </article>
  )
}