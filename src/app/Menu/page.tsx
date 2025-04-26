import React from 'react';
import Image from 'next/image';

// Define the type for each menu item
interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description:string;
}

const Menu = async () => {
  const res = await fetch('http://localhost:3000/data/available-meals.json');
  const menu: MenuItem[] = await res.json(); // tell TypeScript that 'menu' is an array of MenuItem

  return (
    <div className='flex flex-wrap gap-4 px-7 justify-center mt-16 '>
      {menu.map((item) => (
      <div key={item.id} className='justify-between text-center flex flex-col object-cover shadow-xl  bg-stone-950 rounded-2xl w-80 h-[580px]'>
        <Image 
        className='w-full rounded-t-2xl'
        src={item.image}
        alt={item.name}
        width={500}
        height={500}
        />
        <div className='text-white text-2xl mt-6'>{item.name}</div>
        <div>
          <div className='inline-block hover:bg-amber-400/30 transition text-amber-400 bg-amber-400/20 py-1 px-6 rounded-md mt-2 '>${item.price}</div>
        </div>
        <div className='text-stone-400 text-md leading-5 px-2 mt-4'>{item.description}</div>
        <div>
          <button className='bg-amber-400 px-6 rounded-lg py-1 text-lg transition hover:bg-amber-500 mb-4'>Add to Cart</button>
        </div>
    </div>
      ))}
    </div>
  );
};

export default Menu;
