package com.example.airline.Controllers.RestControllers;

import com.example.airline.Entity.Clients;
import com.example.airline.Service.InfoService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/info")
@AllArgsConstructor
@NoArgsConstructor
public class InfoController {
    @Autowired
    private InfoService infoService;

    @CrossOrigin
    @PostMapping(path = "user")
    public ResponseEntity<String> info(@RequestParam("token") String token) {

        JSONObject jsonObject = infoService.getinfo(token);

        return ResponseEntity.ok().body(jsonObject.toString());

    }
    @CrossOrigin
    @PostMapping(path = "save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> save(@RequestBody Clients k) {
        System.out.println(k);
        JSONObject jsonObject = infoService.saveinfo(k);

        return ResponseEntity.ok().body(jsonObject.toString());

    }


}
