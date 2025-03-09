package com.juanjosu.backendcomercio.model.Services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.juanjosu.backendcomercio.model.Entities.Usuario;
import com.juanjosu.backendcomercio.model.Repositories.UsuarioRepository;
import org.springframework.stereotype.Service;
@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRep;

    public List<Usuario> getAll() {
        return this.usuarioRep.findAll();
    }

    public void create(Usuario usuario){
        this.usuarioRep.save(usuario);
    }


    public void delete (Integer id){
        this.usuarioRep.deleteById(id);
    }

    public Usuario getId(Integer id){
        return this.usuarioRep.findById(id).get();
    }

    
}