import { useForm } from "react-hook-form";
import { productSchema, type ProductFormValues } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductFormProps {
  initialData?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
}

const ProductForm = ({ initialData, onSubmit, onCancel }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ?? {
      title: "",
      category: "",
      price: 0,
      stock: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">
          Title
        </label>
        <input
          {...register("title")}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition focus:border-blue-500"
          placeholder="Enter product title"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">
          Category
        </label>
        <input
          {...register("category")}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition focus:border-blue-500"
          placeholder="Enter category"
        />
        {errors.category && (
          <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition focus:border-blue-500"
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-400">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Stock
          </label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition focus:border-blue-500"
            placeholder="0"
          />
          {errors.stock && (
            <p className="mt-1 text-xs text-red-400">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Product"
              : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
