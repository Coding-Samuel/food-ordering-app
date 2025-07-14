import React from 'react';
import MenuCard from '../components/MenuCard';

// Define the type for each menu item
interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const Menu = async () => {
  const res = await fetch('http://localhost:5000/api/foods');
  const menu:MenuItem[] = await res.json(); // tell TypeScript that 'menu' is an array of MenuItem

  return (
    <div className='flex flex-wrap gap-4 px-7 justify-center mt-16 '>
      {menu.map((item) => (
        <MenuCard key={item.id} item={item}/>
      ))}
    </div>
  );
};

export default Menu;
