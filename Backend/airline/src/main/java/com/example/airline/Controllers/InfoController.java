package com.example.airline.Controllers;

import com.example.airline.Entity.Clients;
import com.example.airline.Service.InfoServise;
import com.example.airline.Utils.StringUtil;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.json.JSONParser;
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
    private InfoServise infoServise;

    @CrossOrigin
    @PostMapping(path = "user")
    public ResponseEntity<String> info(@RequestParam("token") String token) {

        JSONObject jsonObject = infoServise.getinfo(token);

        return ResponseEntity.ok().body(jsonObject.toString());

    }
    @CrossOrigin
    @PostMapping(path = "save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> save(@RequestBody Clients k) {
        System.out.println(k);
        JSONObject jsonObject = infoServise.saveinfo(k);

        return ResponseEntity.ok().body(jsonObject.toString());

    }


}
