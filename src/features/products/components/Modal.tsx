import { useCart } from "../../cart";
import { type Product } from "../types";

interface ModalProps {
  product: Product;
  onClose: () => void;
}

export const Modal = ({ product, onClose }: ModalProps) => {
  const { addItem } = useCart();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60 transition-all">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-700">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <div className="inline-block rounded-2xl bg-slate-800 p-4 border border-slate-700 shadow-xl font-bold text-3xl text-blue-400">
              ${product.price}
            </div>
          </div>

          <h2 className="text-2xl font-black text-white">{product.title}</h2>
          <div className="mt-2 flex gap-2">
            <span className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-400 uppercase tracking-tighter font-bold">
              {product.category}
            </span>
            <span className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-400 uppercase tracking-tighter font-bold">
              ID: {product.id}
            </span>
          </div>

          <p className="mt-6 text-slate-400 leading-relaxed">
            Detailed information for {product.title}. This product has{" "}
            {product.stock} items left in inventory. You can add this to your
            cart and proceed to checkout.
          </p>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => {
                addItem(product);
                onClose();
              }}
              className="flex-1 rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-slate-800 py-3 font-bold text-white hover:bg-slate-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
