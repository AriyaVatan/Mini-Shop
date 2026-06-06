import { useEffect, useState, type ReactNode } from "react";
import type { Product } from "../products/types";
import { CartContext, type CartItem } from "./types";
import toast from "react-hot-toast";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("mini-shop-cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("mini-shop-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    const isExist = items.find((item) => item.id === product.id);

    if (isExist) {
      if (isExist.quantity >= product.stock) {
        toast.error(`Sorry, only ${product.stock} items available.`);
        return;
      }
    } else {
      if (product.stock <= 0) {
        toast.error("This product is out of stock.");
        return;
      }
    }

    setItems((prev) => {
      const isAlreadyInCart = prev.find((item) => item.id === product.id);

      if (isAlreadyInCart) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success(`${product.title} added to cart!`);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    if (qty > item.quantity && qty > item.stock) {
      toast.error(`Maximum stock reached (${item.stock})`);
      return;
    }

    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i));
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        totalPrice,
        totalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
