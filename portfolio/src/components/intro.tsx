import Image from 'next/image'
import authorImage from '../../public/images/authors/sgcat.png'

export default function Intro() {
  return (
    <section className="mb-24 flex flex-col-reverse items-start gap-y-4 gap-x-10 md:flex-row md:items-center">
      <div className='flex-1'>
        <h1 className='mb-4 text-3xl font-bold'>Hey, I&#39;m Santiago</h1>
        <p className='mt-3 font-light text-muted-foreground'>
          I&#39;m passionate about Machine Learning and IA and sharing 
          knowledge with others.
        </p>
      </div>
      <div className='flex-1 relative'>
        <Image
          className='rounded-lg grayscale'
          src={authorImage}
          alt="Flying cat"
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  )
}
// import Image from 'next/image'
// import authorImage from '../../public/images/authors/sgcat.png'


// export default function Intro() {
//   return (
//     <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4'>
//         <div className='mt-2 flex-1 md:mt-0'>
//             <h1 className='title no-underline'>Hey, I&#39;m xxx</h1>
//             <p className='mt-3 font-light text-muted-foreground'>
//                 I&#39;m passionate about Machine Learning and IA and sharing 
//                 knowledge with others.
//             </p>
//         </div>
//         <div className='relative'>
//             <Image
//                 className='flex-1 rounded-lg grayscale'
//                 src={authorImage}
//                 alt="Flying cat"
//                 width={175}
//                 height={175}
//                 priority
//             />
//         </div>
//     </section>
//   )
// }
