package com.example.airline.Service;

import com.example.airline.Entity.Flights;
import com.example.airline.Repository.FlightsRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FlightsService {

    private FlightsRepo flightsRepo;
    public List<Flights> getAll(){
        return flightsRepo.findAll();
    }

}
