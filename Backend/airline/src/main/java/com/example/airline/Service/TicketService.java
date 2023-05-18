package com.example.airline.Service;

import com.example.airline.Entity.Clients;
import com.example.airline.Entity.Flights;
import com.example.airline.Entity.InfoRegisterTicket;
import com.example.airline.Entity.Ticket;
import com.example.airline.Repository.ClientsRepo;
import com.example.airline.Repository.FlightsRepo;
import com.example.airline.Repository.TicketRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class TicketService {
    @Autowired
    private TicketRepo ticketRepo;
    @Autowired
    private ClientsRepo clientsRepo;
    @Autowired
    private FlightsRepo flightsRepo;

    public boolean save(Ticket t) {
        Long l = t.getIdclient();
        List<Ticket> tickets = ticketRepo.findByPhone(t.getPhone());
        if (l == null) {
            if (clientsRepo.findByPhone(t.getPhone()).size() == 0) {
                Clients clients = new Clients();
                clients.setPhone(t.getPhone());
                clientsRepo.save(clients);
            }
            t.setIdclient(clientsRepo.findByPhone(t.getPhone()).get(0).getId());

        }
        if (tickets.size() != 0 && (tickets.get(tickets.size() - 1).getStatus() == 1 || tickets.get(tickets.size() - 1).getStatus() == 2)) {
            t.setId(tickets.get(tickets.size() - 1).getId());
        } else {
            Optional<Flights> flights = flightsRepo.findById(t.getIdflight());
            Integer m = flights.get().getKol_mest();
            if (m == 0) return false;
            Flights flights1 = flights.get();
            flights1.setKol_mest(m - 1);
            flightsRepo.save(flights1);
        }
        ticketRepo.save(t);
        return true;
    }

    public boolean update(Ticket t) {
        Optional<Ticket> list = ticketRepo.findById(t.getId());
        if (list.isPresent()) {
            ticketRepo.save(t);
            return true;
        }
        return false;
    }

    public List<Ticket> list() {
        return ticketRepo.findAll();
    }

    public boolean delete(Ticket t) {
        List<Ticket> tickets = ticketRepo.findByPhone(t.getPhone());
        if (tickets.get(tickets.size() - 1).getStatus() != 3)
            ticketRepo.delete(tickets.get(tickets.size() - 1));
        return true;
    }

    public Ticket search(InfoRegisterTicket t) {
        List<Ticket> tickets = ticketRepo.findBySerialAndSerpassAndNompass(t.getBil(), t.getSerPas(), t.getNomPas());
        tickets= tickets.stream()
                        .filter(x-> Objects.equals(x.getIdflight(), t.getId_flight()) && x.getStatus()==3)
                                .toList();
        System.out.println(tickets);
        return tickets.size()>0?tickets.get(0):null;
    }
    public List<String> seat(Long id){
        List<Ticket> tickets = ticketRepo.findAll();
        List<String> str = new ArrayList<>();
        for(Ticket t: tickets){
            if(Objects.equals(t.getIdflight(), id)){
                if(t.getSeat_number()!=null)
                    str.add(t.getSeat_number());
            }
        }
        return str;
    }
}
