package com.example.airline.Controllers;

import com.example.airline.Entity.Ticket;
import com.example.airline.Service.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@AllArgsConstructor
public class TicketController  {
    private TicketService ticketService;

    @CrossOrigin
    @GetMapping(path = "ticket")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Ticket>> list(){
        return ResponseEntity.ok().body(ticketService.list());
    }
    @CrossOrigin
    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE,path = "ticket/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> create(@RequestBody Ticket t){
        if(ticketService.save(t))
            return ResponseEntity.ok().body("{\"massage\":\"OK\"}");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ошибка создания Билета");
    }
    @CrossOrigin
    @PutMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE,path = "ticket/update")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> put(@RequestBody Ticket t){
        if(ticketService.update(t))
            return ResponseEntity.ok().body("{\"massage\":\"OK\"}");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Не найден данный билет");
    }
    @CrossOrigin
    @DeleteMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE,path = "ticket/delete")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> delete(@RequestBody Ticket t){
        if(ticketService.delete(t))
            return ResponseEntity.ok().body("{\"massage\":\"OK\"}");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ошибка удаления билета");
    }
}
