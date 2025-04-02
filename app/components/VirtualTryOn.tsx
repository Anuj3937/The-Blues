"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Button3D from "./Button3D"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, ArrowLeftRight, ZoomIn, Camera } from "lucide-react"

const shirts = [
  {
    id: 1,
    name: "African Print Shirt",
    image:
      "https://images.squarespace-cdn.com/content/v1/5fb54df0f2b5d20cf1f5ba59/1637269742936-9KRSTTA1B8NPGP2OM9PX/CEK70.1+Kente+Kingdom.jpg",
  },
  {
    id: 2,
    name: "Classic Suit",
    image: "https://www.moderngentlemanmagazine.com/wp-content/uploads/2024/04/Classic-Suit-Clothing-Style-650x813.jpg",
  },
  {
    id: 3,
    name: "Casual Shirt",
    image: "https://www.westportbigandtall.com/cdn/shop/files/37541_WP_FH23_040_5000x.jpg",
  },
  {
    id: 4,
    name: "Formal Shirt",
    image: "https://frenchcrown.in/cdn/shop/files/779_5.jpg?v=1704862010&width=3500",
  },
]

export default function VirtualTryOn() {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [selectedShirt, setSelectedShirt] = useState(shirts[0])
  const [shirtPosition, setShirtPosition] = useState({ x: 0, y: 0 })
  const [shirtSize, setShirtSize] = useState(0.5)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isCameraActive) {
      startCamera()
    } else {
      stopCamera()
    }
  }, [isCameraActive])

  useEffect(() => {
    if (isCameraActive) {
      const intervalId = setInterval(drawOnCanvas, 1000 / 60) // 30 FPS
      return () => clearInterval(intervalId)
    }
  }, [isCameraActive, selectedShirt, shirtPosition, shirtSize])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      console.error("Error accessing the camera:", err)
      setIsCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive)
    setCapturedImage(null)
  }

  const drawOnCanvas = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Draw the selected shirt
        const shirtImg = new Image()
        shirtImg.src = selectedShirt.image
        shirtImg.onload = () => {
          const shirtWidth = canvas.width * shirtSize
          const shirtHeight = (shirtWidth / shirtImg.width) * shirtImg.height
          const shirtX = (canvas.width - shirtWidth) / 2 + shirtPosition.x
          const shirtY = canvas.height * 0.2 + shirtPosition.y

          ctx.globalAlpha = 0.7 // Set transparency
          ctx.drawImage(shirtImg, shirtX, shirtY, shirtWidth, shirtHeight)
          ctx.globalAlpha = 1 // Reset transparency
        }
      }
    }
  }

  const captureImage = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const imageDataUrl = canvas.toDataURL("image/jpeg")
      setCapturedImage(imageDataUrl)
    }
  }

  return (
    <div className="bg-primary/30 p-6 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-secondary">Virtual Try-On</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="mb-4">
            <Button3D onClick={toggleCamera} className="w-full mb-2">
              {isCameraActive ? "Stop Camera" : "Start Camera"}
            </Button3D>
          </div>
          <div className="relative aspect-video bg-gray-200 rounded-md overflow-hidden">
            {isCameraActive ? (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
              </>
            ) : capturedImage ? (
              <img src={capturedImage || "/placeholder.svg"} alt="Captured" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">Camera is off</div>
            )}
          </div>
          {isCameraActive && (
            <div className="mt-4">
              <Button3D onClick={captureImage} className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Capture Image
              </Button3D>
            </div>
          )}
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="shirt-size">Shirt Size</Label>
              <div className="flex items-center">
                <ZoomIn className="w-4 h-4 mr-2" />
                <Slider
                  id="shirt-size"
                  min={0.1}
                  max={1}
                  step={0.01}
                  value={[shirtSize]}
                  onValueChange={([value]) => setShirtSize(value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="shirt-x">Horizontal Position</Label>
              <div className="flex items-center">
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                <Input
                  id="shirt-x"
                  type="range"
                  min={-100}
                  max={100}
                  value={shirtPosition.x}
                  onChange={(e) => setShirtPosition((prev) => ({ ...prev, x: Number(e.target.value) }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="shirt-y">Vertical Position</Label>
              <div className="flex items-center">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <Input
                  id="shirt-y"
                  type="range"
                  min={-100}
                  max={100}
                  value={shirtPosition.y}
                  onChange={(e) => setShirtPosition((prev) => ({ ...prev, y: Number(e.target.value) }))}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-secondary">Select a Shirt</h3>
          <div className="grid grid-cols-2 gap-4">
            {shirts.map((shirt) => (
              <motion.div
                key={shirt.id}
                className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                  selectedShirt.id === shirt.id ? "border-accent" : "border-transparent"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedShirt(shirt)}
              >
                <img src={shirt.image || "/placeholder.svg"} alt={shirt.name} className="w-full h-40 object-cover" />
                <p className="text-center py-2 bg-primary/50 text-text">{shirt.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

