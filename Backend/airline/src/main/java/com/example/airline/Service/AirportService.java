package com.example.airline.Service;

import com.example.airline.Entity.Airport;
import com.example.airline.Repository.AirportRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor

public class AirportService {

    private AirportRepo airportRepo;

    public List<Airport> getAll(){
        return airportRepo.findAll();
    }

}
