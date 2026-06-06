import { useNavigate } from "react-router-dom";

interface ShopHeaderProps {
  token: string | null;
  totalItems: number;
  onOpenCart: () => void;
  onLogout: () => void;
}

const ShopHeader = ({
  token,
  totalItems,
  onOpenCart,
  onLogout,
}: ShopHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
          Mini<span className="text-blue-500">Shop</span>
        </h1>
        <p className="mt-2 text-slate-400">
          Discover premium products at the best prices.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onOpenCart}
          className="relative group flex items-center gap-2 rounded-xl bg-blue-500/10 px-5 py-2.5 text-sm font-bold text-blue-400 transition hover:bg-blue-500 hover:text-white"
        >
          <span className="text-lg">🛒</span>
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white shadow-lg transition-colors group-hover:bg-white group-hover:text-blue-600">
              {totalItems}
            </span>
          )}
        </button>

        {!token ? (
          <button
            onClick={() => navigate("/login")}
            className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            Admin Login
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/admin")}
              className="rounded-xl bg-emerald-500/10 px-5 py-2.5 text-sm font-bold text-emerald-400 transition hover:bg-emerald-500 hover:text-white"
            >
              Admin Panel
            </button>

            <button
              onClick={onLogout}
              className="rounded-xl bg-red-500/10 px-5 py-2.5 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopHeader;
