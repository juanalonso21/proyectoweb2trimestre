import React from "react";

const ProductListAdmin = ({ products, onEdit, onDelete }) => {
  return (
    <div className="container">
      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
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
                <td>
                  {product.imagenUrl && (
                    <img
                      src={`http://localhost:8090/img/${product.imagenUrl}`}
                      alt={product.nombre}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
                <td>
                  <button className="btn btn-primary" onClick={() => onEdit(product)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => onDelete(product.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListAdmin;