"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import AdvancedSearch from "../components/AdvancedSearch"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  size: string
}

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Neon Pulse Jacket",
    price: 4999,
    image: "/images/neon-pulse-jacket.jpg",
    category: "Jackets",
    size: "M",
  },
  {
    id: 2,
    name: "Quantum Shift Pants",
    price: 3499,
    image: "/images/quantum-shift-pants.jpg",
    category: "Pants",
    size: "L",
  },
  {
    id: 3,
    name: "Holographic Horizon Shirt",
    price: 2999,
    image: "/images/holographic-horizon-shirt.jpg",
    category: "Shirts",
    size: "S",
  },
  {
    id: 4,
    name: "Cybernetic Synth Boots",
    price: 5999,
    image: "/images/cybernetic-synth-boots.jpg",
    category: "Accessories",
    size: "XL",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    const q = searchParams.get("q")
    const categories = searchParams.get("categories")?.split(",")
    const sizes = searchParams.get("sizes")?.split(",")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    setFilteredProducts(
      dummyProducts.filter((product) => {
        if (q && !product.name.toLowerCase().includes(q.toLowerCase())) return false
        if (categories && !categories.includes(product.category)) return false
        if (sizes && !sizes.includes(product.size)) return false
        if (minPrice && product.price < Number.parseInt(minPrice)) return false
        if (maxPrice && product.price > Number.parseInt(maxPrice)) return false
        return true
      }),
    )
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-secondary">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <AdvancedSearch />
        </div>
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No products found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  )
}

