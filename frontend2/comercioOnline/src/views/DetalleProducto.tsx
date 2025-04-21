import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IProduct from "@/model/interfaces/iProduct";
import { getProductById } from "@/model/api/apiProducts";
import { addToCart } from "@/model/api/apiCart";

const DetalleProducto: React.FC = () => {
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8090/img/"
      : "http://192.168.7.38:8090/img/";
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | null}>({message: '', type: null});

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const data = await getProductById(Number(id));
          setProduct(data);
          if (data.imagenUrl) {
            setSelectedImage(data.imagenUrl);
          }
        } catch (error) {
          console.error("Error al cargar los detalles del producto", error);
          setNotification({message: "Error al cargar el producto", type: 'error'});
          setTimeout(() => setNotification({message: '', type: null}), 3000);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setNotification({message: "Debes iniciar sesión para añadir productos al carrito", type: 'error'});
        setTimeout(() => setNotification({message: '', type: null}), 3000);
        return;
      }

      await addToCart(Number(userId), product.id, 1);
      setNotification({message: "¡Producto añadido al carrito!", type: 'success'});
      setTimeout(() => setNotification({message: '', type: null}), 3000);
    } catch (error) {
      console.error("Error al añadir el producto al carrito", error);
      setNotification({message: "Hubo un error al añadir el producto al carrito", type: 'error'});
      setTimeout(() => setNotification({message: '', type: null}), 3000);
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Cargando detalles del producto...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Producto no encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">El producto solicitado no está disponible.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        {/* Notificación */}
        {notification.type && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
                  Inicio
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <a href="/products" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2">
                    Productos
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{product.nombre}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Product Detail */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Gallery */}
              <div className="space-y-4">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={`${baseURL}${selectedImage}`}
                    alt={product.nombre}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                {/* Thumbnails */}
                {product.imagenUrl && (
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setSelectedImage(product.imagenUrl)}
                      className={`rounded-md overflow-hidden ${selectedImage === product.imagenUrl ? 'ring-2 ring-indigo-500' : ''}`}
                    >
                      <img
                        src={`${baseURL}${product.imagenUrl}`}
                        alt={product.nombre}
                        className="h-20 w-full object-cover object-center"
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.nombre}</h1>

                <div className="mt-4">
                  <h2 className="sr-only">Información del producto</h2>
                  <p className="text-2xl tracking-tight text-gray-900">${product.precio.toFixed(2)}</p>

                  <div className="mt-4 space-y-6">
                    <p className="text-base text-gray-600">{product.descripcion}</p>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">Categoría</h3>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {product.categoria?.nombre || "Sin categoría"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      className={`flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isAdding ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Añadiendo...
                        </>
                      ) : (
                        'Añadir al carrito'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetalleProducto;