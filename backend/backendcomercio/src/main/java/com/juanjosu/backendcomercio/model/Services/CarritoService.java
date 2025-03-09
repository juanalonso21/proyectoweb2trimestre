package com.juanjosu.backendcomercio.model.Services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.juanjosu.backendcomercio.model.Entities.Carrito;
import com.juanjosu.backendcomercio.model.Repositories.CarritoRepository;
@Service
public class CarritoService {
    @Autowired
    CarritoRepository carritoRep;

    public List<Carrito> getAll() {
        return this.carritoRep.findAll();
    }

    public void create(Carrito carrito){
        this.carritoRep.save(carrito);
    }


    public void delete (Integer id){
        this.carritoRep.deleteById(id);
    }

    public Carrito getId(Integer id){
        return this.carritoRep.findById(id).get();
    }

    
}