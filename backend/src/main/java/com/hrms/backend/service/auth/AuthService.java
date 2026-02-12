package com.hrms.backend.service.auth;

import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.user.UserRepo;
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
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String login(String email, String password) throws BadRequestException {
        User user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            throw new BadRequestException("User not found with this email: " + email);
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadRequestException("Invalid credentials");
        }
        String token = jwtService.generateToken(user.getId(), user.getEmail());
        log.info("User logged in - email: {}", email);
        return token;
    }

}
