import React from "react";

const ProductForm = ({ product, onChange, onSubmit, editingProduct }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ target: { name: "imagenFile", value: file } }); // Guardamos el archivo en el estado
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("producto", JSON.stringify(product)); // Convertimos el producto a JSON

        if (product.imagenFile) {
          formData.append("file", product.imagenFile); // Adjuntar la imagen
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