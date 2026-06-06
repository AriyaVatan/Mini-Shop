import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import ShopPage from "../pages/Shop/ShopPage";
import AdminPage from "../pages/Admin/AdminPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/shop" replace />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/shop" replace />,
  },
]);
