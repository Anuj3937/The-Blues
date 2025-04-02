'use client'

import ProductCard from '../components/ProductCard'

const products = [
  { id: 1, name: "African Print Shirt", price: 4999, image: "https://images.squarespace-cdn.com/content/v1/5fb54df0f2b5d20cf1f5ba59/1637269742936-9KRSTTA1B8NPGP2OM9PX/CEK70.1+Kente+Kingdom.jpg" },
  { id: 2, name: "Classic Suit", price: 14999, image: "https://www.moderngentlemanmagazine.com/wp-content/uploads/2024/04/Classic-Suit-Clothing-Style-650x813.jpg" },
  { id: 3, name: "Casual Shirt", price: 2999, image: "https://www.westportbigandtall.com/cdn/shop/files/37541_WP_FH23_040_5000x.jpg" },
  { id: 4, name: "Formal Shirt", price: 3999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9fRpF5HWGUUyUJ5HeQ0uOWk0k8dfQaA0y5g&s" },
  { id: 5, name: "Stylish Jacket", price: 7999, image: "https://vmagazine.com/wp-content/uploads/2022/08/LIGHT-SHIRT.jpeg" },
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-300">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

