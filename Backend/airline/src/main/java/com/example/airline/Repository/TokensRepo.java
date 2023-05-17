package com.example.airline.Repository;

import com.example.airline.Entity.Tokens;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokensRepo extends JpaRepository<Tokens,Long> {
    public List<Tokens> findByTokenAndUserId(String token,Long user);
    public Tokens findByToken(String token);
}
