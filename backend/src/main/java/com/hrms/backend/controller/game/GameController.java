package com.hrms.backend.controller.game;

import com.hrms.backend.dto.request.BookGameSlotRequestDTO;
import com.hrms.backend.dto.response.GameResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.game.GameService;
import com.hrms.backend.utilities.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
@AllArgsConstructor
public class GameController {
    private final GameService gameService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<GameResponseDTO>>> getAllGames() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Game get successfully", gameService.getAllGames()));
    }

    @PostMapping("/book-slot")
    public ResponseEntity<ApiResponse> bookSlot(@AuthenticationPrincipal User user, @Valid @RequestBody BookGameSlotRequestDTO bookingDetails) throws Exception {

        gameService.bookGameSlot(user,bookingDetails);
        return ResponseEntity.ok(new ApiResponse<>(true, "Game Slot Booked Successfully", null));
    }
}
