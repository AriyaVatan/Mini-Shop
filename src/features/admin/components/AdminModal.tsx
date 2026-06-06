import type { ReactNode } from "react";

type AdminModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export function AdminModal({
  isOpen,
  title,
  onClose,
  children,
}: AdminModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="relative h-20 bg-gradient-to-r from-blue-600 to-indigo-700">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-black/20 px-3 py-1.5 text-sm text-white hover:bg-black/40 transition-colors"
          >
            ✕
          </button>
          {title && (
            <h2 className="absolute left-6 top-1/2 -translate-y-1/2 text-lg font-black text-white">
              {title}
            </h2>
          )}
        </div>

        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
