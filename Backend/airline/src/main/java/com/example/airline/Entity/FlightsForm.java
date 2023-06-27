package com.example.airline.Entity;

//import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FlightsForm {

    private String vil;
    private String pril;
    private String bort;
    private String aviacompani;
    private String date_v;
    private String date_p;
    private String time_v;
    private String time_p;
    private BigDecimal money;
}
