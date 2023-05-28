package com.example.airline.Controllers;

import com.example.airline.Entity.Flights;
import com.example.airline.Entity.Ticket;
import com.example.airline.Entity.Tokens;
import com.example.airline.Repository.FlightsRepo;
import com.example.airline.Repository.TicketRepo;
import com.example.airline.Repository.TokensRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Controller
@EnableScheduling
@EnableAsync
@ConditionalOnProperty(name = "scheduler.enabled", matchIfMissing = true)
public class PlanController {
    @Autowired
    private FlightsRepo flightsRepo;
    @Autowired
    private TokensRepo tokensRepo;
    @Autowired
    private TicketRepo ticketRepo;

    @Scheduled(fixedRate = 1800000)
    @Async
    public void refreshPricingParameters() {
        List<Flights> flights = flightsRepo.findAll();
        LocalDateTime localDateTime = LocalDateTime.now();
        for (Flights flights1 : flights) {
            if (!localDateTime.isBefore(flights1.getDate_v().atStartOfDay()
                    .plusHours(flights1.getTime_v().getHours())
                    .plusMinutes(flights1.getTime_v().getMinutes()).minusDays(1))) {

                if (Objects.equals(flights1.getStatus(), "Продажа")) {
                    flights1.setStatus("Регистрация");
                }
            }
            if (!localDateTime.isBefore(flights1.getDate_v().atStartOfDay()
                    .plusHours(flights1.getTime_v().getHours())
                    .plusMinutes(flights1.getTime_v().getMinutes()).minusMinutes(30))) {

                if (Objects.equals(flights1.getStatus(), "Регистрация")) {
                    flights1.setStatus("Улетел");
                    List<Ticket> tickets = ticketRepo.findByIdflight(flights1.getId());
                    for(Ticket t:tickets){
                        if(Objects.equals(t.getStatus(), "Зарегистрирован")){
                            t.setStatus("Вылетел");
                            ticketRepo.save(t);
                        }else{
                            t.setStatus("Отмена");
                            ticketRepo.save(t);
                        }
                    }
                }
            }
            flightsRepo.save(flights1);
        }
    }

    @Scheduled(fixedRate = 1800000)
    @Async
    public void refreshTokenParameters() {
        List<Tokens> tokens = tokensRepo.findAll();
        LocalDateTime localDateTime = LocalDateTime.now();
        for (Tokens t : tokens) {
            if (!localDateTime.isBefore(t.getTime())) {
                tokensRepo.delete(t);
            }
        }
    }

}
