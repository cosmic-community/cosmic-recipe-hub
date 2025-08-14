export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🍳</span>
              <h3 className="text-lg font-bold">Cosmic Recipe Hub</h3>
            </div>
            <p className="text-gray-300">
              Discover amazing recipes from talented chefs around the world.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/recipes" className="text-gray-300 hover:text-white">
                  All Recipes
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <p className="text-gray-300 text-sm">
              Built with Next.js and powered by Cosmic CMS. 
              A modern platform for sharing culinary creativity.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 Cosmic Recipe Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}