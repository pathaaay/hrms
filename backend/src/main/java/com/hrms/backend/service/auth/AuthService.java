package com.hrms.backend.service.auth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.hrms.backend.entities.User;
import com.hrms.backend.repository.UserRepo;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo userRepo;
    private final JwtService jwtService;
    private final ObjectMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public JsonNode login(String email, String password) throws BadRequestException {
        User employee = userRepo.findByEmail(email).orElse(null);

        if (employee == null) {
            log.error("User not found, email: {}", email);
            throw new BadRequestException("User not found with this email: " + email);
        }

        if (!passwordEncoder.matches(password, employee.getPassword())) {
            log.error("Invalid Credentials, email: {}", email);
            throw new BadRequestException("Invalid credentials");
        }

        ObjectNode node = mapper.createObjectNode();
        node.put("success", true);
        node.put("message", "Login success");
        node.putPOJO("token", jwtService.generateToken(employee.getId(), employee.getEmail()));

        return node;
    }

}
