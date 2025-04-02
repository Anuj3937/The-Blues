"use client"

import CustomizeClothes from "../components/CustomizeClothes"

export default function CustomizePage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8 text-secondary">Customize Your Clothing</h1>
      <p className="text-lg mb-6 text-text">
        Design your own unique piece of clothing with our 3D customization tool. Upload your design, adjust its position
        and size, and see it come to life on our virtual cloth model.
      </p>
      <CustomizeClothes />
    </div>
  )
}

