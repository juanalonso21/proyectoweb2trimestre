import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductLista from "@/components/ListaProductos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IProduct from "@/model/interfaces/iProduct";
import ICategoria from "@/model/interfaces/iCategoria";
import { getProducts, getProductsByCategory, searchProducts } from "@/model/api/apiProducts";
import { getCategorias } from "@/model/api/apiCategorias";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchCategories();

      const params = new URLSearchParams(location.search);
      const searchTerm = params.get("search");

      if (searchTerm) {
        await fetchSearchResults(searchTerm);
      } else {
        await fetchProducts();
      }
      setIsLoading(false);
    };

    loadData();
  }, [location.search]);

  const fetchProducts = async (): Promise<void> => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar los productos", error);
      setProducts([]);
    }
  };

  const fetchProductsByCategory = async (categoryId: number): Promise<void> => {
    try {
      const data = await getProductsByCategory(categoryId);
      setProducts(data);
    } catch (error) {
      console.error(`Error al cargar los productos de la categoría ${categoryId}`, error);
      setProducts([]);
    }
  };

  const fetchCategories = async (): Promise<void> => {
    try {
      const data = await getCategorias();
      setCategories(data);
    } catch (error) {
      console.error("Error al cargar las categorías", error);
      setCategories([]);
    }
  };

  const fetchSearchResults = async (searchTerm: string) => {
    try {
      const results = await searchProducts(searchTerm);
      setProducts(results);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedCategoryName = e.target.value;
    setSelectedCategory(selectedCategoryName);

    if (selectedCategoryName === "") {
      fetchProducts();
    } else {
      const selectedCategory = categories.find(
        (category) => category.nombre === selectedCategoryName
      );
      if (selectedCategory) {
        fetchProductsByCategory(selectedCategory.id);
      }
    }
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const filteredProducts = [...products].sort((a, b) =>
    sortOrder === "asc" ? a.precio - b.precio : b.precio - a.precio
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Encabezado y controles */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nuestros Productos
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Descubre nuestra amplia selección
            </p>
          </div>

          {/* Filtros y ordenación */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Filtrar por categoría
                </label>
                <div className="relative">
                  <select
                    id="category"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.nombre}>
                        {category.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                  Ordenar por precio
                </label>
                <div className="relative">
                  <select
                    id="sort"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                    onChange={handleSortOrderChange}
                    value={sortOrder}
                  >
                    <option value="asc">Menor a Mayor</option>
                    <option value="desc">Mayor a Menor</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de productos */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <ProductLista products={filteredProducts} />
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron productos</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Intenta con otra categoría o término de búsqueda.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;