package com.juanjosu.backendcomercio.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.juanjosu.backendcomercio.model.Services.CategoriaService;
import com.juanjosu.backendcomercio.model.Entities.Categoria;

@RestController
@RequestMapping("/api/categoria")
@CrossOrigin(origins = "http://localhost:5173") // Permitir tu frontend
public class ApiCategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/")
    public List<Categoria> getCategorias() {
        return categoriaService.getAll();
    }

    @GetMapping("/{id}")
    public Categoria getCategoria(@PathVariable Integer id) {
        return categoriaService.getId(id);
    }

    @PostMapping("/create")
    public void createCategoria(@RequestBody Categoria categoria) {
        categoriaService.create(categoria);
    }

    @PutMapping("/update/{id}")
    public void updateCategoria(@PathVariable Integer id, @RequestBody Categoria categoria) {
        categoriaService.update(id, categoria);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategoria(@PathVariable Integer id) {
        categoriaService.delete(id);
    }
}
