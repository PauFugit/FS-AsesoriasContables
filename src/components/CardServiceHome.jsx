import Image from 'next/image';
import Link from 'next/link';

const CardServiceHome = ({ imageSrc, title }) => {
  return (
    <Link href="/servicios" >
    <div className="bg-custom-green rounded-2xl shadow-md py-4 flex flex-col items-center">
     
      <div className="mb-3 w-full h-60 relative">
        
        <Image 
          src={imageSrc} 
          alt={title} 
          fill
          objectFit="cover" 
          className="rounded-xl" 
        ></Image>
      </div>
      <div className="w-full text-left px-4">
        <h3 className="text-2xl font-bold ">{title}</h3>
      </div>
      
    </div>
    </Link>
  );
};

export default CardServiceHome;