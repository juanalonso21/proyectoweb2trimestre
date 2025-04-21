import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { getCategorias } from "@/model/api/apiCategorias";
import  ICategoria  from "../model/interfaces/iCategoria";



interface CategoriaFormProps {
  categoria: ICategoria;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (formData: FormData) => void;
  editingCategoria: boolean;
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({
  categoria,
  onChange,
  onSubmit,
  editingCategoria,
}) => {
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
      // Simulamos un evento change para mantener consistencia
      const customEvent = {
        target: {
          name: "iconoFile",
          value: file,
        },
      } as unknown as ChangeEvent<HTMLInputElement>;
      onChange(customEvent);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoria", JSON.stringify(categoria));
    if (categoria.icono) {
      formData.append("file", categoria.icono);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="nombre"
          placeholder="Nombre"
          value={categoria.nombre}
          onChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="descripcion"
          placeholder="Descripción"
          value={categoria.descripcion}
          onChange={onChange}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Icono</label>
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
        {editingCategoria ? "Actualizar Categoría" : "Crear Categoría"}
      </button>
    </form>
  );
};

export default CategoriaForm;