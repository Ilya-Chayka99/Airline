package com.example.airline.Controllers;


import com.example.airline.Entity.Department;
import com.example.airline.Repository.DepartmentRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class DepartmentController {

    private DepartmentRepo departmentRepo;

    @GetMapping(path = "zzz")
    public ResponseEntity<List<Department>> list(){
        return ResponseEntity.ok().body(departmentRepo.findAll());
    }
}
