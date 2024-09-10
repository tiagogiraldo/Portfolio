import { JSX, SVGProps } from "react"
const navigation: any[] =[
    {
        name:'Linkedin',
        href:'#',
        icon:(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>)=>{
            <svg fill="currentColor" viewBox="0 0 448 512" {...props}>
                <path fill="currentColor"
                d='M100.28'
                ></path>
            </svg>
        },
    },
    {
        name:'Github',
        href:'#',
        icon:(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>)=>{
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path fill="currentColor"
                d='M100.28'
                ></path>
            </svg>
        },
    },
]

export default function Footer() {
  return (
    <footer className="py-8">
        <div className="container max-w-3xl">
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex justify-center space-x-6 md:order-2">
                    {navigation.map(item => (
                        <a
                            key={item.name}
                            href={item.href}
                            target='_blank'
                            rel='noreferrer noopener'
                            className="text-muted-foregroub hover: text-foreground"
                        >
                            <span className="sr-only">{item.name}</span>
                            <item.icon aria-hidden='true' className='h-5 w-5'/>
                        </a>
                    ))}
                </div>
                <div className="mt-8 md:order-1 md:md-0">
                    <p className="text-center text-xs leading-5 text-muted-foreground">
                        &copy; {new Date().getFullYear()} Santiago Giraldo.  All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </footer>
  )
}
