import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  Ref,
  useState,
} from 'react';
import Button from '../Button';
import { useCart } from './CartContext';
// import { FaTrash } from 'react-icons/fa';

export interface CartModalRef {
  open: () => void;
}

export interface CartItem {
  id: string | number;
  name: string;
  price: number | string;
  quantity: number;
}

interface CartModalProps {}

interface UseCartReturn {
  items: CartItem[];
  updateItems: (item: CartItem, type: '+' | '-') => void;
}

function CartModal(props: CartModalProps, ref: Ref<CartModalRef>) {
  const dialog = useRef<HTMLDialogElement | null>(null);
  const { items, updateItems } = useCart() as UseCartReturn;
  const [formData, setFormData] = useState({name:"", email:"", city:"", items:[] })
  const totalPrice = items.reduce(
    (acc, item) => Number(item.price) * item.quantity + acc,
    0
  );
  const formattedTotalPrice = totalPrice.toFixed(2);

  const close = () => {
    dialog.current?.close();
    document.body.classList.remove('overflow-hidden');
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const filteredItems = items.map(item => ({
  id: item.id,
  name: item.name,
  price: item.price,
  quantity: item.quantity,
}));

const orderData = {
  ...formData,
  items: filteredItems,
};

  try {
    console.log("Order data to send:", orderData);
    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Order placed! Your order ID is ${data.orderId}`);
      setFormData({ name: '', email: '', city: '', items: [] }); // reset form
      close(); // optionally close the modal
    } else {
      alert(data.error || 'Failed to place order');
    }
  } catch (err) {
    console.error(err);
    alert('Error submitting order');
  }
};


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
   setFormData((prevFormData)=>({...prevFormData, [e.target.name]: e.target.value })) 
   console.log("input changed");
   
  }

  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current?.showModal();
      document.body.classList.add('overflow-hidden');
    },
  }));
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dialog.current && event.target === dialog.current) {
        close();
      }
    };

    const handleOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleOnEscape);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleOnEscape);
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className={`m-auto px-3 py-7 flex-col w-xl rounded-md bg-orange-100 z-40 transition overflow-hidden`}
    >
      <div className="font-semibold text-2xl">Your Cart</div>
      <div className='transition'>
          {items.length ? (
            items.map((item) => (
              <div key={item.id} className="flex justify-between mt-1.5">
                <p className="text-stone-600">
                  {`${item.name} - ${item.quantity} x $${item.price}`}
                </p>

                <div className="flex w-24 justify-around">
                  <div
                    className="icon-bg rounded-full px-2 text-white flex transition justify-center items-center w-6"
                    onClick={() => updateItems(item, '-')}
                  >
                    <div>-</div>
                  </div>
                  <div className="text-stone-600">{item.quantity}</div>
                  <div
                    className="icon-bg flex items-center w-6 justify-center rounded-full text-white transition"
                    onClick={() => updateItems(item, '+')}
                  >
                    +
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-xl">
              <p>Nothing in Cart!</p>
            </div>
          )}

          <div className="text-right font-semibold text-stone-700 mt-5 mb-5">
            ${formattedTotalPrice}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              className="text-stone-600 hover:bg-stone-300 hover:text-black px-4 py-2 rounded-md"
              onClick={close}
            >
              Close
            </Button>
            <Button className="bg-amber-400 text-stone-800 hover:bg-amber-500 transition py-2 px-6 rounded-md">
              Go to Checkout
            </Button>
          </div>
      </div>
      
      <div className=''>
        <h1>checkout</h1>
        <p>Total Amount {formattedTotalPrice}</p>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input type="text"  name='name' id="name" value={formData.name} className=' bg-white shadow-md outline-orange-300 p-1.5' onChange={handleInputChange}/>

          <label htmlFor="email">Email address</label>
          <input type="text" name='email' id="email" value={formData.email} className=' bg-white shadow-md outline-orange-300 p-1.5' onChange={handleInputChange}/>

          <label htmlFor="city">City</label>
          <input type="text" name='city' id="city" value={formData.city} className=' bg-white shadow-md outline-orange-300 p-1.5' onChange={handleInputChange}/>

          <button className='' type="submit">
            Submit
          </button>
        </form>
      </div>
    </dialog>
  );
}

CartModal.displayName = 'CartModal';
export default React.forwardRef<CartModalRef, CartModalProps>(CartModal);