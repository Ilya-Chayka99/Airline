package com.example.airline.Controllers.MVCControllers;

import com.example.airline.Entity.Airport;
import com.example.airline.Entity.Flights;
import com.example.airline.Entity.FlightsForm;
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

import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Objects;


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
        model.addAttribute("flights",new FlightsForm());
        return "form-elements";
    }

    @PostMapping("createF")
    public String createF(@ModelAttribute("flights") FlightsForm flights) throws ParseException {
        System.out.println(flights);
        LocalDate date = LocalDate.parse(flights.getDate_v());
        Flights flights1 = new Flights();
        flights1.setStatus("Продажа");
        flights1.setKol_mest(96);
        flights1.setDate_v(LocalDate.parse(flights.getDate_v()));
        flights1.setDate_p(LocalDate.parse(flights.getDate_p()));
        DateFormat formatter = new SimpleDateFormat("HH:mm");
        flights1.setTime_v(formatter.parse(flights.getTime_v()));
        flights1.setTime_p(formatter.parse(flights.getTime_p()));
        flights1.setBort("Б-109");
        flights1.setAviacompani(flights.getAviacompani());
        flights1.setNumberreis("ВВ-072");
        flights1.setMoney(flights.getMoney());
        flights1.setVil(airportRepo.findAll().stream().filter(x-> Objects.equals(x.getName(), flights.getVil())).toList().get(0));
        flights1.setPril(airportRepo.findAll().stream().filter(x-> Objects.equals(x.getName(), flights.getPril())).toList().get(0));
        flightsRepo.save(flights1);
        return "form-elements";
    }
}
