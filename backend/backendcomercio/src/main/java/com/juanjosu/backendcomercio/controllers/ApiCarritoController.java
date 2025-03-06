package com.juanjosu.backendcomercio.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.juanjosu.backendcomercio.model.Services.CarritoService;
import com.juanjosu.backendcomercio.model.Entities.Carrito;
@RestController
@RequestMapping("/api/carrito")
public class ApiCarritoController {
    @Autowired
    private CarritoService carritoService;


    @GetMapping("/")
    public List<Carrito> getCarritos() {
        List<Carrito> carrito = this.carritoService.getAll();
        return carrito;
    }
}
