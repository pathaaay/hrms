package com.hrms.backend.controller.user;

import com.hrms.backend.dto.response.UserProfileResponseDTO;
import com.hrms.backend.service.user.UserService;
import com.hrms.backend.utilities.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping()
    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> getUserProfile(@AuthenticationPrincipal Long userId) throws BadRequestException {
        return userService.getUserProfile(userId);
    }
}
