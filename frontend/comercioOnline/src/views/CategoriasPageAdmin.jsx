import React, { useState, useEffect } from "react";
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from "../api/categoriasapi";  // Importa las funciones desde el archivo categoriasapi.js
import CategoriasListAdmin from "../components/CategoriasListAdmin";
import Sidebar from "../components/sidebaradmin";

const CategoriasPageAdmin = () => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [icono, setIcono] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar las categorías al inicio
  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  // Editar categoría
  const handleEdit = (categoria) => {
    setSelectedCategoria(categoria);
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion);
    setShowForm(true);
  };

  // Eliminar categoría
  const handleDelete = async (id) => {
    try {
      await deleteCategoria(id);  // Usamos la API de eliminación
      fetchCategorias();  // Recargar categorías después de eliminar
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  // Manejar el envío del formulario (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoria", JSON.stringify({ nombre, descripcion }));
    if (icono) {
      formData.append("file", icono);
    }

    try {
      if (selectedCategoria) {
        // Actualizar categoría existente
        await updateCategoria(selectedCategoria.id, formData);
      } else {
        // Crear nueva categoría
        await createCategoria(formData);
      }
      fetchCategorias();
      setSelectedCategoria(null);
      setNombre("");
      setDescripcion("");
      setIcono(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };

  // Mostrar formulario para agregar nueva categoría
  const handleAddCategoria = () => {
    setSelectedCategoria(null);
    setNombre("");
    setDescripcion("");
    setIcono(null);
    setShowForm(true);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <h2>Administración de Categorías</h2>

        {/* Botón para mostrar el formulario de creación */}
        <button className="btn btn-success mb-3" onClick={handleAddCategoria}>
          Añadir Categoría
        </button>

        {/* Mostrar formulario de creación o edición de categoría */}
        {showForm && (
          <div className="mb-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="icono" className="form-label">Icono</label>
                <input
                  type="file"
                  className="form-control"
                  id="icono"
                  onChange={(e) => setIcono(e.target.files[0])}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {selectedCategoria ? "Actualizar" : "Crear"}
              </button>
            </form>
          </div>
        )}

        {/* Listar las categorías */}
        <CategoriasListAdmin
          categorias={categorias}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default CategoriasPageAdmin;
