package com.juanjosu.backendcomercio.model.Repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.juanjosu.backendcomercio.model.Entities.*;
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    List<Producto> findByCategoriaId(Integer categoria_id);
    List<Producto> findByNombreContainingIgnoreCaseOrDescripcionContainingIgnoreCase(String nombre, String descripcion);
}