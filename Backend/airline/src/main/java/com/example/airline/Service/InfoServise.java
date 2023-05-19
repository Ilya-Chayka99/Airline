package com.example.airline.Service;

import com.example.airline.Entity.Clients;
import com.example.airline.Entity.Ticket;
import com.example.airline.Repository.ClientsRepo;
import com.example.airline.Repository.TicketRepo;
import com.example.airline.Repository.TokensRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.airline.Utils.StringUtil.maskString;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class InfoServise {
    @Autowired
    private ClientsRepo clientsRepo;
    @Autowired
    private AuthService authService;
    @Autowired
    private TicketRepo ticketRepo;

    public JSONObject getinfo(String token) {
        JSONObject jsonObject = new JSONObject();
        Long id = authService.validToken(token);
        if (id != -1) {
            authService.updateToken(token, id);
            List<Ticket> tickets = ticketRepo.findByIdclient(id);
            jsonObject.put("tickets", tickets);
            Clients clients = clientsRepo.findById(id).get();
            JSONObject js = new JSONObject();
            js.put("id", clients.getId());
            js.put("name", clients.getName() != null ? clients.getName() : "");
            js.put("surname", clients.getSurname() != null ? clients.getSurname() : "");
            js.put("lastname", clients.getLastname() != null ? clients.getLastname() : "");
            js.put("email", clients.getEmail() != null ? clients.getEmail() : "");
            js.put("phone", clients.getPhone() != null ? clients.getPhone() : "");
            js.put("serpass", maskString(clients.getSerpass(), 1));
            js.put("numberpass", maskString(clients.getNumberpass(), 2));
            js.put("password", maskString(clients.getPassword(), 2));
            jsonObject.put("client", js);
            jsonObject.put("state", "OK");
            return jsonObject;
        }
        JSONObject json = new JSONObject();
        json.put("state", "err");
        json.put("massage", "Сэссия истекала!");
        return json;
    }

    public JSONObject saveinfo(Clients z) {
        System.out.println(z);
        JSONObject jsonObject = new JSONObject();
        z.setPassword(clientsRepo.findById(z.getId()).get().getPassword());
        clientsRepo.save(z);
        return jsonObject;
    }
}
