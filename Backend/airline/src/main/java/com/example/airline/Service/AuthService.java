package com.example.airline.Service;

import com.example.airline.Entity.Clients;
import com.example.airline.Entity.Tokens;
import com.example.airline.Repository.ClientsRepo;
import com.example.airline.Repository.TokensRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class AuthService {
    @Autowired
    private ClientsRepo clientsRepo;
    @Autowired
    private TokensRepo tokensRepo;

    public Long register(String phone, String password) {
        List<Clients> clients = clientsRepo.findByPhone(phone);
        Clients clients1 = new Clients();
        if (clients.size() == 1) {
            if (Objects.equals(clients.get(0).getPassword(), null)) {
                clients1.setId(clients.get(0).getId());
            } else return (long) -1;
        }
        clients1.setPhone(phone);
        clients1.setPassword(password);
        clients1.setStatusrole(0L);
        clientsRepo.save(clients1);
        List<Clients> client = clientsRepo.findByPhone(phone);
        return client.get(0).getId();
    }

    public Long login(String phone, String password) {
        List<Clients> clients = clientsRepo.findByPhoneAndPassword(phone, password);
        if (clients.size() == 1) {
            return clients.get(0).getId();
        }
        return (long) -1;
    }

    public Long validToken(String token) {
        Tokens token1 = tokensRepo.findByToken(token);
        LocalDateTime localDateTime = LocalDateTime.now();
        if(token1!=null){
            if (localDateTime.isBefore(token1.getTime()))
                return token1.getUserId();
            tokensRepo.delete(token1);
        }
        return (long) -1;
    }
    public JSONObject info(String token) {
        Tokens token1 = tokensRepo.findByToken(token);
        Optional<Clients> clients = clientsRepo.findById(token1.getUserId());
        JSONObject json = new JSONObject();
        json.put("phone", clients.get().getPhone());
        return json;
    }

    public void updateToken(String token, Long userId) {
        LocalDateTime currentTime = LocalDateTime.now().plusDays(2);
        List<Tokens> tokens = tokensRepo.findByTokenAndUserId(token, userId);
        Tokens tokens1 = new Tokens();
        if (tokens.size() > 0)
            tokens1.setId(tokens.get(0).getId());
        tokens1.setUserId(userId);
        tokens1.setToken(token);
        tokens1.setTime(currentTime);
        tokensRepo.save(tokens1);
    }
}
