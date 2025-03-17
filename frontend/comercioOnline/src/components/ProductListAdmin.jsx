import React from "react";

const ProductListAdmin = ({ products, onEdit, onDelete }) => {
  const baseURL = window.location.hostname === 'localhost' 
    ? "http://localhost:8090/img/" 
    : "http://192.168.0.23:8090/img/";

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
  <div className="table-responsive">
    {products.length === 0 ? (
      <p>No hay productos disponibles</p>
    ) : (
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nombre}</td>
              <td>{product.descripcion}</td>
              <td>{product.precio}</td>
              <td>{product.categoria ? product.categoria.nombre : "Sin categoría"}</td>
              <td>
                {product.imagenUrl && (
                  <img
                    src={`${baseURL}${product.imagenUrl}`}
                    alt={product.nombre}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => onEdit(product)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>

  );
};

export default ProductListAdmin;