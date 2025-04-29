'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Weather App
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded hover:bg-blue-700 ${pathname === '/' ? 'bg-blue-700' : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/favorites" 
              className={`px-3 py-2 rounded hover:bg-blue-700 ${pathname === '/favorites' ? 'bg-blue-700' : ''}`}
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}