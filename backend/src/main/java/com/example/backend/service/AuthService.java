package com.example.backend.service;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.SignupRequest;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;




@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String signup(SignupRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
    
        user.setRole(request.getRole());

        userRepository.save(user);
        return "User registered successfully";
    }

    


    public Map<String, Object> login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
              .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }
    
    Map<String, Object> res = new HashMap<>();
        res.put("id", user.getId());
        res.put("email", user.getEmail());
        res.put("username", user.getUsername());
        res.put("role", user.getRole());
        res.put("message", "Login Succesful");

        return res;

    
}
}