import React, { useEffect, useState } from "react";
import { getCategorias } from "../api/categoriasapi";

const ProductForm = ({ product, onChange, onSubmit, editingProduct }) => {
  const [categorias, setCategorias] = useState([]);

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
      onChange({ target: { name: "imagenFile", value: file } });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("producto", JSON.stringify(product));
        if (product.imagenFile) {
          formData.append("file", product.imagenFile);
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
          value={product.nombre}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <textarea
          className="form-control"
          name="descripcion"
          placeholder="Descripción"
          value={product.descripcion}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Precio</label>
        <input
          type="number"
          className="form-control"
          name="precio"
          placeholder="Precio"
          value={product.precio}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label>Categoría</label>
        <select
          className="form-control"
          name="categoria"
          value={product.categoria ? product.categoria.id : ""}
          onChange={(e) =>
            onChange({
              target: {
                name: "categoria",
                value: categorias.find((cat) => cat.id === parseInt(e.target.value)),
              },
            })
          }
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Imagen</label>
        <input type="file" className="form-control" onChange={handleImageChange} />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        {editingProduct ? "Actualizar Producto" : "Crear Producto"}
      </button>
    </form>
  );
};

export default ProductForm;