package com.juanjosu.backendcomercio.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.juanjosu.backendcomercio.model.Services.UsuarioService;
import com.juanjosu.backendcomercio.model.Entities.Usuario;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "http://localhost:5173") // Permitir tu frontend
public class ApiUsuarioController {

    private static final String UPLOAD_DIR = "assets/img/";

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/")
    public List<Usuario> getUsuarios() {
        return usuarioService.getAll();
    }

    @GetMapping("/{id}")
    public Usuario getUsuario(@PathVariable Integer id) {
        return usuarioService.getId(id);
    }

    @PostMapping("/create")
    public void createUsuario(@RequestParam("usuario") String usuarioJson, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Usuario usuario = objectMapper.readValue(usuarioJson, Usuario.class);
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
            usuario.setAvatarUrl(fileName);
        }
        usuarioService.create(usuario);
    }

    @PutMapping("/update/{id}")
    public void updateUsuario(@PathVariable Integer id, @RequestParam("usuario") String usuarioJson, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Usuario usuario = objectMapper.readValue(usuarioJson, Usuario.class);
        Usuario existingUsuario = usuarioService.getId(id);

        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
            usuario.setAvatarUrl(fileName);
        } else {
            // Si no se proporciona un nuevo archivo, mantener el nombre de la imagen existente
            usuario.setAvatarUrl(existingUsuario.getAvatarUrl());
        }

        // Asegúrate de que el ID del usuario se mantenga igual
        usuario.setId(id);

        usuarioService.update(id, usuario);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUsuario(@PathVariable Integer id) {
        Usuario usuario = usuarioService.getId(id);
        if (usuario != null && usuario.getAvatarUrl() != null) {
            Path filePath = Paths.get(UPLOAD_DIR, usuario.getAvatarUrl());
            try {
                Files.deleteIfExists(filePath);
                System.out.println("Imagen eliminada: " + filePath.toAbsolutePath().toString()); // Log para verificar la eliminación
            } catch (IOException e) {
                System.err.println("Error al eliminar la imagen: " + e.getMessage());
            }
        }
        usuarioService.delete(id);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        Usuario usuario = usuarioService.findByUsernameAndPassword(username, password);
        if (usuario != null) {
            return ResponseEntity.ok(Map.of("success", true, "user", usuario));
        } else {
            return ResponseEntity.ok(Map.of("success", false));
        }
    }
}