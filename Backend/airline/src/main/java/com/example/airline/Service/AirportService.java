package com.example.airline.Service;

import com.example.airline.Entity.Airport;
import com.example.airline.Repository.AirportRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class AirportService {
    @Autowired
    private AirportRepo airportRepo;

    public List<Airport> getAll(){
        return airportRepo.findAll();
    }

}
