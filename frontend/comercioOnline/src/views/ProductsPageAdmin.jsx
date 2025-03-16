import React, { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/productsapi";
import ProductsList from "../components/ProductListAdmin";
import ProductForm from "../components/ProductForm";

const ProductsPageAdmin = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    imagenUrl: ""
  });
  const [showForm, setShowForm] = useState(false);

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

  const handleCreateOrUpdateProduct = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setNewProduct({
        nombre: "",
        descripcion: "",
        precio: 0,
        imagenUrl: ""
      });
      setEditingProduct(null);
      setShowForm(false);
      loadProducts();
    } catch (error) {
      console.error("Error al crear o actualizar el producto", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setNewProduct({
      nombre: "",
      descripcion: "",
      precio: 0,
      imagenUrl: ""
    });
    setShowForm(true);
  };

  return (
    <div className="container">
      <h2>Productos</h2>
      {showForm && (
        <div className="mb-4">
          <ProductForm
            product={newProduct}
            onChange={handleInputChange}
            onSubmit={handleCreateOrUpdateProduct}
            editingProduct={editingProduct}
          />
        </div>
      )}
      <ProductsList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} onAddProduct={handleAddProduct} />
    </div>
  );
};

export default ProductsPageAdmin;