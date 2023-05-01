package com.example.airline.Controllers;


import com.example.airline.Entity.Airport;
import com.example.airline.Entity.Department;
import com.example.airline.Repository.AirportRepo;
import com.example.airline.Repository.DepartmentRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class DepartmentController {

    private AirportRepo airportRepo;

    @CrossOrigin
    @GetMapping(path = "zzz")
    public ResponseEntity<List<Airport>> list(){
        return ResponseEntity.ok().body(airportRepo.findAll());
    }
}
