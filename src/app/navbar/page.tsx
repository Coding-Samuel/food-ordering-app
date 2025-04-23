import React from 'react'
import Image from 'next/image';
const NavBar = () => {
  return (
    <div className='navbar pt-4 flex w-full justify-around items-center'>
        <div className='flex items-center gap-3'>
            <Image className='rounded-3xl border-2 border-amber-300'
            src="/logo.jpg" 
            alt='icon' 
            width={50} 
            height={50} 
            priority
            />
            <h1 className='uppercase text-amber-300 tracking-widest  text-xl font-bold'>ReactFood</h1>
        </div>
        <div className='text-lg text-amber-300'>Cart(3)</div>
    </div>
  )
}

export default NavBar;