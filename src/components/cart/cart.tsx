import { useContext } from "react";
import { CartContextValue } from "../cart-context/cart-context";
import "./cart.css";
import { Trash } from "lucide-react";

const Cart = () => {
  // ================= Context Api ===================
  const cartContextValue = useContext(CartContextValue);
  const { cartItems, addToCart, removeFromCart, deleteFromCart } =
    cartContextValue;
  const totalAmount = cartItems.reduce((acc, item) => {
    console.log(cartItems);
    return acc + item.price * item.quantity;
  }, 0);
  return (
    <div className="cart">



      { cartItems.length > 0 && 
      cartItems.map((item) => {
        // Extract the image URL from the nested structure
        const imageUrl = item.image?.asset?.url || "";



        return (
          <div key={item.id} className="items-container">
            <div className="cart-image">
              <img className="item-image" src={imageUrl} alt={item.title} />
            </div>
            <div className="cart-text">
              <h1 className="item-title">{item.title.slice(0, 20)}</h1>
              <p>Price: {item.price}</p>
              <p>
                Quantity:{" "}
                <button onClick={() => removeFromCart(item)}>-</button>{" "}
                {item.quantity}{" "}
                <button onClick={() => addToCart(item)}>+</button>
              </p>
              <p>Total: {item.quantity * item.price}</p>
              <div className="delete-item">
                <Trash onClick={() => deleteFromCart(item)} />
              </div>
            </div>
          </div>
        );
      })}

      {/* ============== Total Amount =============== */}
      <div className="total-amount">Total Amount = {totalAmount}</div>
    </div>
  );
};

export default Cart;
