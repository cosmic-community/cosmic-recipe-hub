import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-orange-400 to-red-500 text-white py-20">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Discover Amazing Recipes
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Explore delicious recipes from talented chefs around the world. 
          From quick weeknight dinners to elaborate weekend treats.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/recipes"
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Recipes
          </Link>
          <Link
            href="#categories"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
          >
            Explore Categories
          </Link>
        </div>
      </div>
    </section>
  )
}