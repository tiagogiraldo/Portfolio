import Link from 'next/link'
import React from 'react'
import ThemeToggle from '@/components/theme-toggle'
import Image from 'next/image'

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6'>
      <nav className='container flex max-w-3xl items-center justify-between'>
        <div>
          <Link href='/' className='font-serif text-2x1 font-bold'>
            <Image src={'/images/logo/sg.png'} alt={'SG'}
              height={34}
              width={34}
            />
          </Link>
        </div>
        <ul className='flex items-center gap-6 text-sm font-light text-muted-foreground'>
          <li className='transition-colors hover:text-foreground'>
            <Link href='/posts'>Posts</Link>
          </li>
          <li className='transition-colors hover:text-foreground'>
            <Link href='/projects'>Projects</Link>
          </li>
          <li className='transition-colors hover:text-foreground'>
            <Link href='/snipets'>Snipets</Link>
          </li>          
          <li className='transition-colors hover:text-foreground'>
            <Link href='/contact'>Contact</Link>
          </li>                    
        </ul>
        <div>
          <ThemeToggle/>
        </div>
      </nav>
    </header>
  )
}
