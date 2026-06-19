package com.trading.tradingplatform.service;

import org.springframework.stereotype.Service;
import com.trading.tradingplatform.model.User;
import com.trading.tradingplatform.repository.UserRepository;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {

        user.setBalance(100000);   // 1 lakh initial balance
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
