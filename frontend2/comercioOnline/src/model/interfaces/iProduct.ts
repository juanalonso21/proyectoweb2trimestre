import ICategoria from "./iCategoria";

export default interface IProduct {
    id:            number;
    nombre:        string;
    descripcion:   string;
    precio:        number;
    carrito:       null;
    categoria:     ICategoria | null;
    imagenUrl:     string;
    fechaCreacion: null;
    estado:        string;
}