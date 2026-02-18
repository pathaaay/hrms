package com.hrms.backend.controller.user;

import com.hrms.backend.dto.game.request.UpdateGameRequestDTO;
import com.hrms.backend.dto.game.response.BookedGameSlotsResponseDTO;
import com.hrms.backend.dto.user.response.UserProfileResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.game.GameBookingService;
import com.hrms.backend.service.user.UserProfileService;
import com.hrms.backend.utilities.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserProfileService userProfileService;
    private final GameBookingService gameBookingService;

    @GetMapping()
    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> getUserProfile(@AuthenticationPrincipal User user) throws BadRequestException {
        return ResponseEntity.ok(new ApiResponse<>(true, "User get successfully", userProfileService.getUserProfile(user)));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<UserProfileResponseDTO>>> getAllUsers(@RequestParam(required = false) Long gameId) {
        if (gameId != null)
            return ResponseEntity.ok(new ApiResponse<>(true, "User get successfully", userProfileService.getAllUsersByGameId(gameId)));
        return ResponseEntity.ok(new ApiResponse<>(true, "User get successfully", userProfileService.getAllUsers()));
    }

    @PostMapping("/update-games")
    public ResponseEntity<ApiResponse> updateGameIds(@AuthenticationPrincipal User user, @Valid @RequestBody UpdateGameRequestDTO dto) throws BadRequestException {
        userProfileService.updateUserInterestedGames(user, dto);
        return ResponseEntity.ok(new ApiResponse(true, "Games updated successfully", null));
    }

    @GetMapping("/game-bookings")
    public ResponseEntity<ApiResponse<List<BookedGameSlotsResponseDTO>>> getUserBookings(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Bookings get successfully of user " + user.getId(), gameBookingService.getAllBookings(user.getId())));
    }

}
