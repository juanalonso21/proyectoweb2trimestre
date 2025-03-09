package com.juanjosu.backendcomercio.model.Entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "productos")
@Getter
@Setter
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private BigDecimal precio;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int stock = 0;

    private String categoria;

    @Column(name = "imagen_url", columnDefinition = "VARCHAR(255) DEFAULT 'default.png'")
    private String imagenUrl = "default.png";

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('activo', 'inactivo') DEFAULT 'activo'")
    private EstadoProducto estado = EstadoProducto.ACTIVO;
}

enum EstadoProducto {
    ACTIVO, INACTIVO
}

