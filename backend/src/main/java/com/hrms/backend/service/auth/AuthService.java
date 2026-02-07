package com.hrms.backend.service.auth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.UserRepo;
import com.hrms.backend.utilities.ApiResponse;
import com.hrms.backend.utilities.Constants;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String login(String email, String password) throws BadRequestException {
        User user = userRepo.findByEmail(email).orElse(null);

        if (user == null) {
            log.error("User not found, email: {}", email);
            throw new BadRequestException("User not found with this email: " + email);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.error("Invalid Credentials - email: {}", email);
            throw new BadRequestException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getId(), user.getEmail());

        log.info("User logged in - email: {}", email);
        return token;
    }

}
