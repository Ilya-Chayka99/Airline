package com.example.airline.Service;

import com.example.airline.Entity.Clients;
import com.example.airline.Entity.Flights;
import com.example.airline.Entity.InfoRegisterTicket;
import com.example.airline.Entity.Ticket;
import com.example.airline.Repository.ClientsRepo;
import com.example.airline.Repository.FlightsRepo;
import com.example.airline.Repository.TicketRepo;
import com.example.airline.Utils.StringUtil;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
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
            // создан оплата оформлен зарегистрирован возврат отмена
        }
        if (tickets.size() != 0) {
            for (Ticket ti : tickets) {
                if (Objects.equals(ti.getStatus(), "Создан") || Objects.equals(ti.getStatus(), "Оплата")) {
                    ti.setStatus("Отмена");
                    Flights flights = flightsRepo.findById(ti.getIdflight()).get();
                    flights.setKol_mest(flights.getKol_mest() + 1);
                    flightsRepo.save(flights);
                    ticketRepo.save(ti);
                }
            }
        }
        Flights flights = flightsRepo.findById(t.getIdflight()).get();
        Integer m = flights.getKol_mest();
        if (m == 0) return false;
        flights.setKol_mest(m - 1);
        flightsRepo.save(flights);

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
        for (Ticket ticket : tickets) {
            if (Objects.equals(ticket.getStatus(), "Создан") || Objects.equals(ticket.getStatus(), "Оплата")) {
                ticket.setStatus("Отмена");
                Flights flights = flightsRepo.findById(ticket.getIdflight()).get();
                flights.setKol_mest(flights.getKol_mest() + 1);
                flightsRepo.save(flights);
                ticketRepo.save(ticket);
            }
        }
        return true;
    }

    public Ticket search(InfoRegisterTicket t) {
        List<Ticket> tickets = ticketRepo.findBySerialAndSerpassAndNompass(t.getBil(), t.getSerPas(), t.getNomPas());
        tickets = tickets.stream()
                .filter(x -> Objects.equals(x.getIdflight(), t.getId_flight()) && Objects.equals(x.getStatus(), "Оформлен"))
                .toList();
        System.out.println(tickets);
        return tickets.size() > 0 ? tickets.get(0) : null;
    }

    public List<String> seat(Long id) {
        List<Ticket> tickets = ticketRepo.findAll();
        List<String> str = new ArrayList<>();
        for (Ticket t : tickets) {
            if (Objects.equals(t.getIdflight(), id)) {
                if (t.getSeat_number() != null)
                    str.add(t.getSeat_number());
            }
        }
        return str;
    }

    public Object setinfoticketseat(String phone, String status, String seat, String serial) {
        JSONObject jsonObject = new JSONObject();
        String alf = "qwertyuopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
        if(phone!=null && !phone.equals("null")){
            Ticket ticket = ticketRepo.findByPhone(phone).get(ticketRepo.findByPhone(phone).size()-1);
            ticket.setStatus(status);
            String str = StringUtil.generateStringWithAlphabet(alf, 3)+"-"
                    + StringUtil.generateStringWithAlphabet(alf, 3)+"-"
                    + StringUtil.generateStringWithAlphabet(alf, 3)+"-"
                    + StringUtil.generateStringWithAlphabet(alf, 6);
            ticket.setSerial(str);
            ticketRepo.save(ticket);
            jsonObject.put("serial",str);
            jsonObject.put("status","OK");
            return jsonObject;
        }
        Ticket ticket = ticketRepo.findBySerial(serial);
        if(ticket.getSeat_number()==null){
            ticket.setStatus("Зарегистрирован");
            ticket.setSeat_number(seat);
            ticketRepo.save(ticket);
            jsonObject.put("status","OK");
            return jsonObject;
        }
        jsonObject.put("status","err");
        jsonObject.put("massage","Билет уже зарегистрирован!");
        return jsonObject;

    }
}
