package com.juanjosu.backendcomercio.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.juanjosu.backendcomercio.model.Services.ProductoService;
import com.juanjosu.backendcomercio.model.Entities.Producto;

@RestController
@RequestMapping("/api/producto")
@CrossOrigin(origins = "http://localhost:5173") // Permitir tu frontend
public class ApiProductoController {

    private static final String UPLOAD_DIR = "assets/img/";

    @Autowired
    private ProductoService productoService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/")
    public List<Producto> getProductos() {
        return productoService.getAll();
    }

    @GetMapping("/{id}")
    public Producto getProducto(@PathVariable Integer id) {
        return productoService.getId(id);
    }

    @PostMapping("/create")
    public void createProducto(@RequestParam("producto") String productoJson, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Producto producto = objectMapper.readValue(productoJson, Producto.class);
        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
            producto.setImagenUrl(fileName);
            System.out.println("Imagen guardada en: " + filePath.toAbsolutePath().toString()); // Log para verificar la ruta
        }
        productoService.create(producto);
    }

    @PutMapping("/update/{id}")
    public void updateProducto(@PathVariable Integer id, @RequestParam("producto") String productoJson, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Producto producto = objectMapper.readValue(productoJson, Producto.class);
        Producto existingProducto = productoService.getId(id);

        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            System.out.println("Nombre del archivo: " + fileName); // Log para verificar el nombre del archivo
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
            producto.setImagenUrl(fileName);
            System.out.println(producto.getImagenUrl() + producto.getId()); // Log para verificar el nombre de la imagen
            System.out.println("Imagen guardada en: " + filePath.toAbsolutePath().toString()); // Log para verificar la ruta
        } else {
            // Si no se proporciona un nuevo archivo, mantener el nombre de la imagen existente
            producto.setImagenUrl(existingProducto.getImagenUrl());
        }

        // Asegúrate de que el ID del producto se mantenga igual
        producto.setId(id);

        productoService.update(id, producto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProducto(@PathVariable Integer id) {
        Producto producto = productoService.getId(id);
        if (producto != null && producto.getImagenUrl() != null) {
            Path filePath = Paths.get(UPLOAD_DIR, producto.getImagenUrl());
            try {
                Files.deleteIfExists(filePath);
                System.out.println("Imagen eliminada: " + filePath.toAbsolutePath().toString()); // Log para verificar la eliminación
            } catch (IOException e) {
                System.err.println("Error al eliminar la imagen: " + e.getMessage());
            }
        }
        productoService.delete(id);
    }
}
