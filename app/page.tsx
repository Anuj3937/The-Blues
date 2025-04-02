'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Button3D from './components/Button3D'
import RotatingProduct from './components/RotatingProduct'

const featuredProducts = [
  { id: 1, name: "African Print Shirt", image: "https://images.squarespace-cdn.com/content/v1/5fb54df0f2b5d20cf1f5ba59/1637269742936-9KRSTTA1B8NPGP2OM9PX/CEK70.1+Kente+Kingdom.jpg" },
  { id: 2, name: "Classic Suit", image: "https://www.moderngentlemanmagazine.com/wp-content/uploads/2024/04/Classic-Suit-Clothing-Style-650x813.jpg" },
  { id: 3, name: "Casual Shirt", image: "https://www.westportbigandtall.com/cdn/shop/files/37541_WP_FH23_040_5000x.jpg" },
]

export default function Home() {
  return (
    <div className="container mx-auto px-6">
      <section className="flex flex-col md:flex-row items-center justify-between py-12">
        <motion.div 
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-300">
            The Future of Fashion is Here
          </h1>
          <p className="text-xl mb-6">Experience cutting-edge style with The Blues. Our futuristic designs blend comfort and innovation.</p>
          <Button3D>
            <Link href="/products">Shop Now</Link>
          </Button3D>
        </motion.div>
        <div className="md:w-1/2 h-64 md:h-96">
          <RotatingProduct modelPath="/model/futuristic_jacket.glb" />
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-300">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id}
              className="bg-blue-800/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-blue-300 mb-4">Experience the comfort of the future</p>
                <Button3D>
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button3D>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-blue-900/30 backdrop-blur-sm rounded-lg my-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-300">Experience AR Try-On</h2>
          <p className="text-xl mb-6">See how our clothes look on you with our cutting-edge AR technology</p>
          <Button3D>
            <Link href="/virtual-try-on">Try Now</Link>
          </Button3D>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-300">Why Choose The Blues?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Innovative Designs", icon: "🎨" },
            { title: "Sustainable Materials", icon: "🌱" },
            { title: "Smart Technology", icon: "🔧" }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 bg-blue-800/30 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

