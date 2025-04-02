'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Button3DProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function Button3D({ children, onClick, className = '' }: Button3DProps) {
  return (
    <motion.button
      className={`relative px-6 py-3 group ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
      <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
      <span className="relative text-white transition duration-300 group-hover:text-purple-100">
        {children}
      </span>
    </motion.button>
  )
}

