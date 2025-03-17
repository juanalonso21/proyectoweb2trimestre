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
import com.juanjosu.backendcomercio.model.Services.CategoriaService;
import com.juanjosu.backendcomercio.model.Entities.Categoria;


@RestController
@RequestMapping("/api/categoria")
@CrossOrigin(origins = "*") // Permitir todos los orígenes
public class ApiCategoriaController {
    private static final String UPLOAD_DIR = "assets/img/";
    @Autowired
    private CategoriaService categoriaService;

    @Autowired
    private ObjectMapper objectMapper;

    

    @GetMapping("/")
    public List<Categoria> getCategorias() {
        return categoriaService.getAll();
    }

    @GetMapping("/{id}")
    public Categoria getCategoria(@PathVariable Integer id) {
        return categoriaService.getId(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCategoria(@RequestParam("categoria") String categoriaJson, 
                                              @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Categoria categoria = objectMapper.readValue(categoriaJson, Categoria.class);
        
        // Verificar y guardar el archivo si se proporciona
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
            categoria.setIcono(fileName);
            System.out.println("Imagen guardada en: " + filePath.toAbsolutePath().toString());
        }
    
        // Crear la categoría en la base de datos
        categoriaService.create(categoria);
        return ResponseEntity.ok(Map.of("success", true)); // Devolver una respuesta de éxito
    }
    

    // Actualizar una categoría existente
    @PutMapping("/update/{id}")
    public void updateCategoria(@PathVariable Integer id, 
                                @RequestParam("categoria") String categoriaJson,
                                @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        // Parsear el JSON de la categoría
        Categoria categoria = objectMapper.readValue(categoriaJson, Categoria.class);

        // Obtener la categoría existente de la base de datos
        Categoria existingCategoria = categoriaService.getId(id);

        // Si se proporciona un archivo (nuevo icono), guardarlo
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent()); // Crear directorios si no existen
            Files.write(filePath, file.getBytes()); // Guardar el archivo
            categoria.setIcono(fileName); // Asignar el nuevo icono a la categoría
            System.out.println("Imagen guardada en: " + filePath.toAbsolutePath().toString());
        } else {
            // Si no se proporciona un nuevo archivo, mantener el icono existente
            categoria.setIcono(existingCategoria.getIcono());
        }

        // Asegurarse de que el ID de la categoría se mantenga igual
        categoria.setId(id);

        // Llamar al servicio para actualizar la categoría
        categoriaService.update(id, categoria);
    }

    // Eliminar una categoría
    @DeleteMapping("/delete/{id}")
    public void deleteCategoria(@PathVariable Integer id) {
        // Obtener la categoría existente
        Categoria categoria = categoriaService.getId(id);

        // Si existe la categoría y tiene un icono, eliminar la imagen asociada
        if (categoria != null && categoria.getIcono() != null) {
            Path filePath = Paths.get(UPLOAD_DIR, categoria.getIcono());
            try {
                Files.deleteIfExists(filePath); // Eliminar la imagen del sistema de archivos
                System.out.println("Imagen eliminada: " + filePath.toAbsolutePath().toString());
            } catch (IOException e) {
                System.err.println("Error al eliminar la imagen: " + e.getMessage());
            }
        }

        // Llamar al servicio para eliminar la categoría
        categoriaService.delete(id);
    }
}