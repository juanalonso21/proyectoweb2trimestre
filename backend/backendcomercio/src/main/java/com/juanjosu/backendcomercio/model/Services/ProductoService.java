package com.juanjosu.backendcomercio.model.Services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.juanjosu.backendcomercio.model.Entities.Producto;
import com.juanjosu.backendcomercio.model.Repositories.ProductoRepository;
import org.springframework.stereotype.Service;
@Service
public class ProductoService {
    @Autowired
    ProductoRepository productoRep;

    public List<Producto> getAll() {
        return this.productoRep.findAll();
    }

    public void create(Producto producto){
        this.productoRep.save(producto);
    }


    public void delete (Integer id){
        this.productoRep.deleteById(id);
    }

    public Producto getId(Integer id){
        return this.productoRep.findById(id).get();
    }

    
}