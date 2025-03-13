package com.juanjosu.backendcomercio.model.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juanjosu.backendcomercio.model.Entities.Producto;
import com.juanjosu.backendcomercio.model.Repositories.ProductoRepository;

@Service
public class ProductoService {
    @Autowired
    ProductoRepository productoRep;

    public List<Producto> getAll() {
        return this.productoRep.findAll();
    }

    public void create(Producto producto){
        this.productoRep.save(producto);
    }

    public void delete (Integer id){
        this.productoRep.deleteById(id);
    }

    public Producto getId(Integer id){
        return this.productoRep.findById(id).orElse(null);
    }

    public void update(Integer id, Producto producto) {
        Optional<Producto> existingProducto = productoRep.findById(id);
        if (existingProducto.isPresent()) {
            Producto updatedProducto = existingProducto.get();
            updatedProducto.setNombre(producto.getNombre());
            updatedProducto.setDescripcion(producto.getDescripcion());
            updatedProducto.setPrecio(producto.getPrecio());
            // Actualiza otros campos según sea necesario
            productoRep.save(updatedProducto);
        }
    }
}