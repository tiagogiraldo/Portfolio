import Image from 'next/image';

const ContactInfo = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <Image
          src="/images/authors/Sgiraldo.jpeg"
          alt="Contact Image"
          width={100}
          height={100}
          className="rounded-full absolute top-0 left-0"
        />
        <p className="text-center p-4 rounded-lg shadow-md">
          Get in touch with me at tiagogiraldo@gmail.com
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
