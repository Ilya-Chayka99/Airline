package com.example.airline.Controllers.MVCControllers;

import com.example.airline.Entity.Airport;
import com.example.airline.Repository.AirportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class WebController {
    @Autowired
    private AirportRepo airportRepo;

    @GetMapping("main")
    public String index(Model model){
        model.addAttribute("user",airportRepo.findAll());
        return "main";
    }
    @GetMapping("indexx")
    public String indexx(Model model){
        model.addAttribute("user",airportRepo.findAll());
        return "indexx";
    }
}
