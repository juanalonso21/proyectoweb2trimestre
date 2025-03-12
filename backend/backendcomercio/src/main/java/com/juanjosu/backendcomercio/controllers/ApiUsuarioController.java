package com.juanjosu.backendcomercio.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.juanjosu.backendcomercio.model.Services.UsuarioService;
import com.juanjosu.backendcomercio.model.Entities.Usuario;
@RestController
@RequestMapping("/api/usuario")
public class ApiUsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/")
    public List<Usuario> getUsuarios() {
        List<Usuario> usuarios = this.usuarioService.getAll();
        return usuarios;
    }
}