package com.juanjosu.backendcomercio.controllers.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;
import com.juanjosu.backendcomercio.model.Services.UsuarioService;
import com.juanjosu.backendcomercio.model.Entities.Usuario;
@Controller
public class AdminUsuariosController {
    @Autowired
    private UsuarioService usuarioService;
    @GetMapping("/admin/usuarios")
    public String usuarios(Model model) {
        model.addAttribute("usuarios", this.usuarioService.getAll());
        return "/admin/usuarios/listar";
    }
    @GetMapping("/admin/usuarios/new")
    public String nuevoUsuario(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "/admin/usuarios/new";
    }
    @PostMapping("/admin/usuarios/save")
    public String crearUsuario(@ModelAttribute Usuario usuario) {
        this.usuarioService.create(usuario);
        return "redirect:/admin/usuarios";
    }
}
