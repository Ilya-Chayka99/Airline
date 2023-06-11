package com.example.airline.Controllers.RestControllers;

import com.example.airline.Entity.Airport;
import com.example.airline.Entity.Flights;
import com.example.airline.Service.FlightsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class FlightsController {
    @Autowired
    private FlightsService flightsService;

    @CrossOrigin
    @GetMapping(path = "Flights")
    public ResponseEntity<List<Flights>> list(){
        return ResponseEntity.ok().body(flightsService.getAll());
    }
}
