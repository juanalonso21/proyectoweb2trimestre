import React, { useState, useEffect } from "react";
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from "@/model/api/apiCategorias";
import CategoriasListAdmin from "@/components/CategoriasListAdmin";
import Sidebar from "@/components/sidebaradmin";

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  icono?: string;
}

const CategoriasPageAdmin: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [icono, setIcono] = useState<File | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setIsLoading(true);
      const data = await getCategorias();
      setCategorias(
        Array.isArray(data)
          ? data.map((categoria) => ({
              ...categoria,
              icono: categoria.icono || "", // Ensure icono is always a string
            }))
          : []
      );
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      setError("Error al cargar las categorías");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) return;
    
    try {
      await deleteCategoria(id);
      fetchCategorias();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      setError("Error al eliminar la categoría");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
  
    if (icono) {
      formData.append("file", icono);
    }
  
    try {
      if (selectedCategoria) {
        await updateCategoria(selectedCategoria.id, formData);
      } else {
        await createCategoria(formData);
      }
      fetchCategorias();
      resetForm();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
      setError("Error al guardar la categoría");
    }
  };

  const resetForm = () => {
    setSelectedCategoria(null);
    setNombre("");
    setDescripcion("");
    setIcono(null);
    setShowForm(false);
  };

  const handleAddCategoria = () => {
    resetForm();
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Administración de Categorías</h2>
            <button 
              onClick={handleAddCategoria}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Añadir Categoría
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
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

          {showForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                {selectedCategoria ? "Editar Categoría" : "Nueva Categoría"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="icono" className="block text-sm font-medium text-gray-700 mb-1">
                      Icono
                    </label>
                    <input
                      type="file"
                      id="icono"
                      onChange={(e) => setIcono(e.target.files ? e.target.files[0] : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción *
                  </label>
                  <textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                    required
                  />
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {selectedCategoria ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <CategoriasListAdmin
              categorias={categorias.map((categoria) => ({
                ...categoria,
                icono: categoria.icono || "",
              }))}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default CategoriasPageAdmin;