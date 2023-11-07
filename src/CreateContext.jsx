import { createContext, useState } from "react";
import { prodArray } from "./productArray";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  getTotalCost: () => {},
});
export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }
  function addToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      // product not in cart
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          //put all the diff properties of product in here if id is equal
        )
      );
    }
  }

  const contextValue = {
    items: [],
    getProductQuantity,
    addToCart,
    removeFromCart,
    getTotalCost,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
