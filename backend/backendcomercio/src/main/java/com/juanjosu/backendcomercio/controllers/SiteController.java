package com.juanjosu.backendcomercio.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SiteController {
    
    @GetMapping("/")
    public String home(){
        return "/www/site/index";
    }
    @GetMapping("/")
    public String montaje(){
        return "/www/site/montaje";
    }
    @GetMapping("/")
    public String mantenimiento(){
        return "/www/site/mantenimiento";
    }
    @GetMapping("/")
    public String personalizados(){
        return "/www/site/personalizados";
    }
    @GetMapping("/")
    public String tienda(){
        return "/www/site/tienda";
    }
    @GetMapping("/")
    public String carrito(){
        return "/www/site/carrito";
    }
    @GetMapping("/")
    public String contacto(){
        return "/www/site/cpntacto";
    }
}
