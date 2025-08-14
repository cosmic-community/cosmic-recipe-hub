import Link from 'next/link'
import { Recipe } from '@/types'

interface RecipeCardProps {
  recipe: Recipe
  className?: string
}

export default function RecipeCard({ recipe, className = '' }: RecipeCardProps) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  }

  const totalTime = (recipe.metadata?.prep_time || 0) + (recipe.metadata?.cook_time || 0)

  return (
    <Link href={`/recipes/${recipe.slug}`} className={`group ${className}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {recipe.metadata?.featured_image && (
          <div className="aspect-recipe overflow-hidden">
            <img
              src={`${recipe.metadata.featured_image.imgix_url}?w=600&h=375&fit=crop&auto=format,compress`}
              alt={recipe.title}
              width="400"
              height="250"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
              {recipe.title}
            </h3>
            {recipe.metadata?.difficulty_level && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                difficultyColors[recipe.metadata.difficulty_level.key] || 'bg-gray-100 text-gray-800'
              }`}>
                {recipe.metadata.difficulty_level.value}
              </span>
            )}
          </div>
          
          {recipe.metadata?.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {recipe.metadata.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {totalTime > 0 && (
                <span>⏱️ {totalTime} min</span>
              )}
              {recipe.metadata?.servings && (
                <span>👥 {recipe.metadata.servings} servings</span>
              )}
            </div>
            
            {recipe.metadata?.category && (
              <span className="text-primary font-medium">
                {recipe.metadata.category.title}
              </span>
            )}
          </div>
          
          {recipe.metadata?.author && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center space-x-2">
              {recipe.metadata.author.metadata?.profile_photo && (
                <img
                  src={`${recipe.metadata.author.metadata.profile_photo.imgix_url}?w=32&h=32&fit=crop&auto=format,compress`}
                  alt={recipe.metadata.author.title}
                  width="32"
                  height="32"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-gray-600">
                By {recipe.metadata.author.title}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}