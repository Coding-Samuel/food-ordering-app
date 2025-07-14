import React from 'react';
import Image from 'next/image';
const page = () => {
  return (
      <div className='animate-fade-up flex gap-2 w-full h-dvh py-6 md:justify-around items-center'>
        <div className='lg:w-1/2 w-full items-center flex flex-col md:items-center  justify-center'>
          <div className='flex flex-col  w-4/5 text-7xl md:text-8xl gap-2'>
            <p className='text-white'>Fast</p>
            <p className='text-amber-400'>Delivery</p>
          </div>
          <p className='text-stone-400 mt-8 w-4/5 text-justify leading-7  text-xl'>Our food ordering app delivers your meals with lightning speed! From the moment you place your order, we ensure quick processing and efficient delivery. Most orders arrive within 30 minutes, hot and fresh. We prioritize speed so you can enjoy your favorite dishes without the long wait.</p>
        </div>
        <div className='w-1/2 lg:flex hidden justify-center'>
          <div className='w-96 h-fit p-2 bg-gradient-to-t from-amber-400 to-amber-600 rounded-full'>
            <Image
            className='rounded-full object-cover'
            src={"/images/chicken-curry.jpg"}
            alt=''
            width={500}
            height={500}
            />
          </div>
        </div>
      </div>
  );
}
export default page;