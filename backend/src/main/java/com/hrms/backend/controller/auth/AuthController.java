package com.hrms.backend.controller.auth;

import com.fasterxml.jackson.databind.JsonNode;
import com.hrms.backend.dto.request.AuthRequestDTO;
import com.hrms.backend.service.auth.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JsonNode> login(@Valid @RequestBody AuthRequestDTO authRequestDTO) throws BadRequestException {
        return ResponseEntity.ok(authService.login(authRequestDTO.getEmail(), authRequestDTO.getPassword()));
    }
}
