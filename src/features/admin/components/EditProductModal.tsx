import { useForm } from "react-hook-form";
import type { Product } from "../../products/types";
import { productSchema, type ProductFormValues } from "../schema";
import { AdminModal } from "./AdminModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface EditProductProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, values: ProductFormValues) => Promise<void>;
  isUpdating?: boolean;
}

const EditProductModal = ({
  product,
  isOpen,
  onClose,
  onUpdate,
  isUpdating,
}: EditProductProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    {
      if (product && isOpen) {
        reset({
          title: product.title,
          category: product.category,
          price: product.price,
          stock: product.stock,
        });
      }
    }
  }, [product, isOpen, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    if (product) {
      await onUpdate(product.id, data);
      onClose();
    }
  };

  if (!product) return null;

  return (
    <AdminModal isOpen={isOpen} title="Edit Product" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title")}
            className="bg-slate-800 mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            {...register("category")}
            className="mt-1 block w-full border rounded-md p-2 shadow-sm bg-slate-800"
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="mt-1 block w-full border rounded-md p-2 shadow-sm bg-slate-800"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className="mt-1 block w-full border rounded-md p-2 shadow-sm bg-slate-800"
            />
            {errors.stock && (
              <p className="text-red-500 text-xs mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </AdminModal>
  );
};

export default EditProductModal;
