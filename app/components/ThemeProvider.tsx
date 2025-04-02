'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { createContext, useContext, useEffect, useState } from 'react'

const ColorSchemeContext = createContext({ colorScheme: 'light', toggleColorScheme: () => {} })

export const useColorScheme = () => useContext(ColorSchemeContext)

export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState('light')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light-blue', 'dark-blue')
    root.classList.add(colorScheme === 'light' ? 'light-blue' : 'dark-blue')
  }, [colorScheme])

  const toggleColorScheme = () => {
    setColorScheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ColorSchemeContext.Provider>
  )
}

