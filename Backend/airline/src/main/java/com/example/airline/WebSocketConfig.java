package com.example.airline;

import com.example.airline.ws.WSUserHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        registry.addHandler(wsDriverHandler(), "/wsDriver").setAllowedOrigins("*");
        registry.addHandler(wsUserHandler(), "/wsUser").setAllowedOrigins("*");
    }

//    @Bean
//    public WSDriverHandler wsDriverHandler() {
//        return new WSDriverHandler();
//    }

    @Bean
    public WSUserHandler wsUserHandler() {
        return new WSUserHandler();
    }
}
