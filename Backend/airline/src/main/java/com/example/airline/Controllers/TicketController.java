package com.example.airline.Controllers;

import com.example.airline.Entity.InfoRegisterTicket;
import com.example.airline.Entity.Ticket;
import com.example.airline.Service.TicketService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/ticket")
@AllArgsConstructor
@NoArgsConstructor
public class TicketController  {
    @Autowired
    private TicketService ticketService;

    @CrossOrigin
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Ticket>> list(){
        return ResponseEntity.ok().body(ticketService.list());
    }
    @CrossOrigin
    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE,path = "create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> create(@RequestBody Ticket t){
        if(ticketService.save(t))
            return ResponseEntity.ok().body("{\"massage\":\"OK\"}");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ошибка создания Билета");
    }
    @CrossOrigin
    @PutMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE,path = "update")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> put(@RequestBody Ticket t){
        if(ticketService.update(t))
            return ResponseEntity.ok().body("{\"massage\":\"OK\"}");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Не найден данный билет");
    }
    @CrossOrigin
    @DeleteMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE,path = "delete")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> delete(@RequestBody Ticket t){
        if(ticketService.delete(t))
            return ResponseEntity.ok().body("{\"massage\":\"OK\"}");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ошибка удаления билета");
    }
    @CrossOrigin
    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE,path = "search")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Ticket> search(@RequestBody InfoRegisterTicket t){
        Ticket ticket = ticketService.search(t);
        if(ticket!=null){
            ticket.setSerpass(null);
            ticket.setNompass(null);
            return ResponseEntity.ok().body(ticket);
        }

        return ResponseEntity.ok().body(null);
    }
    @CrossOrigin
    @PostMapping(path = "seat")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<String>> list(@RequestParam("id")Long id){
        return ResponseEntity.ok().body(ticketService.seat(id));
    }

}
