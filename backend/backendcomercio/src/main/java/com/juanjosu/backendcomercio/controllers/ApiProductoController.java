package com.juanjosu.backendcomercio.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.juanjosu.backendcomercio.model.Services.ProductoService;
import com.juanjosu.backendcomercio.model.Entities.Producto;

@RestController
@RequestMapping("/api/producto")
public class ApiProductoController {
    @Autowired
    private ProductoService productoService;

    @GetMapping("/")
    public List<Producto> getProductos() {
        List<Producto> productos = this.productoService.getAll();
        return productos;
    }
}
