package com.trading.tradingplatform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.trading.tradingplatform.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
