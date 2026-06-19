package com.trading.tradingplatform.service;

import com.trading.tradingplatform.model.User;
import com.trading.tradingplatform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ REGISTER USER
    public User register(User user) {

        // Check username already exists
        userRepository.findByUsername(user.getUsername())
                .ifPresent(u -> {
                    throw new RuntimeException("Username already exists");
                });

        // Default values
        user.setBalance(100000.0); // starting balance
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    // ✅ LOGIN USER
    public User login(String username, String password) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    // ✅ GET USER BY ID
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ✅ UPDATE USER BALANCE (used in trading)
    public void updateBalance(Long userId, Double newBalance) {
        User user = getUserById(userId);
        user.setBalance(newBalance);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }
}
