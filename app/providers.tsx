'use client'

import { createContext, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { TooltipProvider } from '@/components/ui/base-tooltip'
import { ThemeProvider } from '@/providers/theme'

function usePrevious<T>(value: T) {
  const ref = useRef<T>(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}


export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        >
        <TooltipProvider>
          {children}
        </TooltipProvider>
        </ThemeProvider>
    </AppContext.Provider>
  )
}
