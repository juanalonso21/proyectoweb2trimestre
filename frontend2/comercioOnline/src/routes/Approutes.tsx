import { Routes, Route } from "react-router-dom";
import ProductsPage from "@/views/ProductsPage";
import ProductsPageAdmin from "@/views/ProductsPageAdmin";
import CategoriesPageAdmin from "@/views/CategoriasPageAdmin";
import UsersPage from "@/views/UserPage";
// Removed duplicate import of CartPage
import Login from "@/views/Login";
import SingIn from "@/views/SingIn";
import ProtectedRoute from "@/components/ProtectedRoute";
import Admin from "@/views/Admin/Admin";
import DetalleProducto from "@/views/DetalleProducto";
import CartPage from "@/views/CartPage";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Página principal de productos */}
      <Route path="/" element={<ProductsPage />} />
      
      {/* Página de búsqueda de productos */}
      <Route path="/productos" element={<ProductsPage />} />
      
      {/* Detalle de un producto */}
      <Route path="/producto/:id" element={<DetalleProducto />} />
      <Route path="/cart" element={<CartPage />} />
      {/* Rutas de administración */}
      <Route path="/admin/productos" element={<ProductsPageAdmin />} />
      <Route path="/admin/categorias" element={<CategoriesPageAdmin />} />
      <Route path="/admin/usuarios" element={<UsersPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      
      {/* Página del carrito */}
      <Route path="/cart" element={<CartPage />} />
      
      {/* Autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/singin" element={<SingIn />} />
    </Routes>
  );
};

export default AppRoutes;