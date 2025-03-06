package com.juanjosu.backendcomercio.model.Services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.juanjosu.backendcomercio.model.Entities.Categoria;
import com.juanjosu.backendcomercio.model.Repositories.CategoriaRepository;
import org.springframework.stereotype.Service;
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
        return this.categoriaRep.findById(id).get();
    }

    
}