import React, { createContext, useState } from "react";
import { Product } from "../fetch-data/fetch-data";

// ==================== Types ========================

interface CartContextType {
  cartItems: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  deleteFromCart: (item: Product) => void;
}

export const CartContextValue = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  deleteFromCart: () => {},
});

interface AuthContextProps {
  children: React.ReactNode;
}

// ==================== Start Function ========================

const CartContext: React.FC<AuthContextProps> = ({ children }) => {
  const existingItemsString = localStorage.getItem("cartItems");
  const existingItems = existingItemsString ? JSON.parse(existingItemsString) : [];
  const [cartItems, setCartItems] = useState<Product[]>(existingItems);


  //======================= Add To Cart ===========================
  const addToCart = (item: Product) => {
    const alreadyItemsString = localStorage.getItem("cartItems");
    const alreadyItems = alreadyItemsString ? JSON.parse(alreadyItemsString) : [];
    setCartItems(alreadyItems)

    let productExit = false
    const updatedItems = alreadyItems.map((product:Product)=>{
      if(product.id === item.id){
        productExit = true
       return {...product , quantity:product.quantity + 1 }
      }
      return product;
    })

    if(!productExit){
      updatedItems.push({ ...item, quantity: 1 })
    }

    localStorage.setItem("cartItems",JSON.stringify(updatedItems));
    setCartItems(updatedItems)
  };


 //======================= Remove From Cart ===========================
  const removeFromCart = (item: Product) => {
    const alreadyItemsString = localStorage.getItem("cartItems");
    const alreadyItems = alreadyItemsString ? JSON.parse(alreadyItemsString) : [];
    setCartItems(alreadyItems)

  
    const updatedItems = alreadyItems.map((product:Product)=>{
      if(product.id === item.id){
        if(item.quantity > 1){
          return {...product , quantity:product.quantity - 1 }
        }
      }
      return product;
    })

    localStorage.setItem("cartItems",JSON.stringify(updatedItems));
    setCartItems(updatedItems)
  };


//======================= Delete From Cart ===========================
const deleteFromCart = (item: Product) => {
  const alreadyItemsString = localStorage.getItem("cartItems");
  const alreadyItems = alreadyItemsString ? JSON.parse(alreadyItemsString) : [];
 
  const updatedItems = alreadyItems.filter((product:Product)=>product.id !== item.id)
  localStorage.setItem("cartItems",JSON.stringify(updatedItems));
  setCartItems(updatedItems)
};



  return (
    <CartContextValue.Provider value={{ cartItems, addToCart , removeFromCart , deleteFromCart }}>
      {children}
    </CartContextValue.Provider>
  );
};

export default CartContext;
