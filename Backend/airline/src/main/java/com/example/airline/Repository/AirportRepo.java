package com.example.airline.Repository;

import com.example.airline.Entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirportRepo extends JpaRepository<Airport,Long> {

}
