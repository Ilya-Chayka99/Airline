package com.example.airline.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InfoRegisterTicket {

    private Long id_flight;
    private String bil;
    private String serPas;
    private String nomPas;
}
