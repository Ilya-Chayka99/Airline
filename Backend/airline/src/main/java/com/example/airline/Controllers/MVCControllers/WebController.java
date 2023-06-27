package com.example.airline.Controllers.MVCControllers;

import com.example.airline.Entity.Airport;
import com.example.airline.Entity.Flights;
import com.example.airline.Repository.AirportRepo;
import com.example.airline.Repository.ClientsRepo;
import com.example.airline.Repository.FlightsRepo;
import com.example.airline.Repository.TicketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
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
    @Autowired
    private TicketRepo ticketRepo;

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
    @GetMapping("tableinfo2")
    public String tableinfo2(Model model){
        model.addAttribute("flight",flightsRepo.findAll());
        model.addAttribute("air",airportRepo.findAll());
        model.addAttribute("clients",clientsRepo.findAll());
        model.addAttribute("ticket",ticketRepo.findAll());
        return "table-datatable2";
    }
    @GetMapping("formF")
    public String formF(Model model){
        model.addAttribute("air",airportRepo.findAll());
        return "form-elements";
    }

    @PostMapping("createF")
    public String createF(@ModelAttribute("flights")Flights flights){
        System.out.println(flights);


        return "form-elements";
    }
}
