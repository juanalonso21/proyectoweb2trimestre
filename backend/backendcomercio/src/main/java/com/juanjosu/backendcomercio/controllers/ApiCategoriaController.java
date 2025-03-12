package com.juanjosu.backendcomercio.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.juanjosu.backendcomercio.model.Services.CategoriaService;
import com.juanjosu.backendcomercio.model.Entities.Categoria;
@RestController
@RequestMapping("/api/categoria")
public class ApiCategoriaController {
        @Autowired
    private CategoriaService categoriaService;


    @GetMapping("/")
    public List<Categoria> getCarritos() {
        List<Categoria> categoria = this.categoriaService.getAll();
        return categoria;
    }
}
