package com.juanjosu.backendcomercio.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SiteController {
    
    @GetMapping("/")
    public String home(){
        return "/www/site/index";
    }
    @GetMapping("/montaje")
    public String montaje(){
        return "/www/site/montaje";
    }
    @GetMapping("/manteniminento")
    public String mantenimiento(){
        return "/www/site/mantenimiento";
    }

}
