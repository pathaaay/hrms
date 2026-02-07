package com.hrms.backend.controller.user;

import com.hrms.backend.dto.request.UpdateGameRequestDTO;
import com.hrms.backend.dto.response.UserProfileResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.user.UserService;
import com.hrms.backend.utilities.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping()
    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> getUserProfile(@AuthenticationPrincipal User user) throws BadRequestException {
        return userService.getUserProfile(user);
    }

    @PostMapping("/update-games")
    public ResponseEntity<ApiResponse> updateGameIds(@AuthenticationPrincipal User user, @Valid @RequestBody UpdateGameRequestDTO dto) throws BadRequestException {
        return userService.updateUserInterestedGames(user, dto);
    }
}
