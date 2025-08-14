import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🍳</span>
              <h1 className="text-xl font-bold text-gray-900">
                Cosmic Recipe Hub
              </h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Recipes
            </Link>
          </nav>

          {/* Mobile menu button - could be expanded for mobile nav */}
          <div className="md:hidden">
            <Link
              href="/recipes"
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Recipes
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}