package com.example.airline.Controllers;


import com.example.airline.Entity.Airport;
import com.example.airline.Repository.AirportRepo;
import com.example.airline.Service.AirportService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class AirportController {
    @Autowired
    private AirportService airportService;

    @CrossOrigin
    @GetMapping(path = "Airport")
    public ResponseEntity<List<Airport>> list(){
        return ResponseEntity.ok().body(airportService.getAll());
    }
}
