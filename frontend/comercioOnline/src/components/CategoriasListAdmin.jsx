import React from "react";

const CategoriasListAdmin = ({ categorias, onEdit, onDelete }) => {
  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:8090/img/"
      : "http://192.168.7.38:8090/img/";

  // Asegúrate de que categorias siempre sea un array


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
              <th>Descripción</th>
              <th>Icono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{categoria.descripcion}</td>
                <td>
                  {categoria.icono && (
                    <img
                      src={`${baseURL}${categoria.icono}`}
                      alt={categoria.nombre}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => onEdit(categoria)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(categoria.id)}
                  >
                    Eliminar
                  </button>
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

