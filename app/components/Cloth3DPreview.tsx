"use client"

import type React from "react"
import { useRef, useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Cloth3DPreviewProps {
  clothColor: string
  designImage: string | null
  designPosition: { x: number; y: number }
  designScale: number
}

const views = [
  {
    name: "front",
    angle: 0,
    image:
      "https://sjc.microlink.io/qWreBsTXg9Tr6aelQOBb0AHhOiULxcZLRnbpYZpA7bDbN69hDGpxjFYyBCL3k-ZY2VkGT1h8VWUOWRBw7GN6cw.jpeg",
  },
  {
    name: "right-front",
    angle: 60,
    image:
      "https://img-new.cgtrader.com/items/4274308/a31f81b239/regular-basic-t-shirt-for-meta-3d-model-a31f81b239.jpg",
  },
  {
    name: "right-back",
    angle: 120,
    image:
      "https://img-new.cgtrader.com/items/4274308/454db71597/regular-basic-t-shirt-for-meta-3d-model-454db71597.jpg",
  },
  {
    name: "back",
    angle: 180,
    image:
      "https://img-new.cgtrader.com/items/4274308/00afdd3667/regular-basic-t-shirt-for-meta-3d-model-00afdd3667.jpg",
  },
  {
    name: "left-back",
    angle: 240,
    image:
      "https://img-new.cgtrader.com/items/4274308/d2e0911935/regular-basic-t-shirt-for-meta-3d-model-d2e0911935.jpg",
  },
  {
    name: "left-front",
    angle: 300,
    image:
      "https://img-new.cgtrader.com/items/4274308/a30888d89e/regular-basic-t-shirt-for-meta-3d-model-a30888d89e.jpg",
  },
]

const Cloth3DPreview: React.FC<Cloth3DPreviewProps> = ({ clothColor, designImage, designPosition, designScale }) => {
  const [currentAngle, setCurrentAngle] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const preloadImages = useMemo(() => {
    return views.map((view) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => resolve(view.image)
        img.onerror = reject
        img.src = view.image
      })
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    Promise.all(preloadImages)
      .then((loadedUrls) => {
        setLoadedImages(loadedUrls)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error preloading images:", error)
        setIsLoading(false)
      })
  }, [preloadImages])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    const sensitivity = 0.5 // Adjust this value to control rotation speed
    const newAngle = (currentAngle + deltaX * sensitivity) % 360

    setCurrentAngle(newAngle)
    setStartX(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const getCurrentView = () => {
    const normalizedAngle = ((currentAngle % 360) + 360) % 360
    return views.reduce((prev, curr) => {
      const prevDiff = Math.abs(((prev.angle - normalizedAngle + 180) % 360) - 180)
      const currDiff = Math.abs(((curr.angle - normalizedAngle + 180) % 360) - 180)
      return currDiff < prevDiff ? curr : prev
    })
  }

  const currentView = getCurrentView()

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <div className="text-lg">Loading preview...</div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full"
          >
            {/* Base T-shirt Image */}
            <Image
              src={currentView.image || "/placeholder.svg"}
              alt={`T-shirt ${currentView.name} view`}
              layout="fill"
              objectFit="contain"
              className="transition-opacity duration-300"
              style={{
                filter: `brightness(${clothColor === "#ffffff" ? 1 : 0.8}) opacity(0.99)`,
                backgroundColor: clothColor,
              }}
            />

            {/* Design Overlay */}
            {designImage && (
              <div
                className="absolute"
                style={{
                  left: `${50 + designPosition.x * 100}%`,
                  top: `${50 + designPosition.y * 100}%`,
                  transform: `translate(-50%, -50%) scale(${designScale})`,
                  width: "200px",
                  height: "200px",
                  backgroundImage: `url(${designImage})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  opacity: 0.85,
                  mixBlendMode: "multiply",
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rotation Instructions */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-600">
        Click and drag to rotate the t-shirt
      </div>
    </div>
  )
}

export default Cloth3DPreview

