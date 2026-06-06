import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductsCards = ({ product, onClick }: ProductCardProps) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/80 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 border border-blue-500/20">
            {product.category}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            #{product.id}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>

        <p className="mt-2 text-sm text-slate-400 line-clamp-2">
          Experience the quality and premium design of our {product.title}.
        </p>

        <div className="mt-auto pt-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-widest">
              Price
            </p>
            <span className="text-xl font-black text-emerald-400">
              ${product.price}
            </span>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-widest">
              Stock
            </p>
            <span
              className={`text-sm font-bold ${product.stock > 0 ? "text-slate-300" : "text-red-400"}`}
            >
              {product.stock > 0 ? `${product.stock} units` : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCards;
