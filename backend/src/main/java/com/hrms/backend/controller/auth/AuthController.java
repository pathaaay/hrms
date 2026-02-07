package com.hrms.backend.controller.auth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.hrms.backend.dto.request.AuthRequestDTO;
import com.hrms.backend.service.auth.AuthService;
import com.hrms.backend.service.auth.JwtService;
import com.hrms.backend.utilities.ApiResponse;
import com.hrms.backend.utilities.Constants;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
    private final ObjectMapper mapper;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JsonNode>> login(@Valid @RequestBody AuthRequestDTO authRequestDTO, HttpServletResponse response) throws BadRequestException {

        String token = authService.login(authRequestDTO.getEmail(), authRequestDTO.getPassword());
        Cookie cookie = new Cookie(Constants.AUTH_TOKEN_COOKIE_NAME, token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(3600);
        response.addCookie(cookie);
        ObjectNode node = mapper.createObjectNode();
        node.putPOJO("token", token);

        return ResponseEntity.ok(new ApiResponse<>(true, "Login successfull", node));
    }
}
