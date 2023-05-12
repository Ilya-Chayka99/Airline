package com.example.airline.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long id_client;
    private Long id_flight;
    private Date date_registration= new Date();
    private String seat_number;
    private Long status;
    private String name;
    private String sename;
    private String lastname;
    private Date datero;
    private String phone;
    private Long serpass;
    private Long nompass;
    private String serial;
    private String email;


}
