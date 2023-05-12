package com.example.airline.Repository;

import com.example.airline.Entity.Clients;
import com.example.airline.Entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepo extends JpaRepository<Ticket,Long> {
    public List<Ticket> findByPhone(String phone);
    public List<Ticket> findById_flightAndSerialAndSerpassAndNompass(Long id_flight,String bil,String serPas,String nomPas);
}