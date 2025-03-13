package com.juanjosu.backendcomercio.model.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juanjosu.backendcomercio.model.Entities.Usuario;
import com.juanjosu.backendcomercio.model.Repositories.UsuarioRepository;

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
        return this.usuarioRep.findById(id).orElse(null);
    }
    public Usuario findByUsernameAndPassword(String username, String password){
        return this.usuarioRep.findByUsernameAndPassword(username, password);
    }

    public void update(Integer id, Usuario usuario) {
        Optional<Usuario> existingUsuario = usuarioRep.findById(id);
        if (existingUsuario.isPresent()) {
            Usuario updatedUsuario = existingUsuario.get();
            updatedUsuario.setUsername(usuario.getUsername());
            updatedUsuario.setEmail(usuario.getEmail());
            updatedUsuario.setPassword(usuario.getPassword());
            updatedUsuario.setNombre(usuario.getNombre());
            updatedUsuario.setEstado(usuario.getEstado());
            updatedUsuario.setRol(usuario.getRol());
            updatedUsuario.setFechaCreacion(usuario.getFechaCreacion());
            updatedUsuario.setUltimoLogin(usuario.getUltimoLogin());
            updatedUsuario.setToken(usuario.getToken());
            updatedUsuario.setIntentosLogin(usuario.getIntentosLogin());
            updatedUsuario.setAvatarUrl(usuario.getAvatarUrl());
            usuarioRep.save(updatedUsuario);
        }
    }
}