package com.example.airline.Controllers.MVCControllers;

import com.example.airline.Entity.Airport;
import com.example.airline.Repository.AirportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @Autowired
    private AirportRepo airportRepo;

    @GetMapping("/indexx")
    public String index(Model model){
        model.addAttribute("user",airportRepo.findAll());
        return "indexx";
    }
}
