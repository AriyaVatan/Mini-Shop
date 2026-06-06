import type { Product } from "../types";

interface FilterBarProps {
  products: Product[];
  category: string;
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onClear: () => void;
}

export function FilterBar({
  products,
  category,
  minPrice,
  maxPrice,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
}: FilterBarProps) {
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="h-[58px] min-w-[180px] rounded-2xl border border-slate-800 bg-slate-900/50 px-4 text-slate-200 outline-none transition focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={minPrice}
        onChange={(e) => onMinPriceChange(e.target.value)}
        placeholder="Min $"
        className="h-[58px] w-full sm:w-28 rounded-2xl border border-slate-800 bg-slate-900/50 px-4 text-slate-200 outline-none transition focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
      />

      <input
        type="number"
        value={maxPrice}
        onChange={(e) => onMaxPriceChange(e.target.value)}
        placeholder="Max $"
        className="h-[58px] w-full sm:w-28 rounded-2xl border border-slate-800 bg-slate-900/50 px-4 text-slate-200 outline-none transition focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
      />

      <button
        onClick={onClear}
        className="h-[58px] rounded-2xl border border-slate-800 bg-slate-900/50 px-5 text-slate-300 transition hover:border-red-500 hover:text-red-400"
      >
        Reset
      </button>
    </div>
  );
}
