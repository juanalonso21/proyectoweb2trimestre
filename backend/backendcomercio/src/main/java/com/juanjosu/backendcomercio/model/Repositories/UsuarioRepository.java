package com.juanjosu.backendcomercio.model.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.juanjosu.backendcomercio.model.Entities.*;
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Integer>{
    
}