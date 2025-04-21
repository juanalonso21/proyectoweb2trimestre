import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { getCategorias } from "@/model/api/apiCategorias";
import  ICategoria  from "@/model/interfaces/iCategoria";
import  IProduct  from "@/model/interfaces/iProduct";

interface ProductFormProps {
  product: IProduct;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: string| File | ICategoria | null} }
  ) => void;
  onSubmit: (formData: FormData) => void;
  editingProduct: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onChange, onSubmit, editingProduct }) => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar las categorías", error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({
        target: {
          name: "imagenFile",
          value: file,
        },
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("producto", JSON.stringify(product));
    if (product.imagenUrl) {
      formData.append("file", product.imagenUrl);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="nombre"
          placeholder="Nombre"
          value={product.nombre}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="descripcion"
          placeholder="Descripción"
          value={product.descripcion}
          onChange={onChange}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Precio</label>
        <input
          type="number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="precio"
          placeholder="Precio"
          value={product.precio}
          onChange={onChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="categoria"
          value={product.categoria ? product.categoria.id : ""}
          onChange={(e) => {
            const selectedCat = categorias.find(cat => cat.id === parseInt(e.target.value));
            onChange({
              target: {
                name: "categoria",
                value: selectedCat || null, // Asegura que sea null si no se encuentra
              },
            });
          }}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Imagen</label>
        <input
          type="file"
          className="w-full px-3 py-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {editingProduct ? "Actualizar Producto" : "Crear Producto"}
      </button>
    </form>
  );
};

export default ProductForm;