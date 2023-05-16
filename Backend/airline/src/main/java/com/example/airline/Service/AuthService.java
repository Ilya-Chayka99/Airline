package com.example.airline.Service;

import com.example.airline.Entity.Clients;
import com.example.airline.Entity.Tokens;
import com.example.airline.Repository.ClientsRepo;
import com.example.airline.Repository.TokensRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class AuthService {

    private ClientsRepo clientsRepo;
    private TokensRepo tokensRepo;

    public Long register (String phone,String password){
        List<Clients> clients =clientsRepo.findByPhone(phone);
        Clients clients1 = new Clients();
        if(clients.size()==1){
           if(Objects.equals(clients.get(0).getPassword(), null)){
               clients1.setId(clients.get(0).getId());
           }else return (long) -1;
        }
        clients1.setPhone(phone);
        clients1.setPassword(password);
        clientsRepo.save(clients1);
        List<Clients> client =clientsRepo.findByPhone(phone);
        return client.get(0).getId();
    }
    public Long login (String phone,String password){
        List<Clients> clients =clientsRepo.findByPhoneAndPassword(phone,password);
        if(clients.size()==1){
           return clients.get(0).getId();
        }
        return (long) -1;
    }

    public void updateToken (String token,Long userId){
        LocalDateTime currentTime = LocalDateTime.now().plusDays(2);
        List<Tokens> tokens = tokensRepo.findByTokenAndUserId(token,userId);
        Tokens tokens1=new Tokens();
        if(tokens.size()>0){
            tokens1.setUserId(tokens.get(0).getUserId());
            tokens1.setId(tokens.get(0).getId());
        }else
            tokens1.setUserId(userId);
        tokens1.setToken(token);
        tokens1.setTime(currentTime);
        tokensRepo.save(tokens1);
    }
}
