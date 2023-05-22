package com.example.airline.ws;

import com.example.airline.Service.TicketService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class WSUserHandler extends TextWebSocketHandler {

    @Autowired
    TicketService ticketService;

    private final ObjectMapper mapper = new ObjectMapper();

    private static Map<String, WebSocketSession> clients = new ConcurrentHashMap<>();



    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        clients.put(session.getId(),session);
        super.afterConnectionEstablished(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println(session +"    "+message.getPayload());
        JSONObject jsonObject = new JSONObject();
        List<String> str = ticketService.seat(Long.valueOf(message.getPayload()));
        WSUserHandler.sendData(str.toString());
        super.handleTextMessage(session, message);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        clients.remove(session.getId());
        super.afterConnectionClosed(session, status);
    }

    public static void sendData(String data) throws Exception {
        for (WebSocketSession client : clients.values()) {
            client.sendMessage(new TextMessage(data));
        }
    }

}