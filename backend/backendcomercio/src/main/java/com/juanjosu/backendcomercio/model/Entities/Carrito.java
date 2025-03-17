package com.juanjosu.backendcomercio.model.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "carrito")
@Getter
@Setter
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Producto> productos;

    @Column(nullable = false)
    private int cantidad;

    @Override
    public String toString() {
        return "Carrito{" +
                "id=" + id +
                ", usuario=" + usuario +
                ", productos=" + productos +
                ", cantidad=" + cantidad +
                '}';
    }
}

