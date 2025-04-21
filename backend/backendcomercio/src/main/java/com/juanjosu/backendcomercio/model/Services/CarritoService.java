package com.juanjosu.backendcomercio.model.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juanjosu.backendcomercio.model.Entities.Carrito;
import com.juanjosu.backendcomercio.model.Repositories.CarritoRepository;

@Service
public class CarritoService {
    @Autowired
    private CarritoRepository carritoRepository;

    public List<Carrito> getAll() {
        return this.carritoRepository.findAll();
    }

    public void create(Carrito carrito){
        this.carritoRepository.save(carrito);
    }

    public void delete (Integer id){
        this.carritoRepository.deleteById(id);
    }

    public Carrito getId(Integer id){
        return this.carritoRepository.findById(id).orElse(null);
    }

    public void update(Integer id, Carrito carrito) {
        Optional<Carrito> existingCarrito = carritoRepository.findById(id);
        if (existingCarrito.isPresent()) {
            Carrito updatedCarrito = existingCarrito.get();
            updatedCarrito.setUsuario(carrito.getUsuario());
            updatedCarrito.setProductos(carrito.getProductos());
            updatedCarrito.setCantidad(carrito.getCantidad());
            // Actualiza otros campos según sea necesario
            carritoRepository.save(updatedCarrito);
        }
    }

    public Carrito getCarritoByUserId(Integer userId) {
        return carritoRepository.findByUsuarioId(userId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado para el usuario con ID: " + userId));
    }
}