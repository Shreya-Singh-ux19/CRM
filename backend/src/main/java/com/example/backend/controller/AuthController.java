

package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.SignupRequest;
import com.example.backend.service.AuthService;

import org.springframework.http.ResponseEntity;   
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        String result = authService.signup(request);
        return ResponseEntity.ok(result);
    }

    // LOGIN (ROLE BASED RESPONSE)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
