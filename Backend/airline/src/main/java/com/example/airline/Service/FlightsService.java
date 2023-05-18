package com.example.airline.Service;

import com.example.airline.Entity.Flights;
import com.example.airline.Repository.FlightsRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class FlightsService {
    @Autowired
    private FlightsRepo flightsRepo;
    public List<Flights> getAll(){
        return flightsRepo.findAll();
    }

}
