import Image from 'next/image';
import Container from "@/components/blog/container";

const ContactInfo = () => {
  return (
    <div className="flex justify-center items-center mt-40">
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image
          src="/images/authors/Sgiraldo.jpeg"
          alt="Contact Image"
          width={300}
          height={300}
          className="rounded-full"
        />
        <p className="text-center p-4 rounded-lg mt-10">
          Get in touch with me at: tiagogiraldo@gmail.com
        </p>
      </div>
    </div>
    </div>
  );
};

export default ContactInfo;

// flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12