import { useState } from "react";
import { useCart } from "../../cart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsSuccess(true);
    clearCart();

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => {
          if (!isSuccess) onClose();
        }}
      />

      <div className="relative w-full max-w-md bg-[#0f172a] border-l border-slate-800 p-8 shadow-2xl flex flex-col">
        {isSuccess ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-4xl animate-bounce">
              ✅
            </div>
            <h2 className="text-3xl font-black text-white">Order Confirmed!</h2>
            <p className="mt-4 text-slate-400">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white">Your Cart</h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {items.length === 0 ? (
                <div className="text-slate-400 italic mt-10">
                  Your cart is currently empty.
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl mb-3 border border-slate-800"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {item.title}
                      </h4>
                      <p className="text-blue-400 text-xs">${item.price}</p>
                      <p className="text-[10px] text-slate-500">
                        In Stock: {item.stock}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 text-red-400 hover:bg-slate-700 rounded transition"
                      >
                        {" "}
                        -{" "}
                      </button>
                      <span className="text-sm font-mono text-white w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        className={`px-1 text-green-400 hover:bg-slate-700 rounded transition ${item.quantity >= item.stock ? "opacity-20 cursor-not-allowed" : ""}`}
                      >
                        {" "}
                        +{" "}
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 text-slate-500 text-xs hover:text-red-400"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-8 border-t border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400">Total:</span>
                <span className="text-2xl font-bold text-white">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
