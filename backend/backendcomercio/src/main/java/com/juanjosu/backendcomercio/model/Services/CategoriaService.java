package com.juanjosu.backendcomercio.model.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juanjosu.backendcomercio.model.Entities.Categoria;
import com.juanjosu.backendcomercio.model.Repositories.CategoriaRepository;

@Service
public class CategoriaService {
    @Autowired
    CategoriaRepository categoriaRep;

    public List<Categoria> getAll() {
        return this.categoriaRep.findAll();
    }

    public void create(Categoria categoria){
        this.categoriaRep.save(categoria);
    }

    public void delete (Integer id){
        this.categoriaRep.deleteById(id);
    }

    public Categoria getId(Integer id){
        return this.categoriaRep.findById(id).orElse(null);
    }

    public void update(Integer id, Categoria categoria) {
        Optional<Categoria> existingCategoria = categoriaRep.findById(id);
        if (existingCategoria.isPresent()) {
            Categoria updatedCategoria = existingCategoria.get();
            updatedCategoria.setNombre(categoria.getNombre());
            updatedCategoria.setDescripcion(categoria.getDescripcion());
            // Actualiza otros campos según sea necesario
            categoriaRep.save(updatedCategoria);
        }
    }
}