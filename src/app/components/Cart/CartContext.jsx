"use client"
import { useReducer, createContext,useContext } from "react";

const CartContext = createContext(
    {
        items:[],
        addToCart:()=>{},
        updateItems:()=>{},
    }
);

export function useCart(){
    return useContext(CartContext);
}

function cartReducer(state, action){
    let updatedItems = [...state.items];
    if(action.type == "ADD"){
               const alreadyAdded = state.items.some((item) => item.id === action.item.id);
                if (alreadyAdded){
                    updatedItems = state.items.map((item)=>(
                        action.item.id === item.id?
                        {
                            ...item,
                            quantity: item.quantity + 1
                        }:item
                    ));
                }else{
                    updatedItems = [...state.items, action.item];
                }
            console.log(alreadyAdded);
            console.log(state);
        }
    else if(action.type === "UPDATE"){
        const signMap = {
            "+": 1,
            "-": -1
        }
        updatedItems = state.items.map((item)=>{
            if(action.item.id === item.id){
                return{
                    ...item,
                    quantity: item.quantity + signMap[action.sign]
                }   
            }else{
                return item;
            }
        }).filter(item => item.quantity >= 1 );
        
    }
        return (
            {
                items: updatedItems,
            }
        )
    }
    


export default function CartContextProvider({children}){
    const [cartState, cartDispatch] = useReducer(cartReducer, {items:[]});
    const handleAddToCart = (menuItem)=>{
        cartDispatch({type:"ADD",item:menuItem});
    }
    const handleUpdateItems = (menuItem, sign)=>{
        cartDispatch({
            type:"UPDATE", 
            item:menuItem,
            sign:sign
        });
    }
    // const handleRemoveItems
    const ctxValues ={
        addToCart:handleAddToCart,
        items:cartState.items,
        updateItems: handleUpdateItems
    }
    return <CartContext.Provider value={ctxValues}>
        {children}
    </CartContext.Provider>
}