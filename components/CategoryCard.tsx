import Link from 'next/link'
import { Category } from '@/types'

interface CategoryCardProps {
  category: Category & { recipeCount: number }
}

export default function CategoryCard({ category }: CategoryCardProps): JSX.Element {
  const imageUrl = category.thumbnail || 'https://images.unsplash.com/photo-1556909114-2a98c5ad9ec9?w=800&h=600&fit=crop&auto=format,compress'
  
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={category.metadata.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">
              {category.metadata.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-sm px-2 py-1 rounded-full backdrop-blur-sm">
                {category.recipeCount} {category.recipeCount === 1 ? 'Recipe' : 'Recipes'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {category.metadata.description && (
            <p className="text-gray-600 line-clamp-3">
              {category.metadata.description}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-orange-600 font-medium group-hover:text-orange-700 transition-colors">
              Explore Category →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}