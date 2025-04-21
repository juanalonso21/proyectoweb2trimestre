import React, { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/model/api/apiProducts";
import ProductsList from "../components/ProductsListAdmin";
import ProductForm from "../components/ProductForm";
import Sidebar from "../components/sidebaradmin";
import IProduct from "@/model/interfaces/iProduct";
import ICategoria from "@/model/interfaces/iCategoria";

const ProductsPageAdmin: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar los productos", error);
    }
  };

  const handleEdit = (product: IProduct) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (selectedProduct && selectedProduct.id !== 0) {
        // Actualizar producto existente
        await updateProduct(selectedProduct.id, formData);
      } else {
        // Crear nuevo producto
        await createProduct(formData);
      }
      loadProducts();
      resetForm();
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setShowForm(false);
  };

  const handleAddProduct = () => {
    setSelectedProduct({
      id: 0, // Indica que es un producto nuevo
      nombre: "",
      descripcion: "",
      precio: 0,
      categoria: null,
      imagenUrl: "",
      carrito: null,
      fechaCreacion: null,
      estado: "activo",
    });
    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: string | File | ICategoria | null } }
  ) => {
    if (selectedProduct) {
      const { name, value } = e.target;
      setSelectedProduct({
        ...selectedProduct,
        [name]: value instanceof Object && "id" in value ? value : value,
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Sidebar />
      <h2 className="text-2xl font-bold mb-4">Administración de Productos</h2>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
        onClick={handleAddProduct}
      >
        Añadir Producto
      </button>
      {showForm && (
        <div className="mb-6">
          <ProductForm
            product={selectedProduct!} // Siempre habrá un producto (nuevo o existente)
            onChange={handleChange}
            onSubmit={handleSubmit}
            editingProduct={!!selectedProduct && selectedProduct.id !== 0}
          />
        </div>
      )}
      <ProductsList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProductsPageAdmin;