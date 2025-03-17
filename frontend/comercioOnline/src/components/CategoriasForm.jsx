import React, { useEffect, useState } from "react";
import { getCategorias } from "../api/categoriasapi";  // Asumiendo que tienes una API para obtener las categorías

const CategoriaForm = ({ categoria, onChange, onSubmit, editingCategoria }) => {
  const [categorias, setCategorias] = useState([]);  // Esta es la lista de categorías que podrías utilizar si fuera necesario

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ target: { name: "iconoFile", value: file } });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("categoria", JSON.stringify(categoria));
        if (categoria.iconoFile) {
          formData.append("file", categoria.iconoFile);
        }
        onSubmit(formData);
      }}
    >
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          placeholder="Nombre"
          value={categoria.nombre}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          placeholder="Descripción"
          value={categoria.descripcion}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Icono</label>
        <input
          type="file"
          className="form-control"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        {editingCategoria ? "Actualizar Categoría" : "Crear Categoría"}
      </button>
    </form>
  );
};

export default CategoriaForm;
