package com.example.airline.Entity;

//import jakarta.persistence.*;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "flights")
public class Flights {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long id_v;
    private Long id_p;
    private Integer kol_mest;
    private String bort;
    private Date date_v;
    private Date date_p;
    private String status;
    private String aviacompani;
    private String numberreis;
    private Date time_v;
    private Date time_p;
    private BigDecimal money;
}
