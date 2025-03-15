package com.juanjosu.backendcomercio.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.juanjosu.backendcomercio.model.Services.ProductoService;
import com.juanjosu.backendcomercio.model.Entities.Producto;

@RestController
@RequestMapping("/api/producto")
@CrossOrigin(origins = "http://localhost:5173") // Permitir tu frontend
public class ApiProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/")
    public List<Producto> getProductos() {
        return productoService.getAll();
    }

    @GetMapping("/{id}")
    public Producto getProducto(@PathVariable Integer id) {
        return productoService.getId(id);
    }

    @PostMapping("/create")
    public void createProducto(@RequestBody Producto producto) {
        productoService.create(producto);
    }

    @PutMapping("/update/{id}")
    public void updateProducto(@PathVariable Integer id, @RequestBody Producto producto) {
        productoService.update(id, producto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProducto(@PathVariable Integer id) {
        productoService.delete(id);
    }
}
