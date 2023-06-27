package com.example.airline.Repository;

import com.example.airline.Entity.Tokens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TokensRepo extends JpaRepository<Tokens,Long> {
    public List<Tokens> findByTokenAndUserId(String token,Long user);
    public Tokens findByToken(String token);
}
