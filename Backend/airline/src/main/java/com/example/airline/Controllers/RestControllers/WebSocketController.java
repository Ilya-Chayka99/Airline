package com.example.airline.Controllers.RestControllers;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/message")
    @SendTo("/seat/public")
    private String receivePublicMessage(@Payload String message){
        return message;
    }

    @MessageMapping("/private-message")
    public String  receivePrivateMessage(@Payload String message){
        return message;
    }

}
