import Image from 'next/image'
import authorImage from '../../public/images/authors/sgcat.png'

export default function Intro() {
  return (
    <section className="mb-24 flex flex-col-reverse items-start gap-y-4 gap-x-10 md:flex-row md:items-center">
      <div className='flex-1'>
        <h1 className='mb-4 text-3xl font-bold'>Hey, I&#39;m Santiago</h1>
        <p className='mt-3 font-light text-muted-foreground'>
          As a curious and driven technologist, I&#39;m passionate about exploring the intersection of 
          machine learning, data science, data engineering and web development. I&#39;m constantly seeking new ways to apply 
          my skills to real-world problems, and I&#39;m excited to learn from others and share my own 
          experiences. With a keen eye for detail and a passion for collaboration, I&#39;m committed to 
          delivering high-quality solutions that drive impact. Whether it&#39;s building scalable web 
          applications, analyzing complex data sets, or exploring the latest advancements in AI, 
          I&#39;m always looking to push the boundaries of what&#39;s possible.

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
