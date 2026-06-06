import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Product } from "../../features/products/types";

import { useCart } from "../../features/cart";

import ShopHeader from "../../features/products/components/ShopHeader";
import SearchBar from "../../features/products/components/SearchBar";
import ProductsCards from "../../features/products/components/ProductsCards";
import CartDrawer from "../../features/products/components/CartDrawer";
import { Modal } from "../../features/products/components/Modal";
import { FilterBar } from "../../features/products/components/FilterPanel";

import {
  usePaginatedProducts,
  useFilteredProducts,
} from "../../features/products/hooks";

const ShopPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { totalItems } = useCart();

  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  const [page, setPage] = useState(1);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setActiveQuery(query);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const paginatedResult = usePaginatedProducts(page);

  const filteredResult = useFilteredProducts({
    search: activeQuery,
    category,
    minPrice,
    maxPrice,
  });

  const isFiltering = !!activeQuery || !!category || !!minPrice || !!maxPrice;

  const activeHook = isFiltering ? filteredResult : paginatedResult;

  const data = isFiltering ? filteredResult.data : paginatedResult.data?.data;

  const isLoading = activeHook.isLoading;

  const productsForCategories = paginatedResult.data?.data ?? [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/shop");
  };

  const handleClearFilters = () => {
    setQuery("");
    setActiveQuery("");

    setCategory("");
    setMinPrice("");
    setMaxPrice("");

    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-100 font-sans selection:bg-blue-500/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <ShopHeader
          token={token}
          totalItems={totalItems}
          onOpenCart={() => setIsCartOpen(true)}
          onLogout={handleLogout}
        />

        {/* Search + Filters */}
        <div className="mb-12 flex flex-col gap-4 xl:flex-row xl:items-start">
          <div className="min-w-0 flex-1">
            <SearchBar value={query} onChange={setQuery} />
          </div>

          <FilterBar
            products={productsForCategories}
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryChange={setCategory}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onClear={handleClearFilters}
          />
        </div>

        {/* Products */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data && data.length > 0 ? (
              data.map((product: Product) => (
                <ProductsCards
                  key={product.id}
                  product={product}
                  onClick={setSelectedProduct}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-xl text-slate-500 italic">
                  No products found.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!isFiltering && paginatedResult.data && (
          <div className="mt-16 flex items-center justify-center gap-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:border-blue-500 disabled:opacity-20"
            >
              ←
            </button>

            <div className="flex h-12 items-center rounded-xl border border-slate-800 bg-slate-900 px-6 font-mono font-bold text-blue-400">
              Page {page}
            </div>

            <button
              disabled={page * 5 >= paginatedResult.data.total}
              onClick={() => setPage((p) => p + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:border-blue-500 disabled:opacity-20"
            >
              →
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default ShopPage;
