package com.hrms.backend.controller.auth;

import com.hrms.backend.service.auth.AuthService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private AuthService _authService;
}
