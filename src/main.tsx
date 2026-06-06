import React from "react";
import { createRoot } from "react-dom/client";
import { queryClient } from "./lib/react-query.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./features/cart/CartContext.tsx";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <App />
        <Toaster position="bottom-right" />
      </CartProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
