package com.hrms.backend.controller.user;

import com.hrms.backend.dto.response.UserProfileResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.entities.user.UserProfile;
import com.hrms.backend.service.user.UserService;
import com.hrms.backend.utilities.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping()
    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> getUserProfile(@AuthenticationPrincipal User user) throws BadRequestException {
        return ResponseEntity.ok(new ApiResponse<>(true, "User get successfully", userService.getUserProfile(user)));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<UserProfileResponseDTO>>> getAllUsers(@RequestParam(required = false) Long gameId) {
        return ResponseEntity.ok(new ApiResponse<>(true, "User get successfully", userService.getAllUsers(gameId)));
    }

    @PostMapping("/update-games")
    public ResponseEntity<ApiResponse> updateGameIds(@AuthenticationPrincipal User user, @Valid @RequestBody UpdateGameRequestDTO dto) throws BadRequestException {
        userService.updateUserInterestedGames(user, dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Games updated successfully", null));
    }
}
