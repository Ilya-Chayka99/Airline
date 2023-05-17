package com.example.airline.Controllers;

import com.example.airline.Entity.Ticket;
import com.example.airline.Service.AuthService;
import com.example.airline.Utils.StringUtil;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    AuthService authService;

    @CrossOrigin
    @PostMapping(path = "register")
    public ResponseEntity<String> register(@RequestParam("phone") String phone, @RequestParam("password") String password) {
        Long id = authService.register(phone, password);
        if (id != -1) {
            String token = StringUtil.generateStringWithAlphabet("qwertyuopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789", 60);
            return this.updateToken(token, id);
        } else {
            JSONObject json = new JSONObject();
            json.put("state", "err");
            json.put("massage", "Такой пользователь уже зарегистрирован!");
            return ResponseEntity.ok().body(json.toString());
        }
    }

    @CrossOrigin
    @PostMapping(path = "login")
    public ResponseEntity<String> login(@RequestParam("phone") String phone, @RequestParam("password") String password) {
        Long id = authService.login(phone, password);
        if (id != -1) {
            String token = StringUtil.generateStringWithAlphabet("qwertyuopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789", 60);
            return this.updateToken(token, id);
        } else {
            JSONObject json = new JSONObject();
            json.put("state", "err");
            json.put("massage", "Пользователь не найден, проверьте корректность введенных данных!");
            return ResponseEntity.ok().body(json.toString());
        }
    }

    @CrossOrigin
    @PostMapping(path = "validToken")
    public ResponseEntity<String> validToken(@RequestParam("token") String token) {
        Long id = authService.validToken(token);
        if (id != -1) {
            return this.updateToken(token, id);
        } else {
            JSONObject json = new JSONObject();
            json.put("state", "err");
            return ResponseEntity.ok().body(json.toString());
        }
    }

    @CrossOrigin
    @PostMapping("updateToken")
    public ResponseEntity<String> updateToken(@RequestParam("token") String token,
                                              @RequestParam("userId") Long userId) {
        authService.updateToken(token, userId);
        JSONObject json = new JSONObject();
        json.put("state", "good");
        json.put("token", token);
        return ResponseEntity.ok().body(json.toString());
    }
}
