package com.juanjosu.backendcomercio.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.juanjosu.backendcomercio.model.Services.CarritoService;
import com.juanjosu.backendcomercio.model.Entities.Carrito;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*") // Permitir todos los orígenes
public class ApiCarritoController {

    @Autowired
    private CarritoService carritoService;

    @GetMapping("/")
    public List<Carrito> getCarritos() {
        return carritoService.getAll();
    }

    @GetMapping("/{id}")
    public Carrito getCarrito(@PathVariable Integer id) {
        return carritoService.getId(id);
    }

    @GetMapping("/user/{userId}")
    public Carrito getCarritoByUserId(@PathVariable Integer userId) {
        return carritoService.getCarritoByUserId(userId);
    }

    @PostMapping("/create")
    public void createCarrito(@RequestBody Carrito carrito) {
        carritoService.create(carrito);
    }

    @PutMapping("/update/{id}")
    public void updateCarrito(@PathVariable Integer id, @RequestBody Carrito carrito) {
        carritoService.update(id, carrito);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCarrito(@PathVariable Integer id) {
        carritoService.delete(id);
    }
}
