package com.example.airline.Controllers;

import com.example.airline.Entity.InfoRegisterTicket;
import com.example.airline.Entity.Ticket;
import com.example.airline.Service.TicketService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
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
    public ResponseEntity<List<Ticket>> list(){
        return ResponseEntity.ok().body(ticketService.list());
    }
    @CrossOrigin
    @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE,path = "create")
    public ResponseEntity<String> create(@RequestBody Ticket t){
        JSONObject jsonObject = new JSONObject();
        if(ticketService.save(t)){
            jsonObject.put("status","OK");
            return ResponseEntity.ok().body(jsonObject.toString());
        }
        jsonObject.put("status","err");
        jsonObject.put("massage","Ошибка создания Билета: На данный рейс закончились места!");
        return ResponseEntity.ok().body(jsonObject.toString());
    }
    @CrossOrigin
    @PutMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE,path = "update")
    public ResponseEntity<String> put(@RequestBody Ticket t){
        if(ticketService.update(t))
            return ResponseEntity.ok().body("{\"massage\":\"OK\"}");
        return ResponseEntity.ok().body("Не найден данный билет");
    }
    @CrossOrigin
    @DeleteMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE,path = "delete")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> delete(@RequestBody Ticket t){
        JSONObject jsonObject = new JSONObject();
        if(ticketService.delete(t)){
            jsonObject.put("status","OK");
            return ResponseEntity.ok().body(jsonObject.toString());
        }
        jsonObject.put("status","err");
        jsonObject.put("massage","Ошибка удаления Билета: Билет не найден!");
        return ResponseEntity.ok().body(jsonObject.toString());
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
    public ResponseEntity<List<String>> list(@RequestParam("id")Long id){
        return ResponseEntity.ok().body(ticketService.seat(id));
    }
    @CrossOrigin
    @PostMapping(path = "refund")
    public ResponseEntity<String> refund(@RequestParam("id")Long id){
        ticketService.refund(id);
        return ResponseEntity.ok().body("");
    }

    @CrossOrigin
    @PostMapping(path = "setinfoticketseat")
    public ResponseEntity<String> setinfoticketseat(@RequestParam("phone")String phone,
                                                          @RequestParam("status")String status,
                                                          @RequestParam("seat_number")String seat,
                                                          @RequestParam("serial")String serial){
        return ResponseEntity.ok().body(ticketService.setinfoticketseat(phone,status,seat,serial).toString());
    }

}
