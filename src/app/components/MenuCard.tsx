"use client";
import React from 'react'
import Image from 'next/image';
import Button from './Button';
import { useCart } from './Cart/CartContext';
interface MenuItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
  }
  
  interface MenuCardProps {
    item: MenuItem;
  }
// addToCart btn styles
const addToCartCss = 'bg-amber-400 px-6 rounded-lg py-1 text-lg transition hover:bg-amber-500 mb-4';

const MenuCard = ({item}:MenuCardProps) => {
   const {addToCart} = useCart();
  return (
    <div className='mt-16 animate-fade-up justify-between text-center flex flex-col object-cover shadow-xl  bg-stone-950 rounded-2xl w-80 h-[580px]'>
        <Image 
        className='w-full rounded-t-2xl'
        src={item.imageUrl}
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
          <Button className={addToCartCss} handleClick={()=>addToCart(item)}>Add To Cart</Button>
        </div>
    </div>
  )
}

export default MenuCard;