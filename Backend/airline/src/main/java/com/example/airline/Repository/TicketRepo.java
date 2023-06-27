package com.example.airline.Repository;

import com.example.airline.Entity.Clients;
import com.example.airline.Entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TicketRepo extends JpaRepository<Ticket,Long> {
    public List<Ticket> findByPhone(String phone);
    public List<Ticket> findBySerialAndSerpassAndNompass(String bil,String serPas,String nomPas);
    public Ticket findBySerial(String bil);
    public List<Ticket> findByIdclient(Long id);
    public List<Ticket> findByIdflight(Long id);
}
