package com.example.airline.Entity;

//import jakarta.persistence.*;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
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
    @OneToOne
    @JoinColumn(name = "id_v",referencedColumnName = "id")
    private Airport vil;
    @OneToOne
    @JoinColumn(name = "id_p",referencedColumnName = "id")
    private Airport pril;
    private Integer kol_mest;
    private String bort;
    private LocalDate date_v;
    private LocalDate date_p;
    private String status;
    private String aviacompani;
    private String numberreis;
    private Date time_v;
    private Date time_p;
    private BigDecimal money;
}
