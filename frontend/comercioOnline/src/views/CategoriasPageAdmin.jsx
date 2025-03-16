import React, { useEffect, useState } from "react";
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from "../api/categoriasapi";
import CategoriasListAdmin from "../components/CategoriasListAdmin";
import Sidebar from "../components/sidebaradmin";

const CategoriasPageAdmin = () => {
  const [categorias, setCategorias] = useState([]);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [newCategoria, setNewCategoria] = useState({
    nombre: "",
  });
  const [showForm, setShowForm] = useState(false);

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

  const handleCreateOrUpdateCategoria = async (formData) => {
    try {
      if (editingCategoria) {
        await updateCategoria(editingCategoria.id, formData);
      } else {
        await createCategoria(formData);
      }
      setNewCategoria({
        nombre: "",
      });
      setEditingCategoria(null);
      setShowForm(false);
      loadCategorias();
    } catch (error) {
      console.error("Error al crear o actualizar la categoría", error);
    }
  };

  const handleEditCategoria = (categoria) => {
    setEditingCategoria(categoria);
    setNewCategoria(categoria);
    setShowForm(true);
  };

  const handleDeleteCategoria = async (id) => {
    try {
      await deleteCategoria(id);
      loadCategorias();
    } catch (error) {
      console.error("Error al eliminar la categoría", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoria({ ...newCategoria, [name]: value });
  };

  const handleAddCategoria = () => {
    setEditingCategoria(null);
    setNewCategoria({
      nombre: "",
    });
    setShowForm(true);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <h2>Categorías</h2>
        <button className="btn btn-success mb-3" onClick={handleAddCategoria}>
          Añadir Categoría
        </button>
        {showForm && (
          <div className="mb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateOrUpdateCategoria(newCategoria);
              }}
            >
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre"
                  value={newCategoria.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                {editingCategoria ? "Actualizar Categoría" : "Crear Categoría"}
              </button>
            </form>
          </div>
        )}
        <CategoriasListAdmin categorias={categorias} onEdit={handleEditCategoria} onDelete={handleDeleteCategoria} />
      </div>
    </div>
  );
};

export default CategoriasPageAdmin;