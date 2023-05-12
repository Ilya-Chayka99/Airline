package com.example.airline.Service;

import com.example.airline.Entity.Clients;
import com.example.airline.Entity.Flights;
import com.example.airline.Entity.InfoRegisterTicket;
import com.example.airline.Entity.Ticket;
import com.example.airline.Repository.ClientsRepo;
import com.example.airline.Repository.FlightsRepo;
import com.example.airline.Repository.TicketRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TicketService {

    private TicketRepo ticketRepo;
    private ClientsRepo clientsRepo;
    private FlightsRepo flightsRepo;

    public boolean save(Ticket t) {
        Long l = t.getId_client();
        List<Ticket> tickets = ticketRepo.findByPhone(t.getPhone());
        if (l == null) {
            if (clientsRepo.findByPhone(t.getPhone()).size() == 0) {
                Clients clients = new Clients();
                clients.setPhone(t.getPhone());
                clientsRepo.save(clients);
            }
            t.setId_client(clientsRepo.findByPhone(t.getPhone()).get(0).getId());

        }
        if (tickets.size() != 0 && (tickets.get(tickets.size() - 1).getStatus() == 1 || tickets.get(tickets.size() - 1).getStatus() == 2)) {
            t.setId(tickets.get(tickets.size() - 1).getId());
        } else {
            Optional<Flights> flights = flightsRepo.findById(t.getId_flight());
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
        List<Ticket> tickets = ticketRepo.findById_flightAndSerialAndSerpassAndNompass(t.getId_flight(), t.getBil(), t.getSerPas(), t.getNomPas());
        System.out.println(tickets);
        return null;
    }
}
