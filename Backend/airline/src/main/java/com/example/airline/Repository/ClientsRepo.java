package com.example.airline.Repository;

import com.example.airline.Entity.Clients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ClientsRepo extends JpaRepository<Clients,Long> {
    public List<Clients> findByPhone(String phone);
    public List<Clients> findByPhoneAndPassword(String phone,String password);
}
