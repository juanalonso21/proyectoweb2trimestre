package com.juanjosu.backendcomercio.model.Entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('admin', 'editor', 'usuario') DEFAULT 'usuario'")
    private Rol rol = Rol.USUARIO;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('activo', 'suspendido', 'eliminado') DEFAULT 'activo'")
    private Estado estado = Estado.ACTIVO;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    private LocalDateTime ultimoLogin;

    private String token;

    @Column(name = "intentos_login", columnDefinition = "INT DEFAULT 0")
    private int intentosLogin = 0;

    @Column(name = "avatar_url", columnDefinition = "VARCHAR(255) DEFAULT 'default.png'")
    private String avatarUrl = "default.png";
}

enum Rol {
    ADMIN, EDITOR, USUARIO
}

enum Estado {
    ACTIVO, SUSPENDIDO, ELIMINADO
}

