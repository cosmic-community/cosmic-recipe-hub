import Link from 'next/link'
import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  recipeCount?: number
  className?: string
}

export default function CategoryCard({ category, recipeCount, className = '' }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className={`group ${className}`}>
      <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 border border-gray-200">
        <div className="text-center">
          <div className="text-4xl mb-4">
            {getCategoryEmoji(category.slug)}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {category.title}
          </h3>
          
          {category.metadata?.description && (
            <p className="text-gray-600 text-sm mb-4">
              {category.metadata.description}
            </p>
          )}
          
          {recipeCount !== undefined && (
            <p className="text-primary font-medium text-sm">
              {recipeCount} recipe{recipeCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}

function getCategoryEmoji(slug: string): string {
  const emojiMap: Record<string, string> = {
    'breakfast': '🥞',
    'appetizers': '🥗',
    'desserts': '🍰',
    'main-courses': '🍽️',
    'beverages': '☕',
    'snacks': '🍪',
  }
  
  return emojiMap[slug] || '🍳'
}