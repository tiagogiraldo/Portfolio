"use client"
import { ThemeProvider, useTheme } from 'next-themes'


export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        {children}
    </ThemeProvider>
  )
}
