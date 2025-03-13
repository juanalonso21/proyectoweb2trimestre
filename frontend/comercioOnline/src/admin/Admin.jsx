import { useEffect, useState } from "react";

function Admin() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  // Cargar productos desde el backend
  useEffect(() => {
    fetch("http://localhost:8090/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  // Agregar un nuevo producto
  const agregarProducto = () => {
    fetch("http://localhost:8090/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio }),
    })
      .then(res => res.json())
      .then(data => setProductos([...productos, data])); // Actualizar lista
  };

  // Eliminar un producto
  const eliminarProducto = (id) => {
    fetch(`http://localhost:8090/api/productos/${id}`, { method: "DELETE" })
      .then(() => setProductos(productos.filter(p => p._id !== id))); // Actualizar lista
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="Precio" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      <button onClick={agregarProducto}>Agregar Producto</button>

      <ul>
        {productos.map((p) => (
          <li key={p._id}>
            {p.nombre} - ${p.precio}
            <button onClick={() => eliminarProducto(p._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
