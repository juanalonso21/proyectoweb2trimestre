import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IProduct from "@/model/interfaces/iProduct";
import { getCartByUserId } from "@/model/api/apiCart";
import ICartItem from "@/model/interfaces/iCartItem";

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<ICartItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId") || "0", 10) : null;

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setError("Debes iniciar sesión para ver tu carrito");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const cartData = await getCartByUserId(userId);
        setCart(cartData);
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
        setError("Error al cargar el carrito");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const calculateTotal = (): number => {
    if (!cart) return 0;
    
    return cart.reduce((total, item) => {
      return total + item.productos.reduce((sum, product) => sum + product.precio, 0);
    }, 0);
  };

  const handleRemoveItem = (productId: number) => {
    if (cart) {
      setCart(cart.filter((item) => item.id !== productId));
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-6 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!userId) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Acceso requerido</h3>
            <p className="mt-1 text-sm text-gray-500">Debes iniciar sesión para ver tu carrito</p>
            <a 
              href="/login" 
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Iniciar sesión
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Carrito de Compras</h1>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {cart && cart.length > 0 ? (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.productos.map((product: IProduct) => product.nombre).join(", ")}
                    </h3>
                    <p className="text-gray-500">${item.productos.reduce((sum, product) => sum + product.precio, 0).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="px-4 py-5 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Total</h3>
                <p className="text-xl font-bold text-gray-900">${calculateTotal().toFixed(2)}</p>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                Finalizar Compra
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Tu carrito está vacío</h3>
            <p className="mt-1 text-sm text-gray-500">Agrega algunos productos para comenzar</p>
            <a 
              href="/products" 
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Explorar productos
            </a>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;