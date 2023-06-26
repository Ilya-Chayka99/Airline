package com.example.airline.Controllers.MVCControllers;

import com.example.airline.Entity.Airport;
import com.example.airline.Repository.AirportRepo;
import com.example.airline.Repository.ClientsRepo;
import com.example.airline.Repository.FlightsRepo;
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
    @Autowired
    private FlightsRepo flightsRepo;
    @Autowired
    private ClientsRepo clientsRepo;

    @GetMapping("main")
    public String index(Model model){
        Integer[] A = {0, 1000, 10, 239};
        model.addAttribute("user",A);
        return "main";
    }
    @GetMapping("tableinfo")
    public String tableinfo(Model model){
        model.addAttribute("flight",flightsRepo.findAll());
        model.addAttribute("air",airportRepo.findAll());
        model.addAttribute("clients",clientsRepo.findAll());
        return "table-datatable";
    }
}
