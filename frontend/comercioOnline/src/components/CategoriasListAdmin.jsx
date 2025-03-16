import React from "react";

const CategoriasListAdmin = ({ categorias, onEdit, onDelete }) => {
  return (
    <div className="container">
      {categorias.length === 0 ? (
        <p>No hay categorías disponibles</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => onEdit(categoria)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => onDelete(categoria.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoriasListAdmin;