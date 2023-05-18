package com.example.airline.Controllers;

import com.example.airline.Service.InfoServise;
import com.example.airline.Utils.StringUtil;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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


}
