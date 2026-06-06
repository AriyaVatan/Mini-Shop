import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AdminProduct } from "../../features/admin/types";
import {
  useCreateAdminProduct,
  useUpdateAdminProduct,
} from "../../features/admin/hooks";
import { AdminModal } from "../../features/admin/components/AdminModal";
import ProductForm from "../../features/admin/components/ProductForm";
import type { ProductFormValues } from "../../features/admin/schema";
import {
  useAdminProducts,
  useDeleteAdminProduct,
} from "../../features/admin/hooks";
import type { Product } from "../../features/products/types";
import EditProductModal from "../../features/admin/components/EditProductModal";

const AdminPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const pageSize = 5;
  const { data: products = [], isLoading, isError, error } = useAdminProducts();
  const { mutate: deleteProduct, isPending: isDeleting } =
    useDeleteAdminProduct();
  const { mutateAsync: createProduct } = useCreateAdminProduct();
  const { mutateAsync: updateProduct } = useUpdateAdminProduct();

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }, [currentPage, products]);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    deleteProduct(id);
  };

  const getStatusStyle = (status: AdminProduct["status"]) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20";
      case "Out of Stock":
        return "bg-red-500/10 text-red-400 ring-1 ring-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1220] px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* Admin Modal */}
      <AdminModal
        isOpen={isAddOpen}
        title="Add New Product"
        onClose={() => setIsAddOpen(false)}
      >
        <ProductForm
          onCancel={() => setIsAddOpen(false)}
          onSubmit={async (values: ProductFormValues) => {
            await createProduct(values);
            setIsAddOpen(false);
          }}
        />
      </AdminModal>

      <EditProductModal
        isOpen={isEditOpen}
        product={selectedProduct}
        onClose={() => setIsEditOpen(false)}
        onUpdate={async (id: number, values: ProductFormValues) => {
          await updateProduct({ id, product: values });
          console.log({ id, values });
          setIsEditOpen(false);
        }}
      />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight md:text-4xl">
              Admin <span className="text-blue-500">Panel</span>
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage your products, prices, stock, and inventory.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/shop")}
              className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
            >
              Back to Shop
            </button>

            <button
              onClick={() => {
                setIsAddOpen(true);
              }}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              + Add New Product
            </button>
          </div>
        </div>

        {isLoading && (
          <p className="mb-4 text-sm text-slate-400">Loading products...</p>
        )}

        {isError && (
          <p className="mb-4 text-sm text-red-400">
            {error?.message ? `: ${error.message}` : ""}
          </p>
        )}

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
          <div className="border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="font-semibold text-white">
                  {paginatedProducts.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-white">
                  {products.length}
                </span>{" "}
                products
              </p>

              <p className="text-sm text-slate-400">
                Page{" "}
                <span className="font-semibold text-white">{currentPage}</span>{" "}
                of{" "}
                <span className="font-semibold text-white">{totalPages}</span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Stock</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {!isLoading && products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((product: AdminProduct) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">
                            {product.title}
                          </p>
                          <p className="text-sm text-slate-400">
                            ID: {product.id}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {product.category}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-200">
                        ${product.price.toFixed(2)}
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {product.stock}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            product.status,
                          )}`}
                        >
                          {product.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsEditOpen(true);
                            }}
                            className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500 hover:text-white"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={isDeleting}
                            className="rounded-lg bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
                      currentPage === num
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {num}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
