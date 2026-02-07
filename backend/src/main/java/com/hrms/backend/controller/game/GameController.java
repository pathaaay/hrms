package com.hrms.backend.controller.game;

import com.hrms.backend.dto.response.GameResponseDTO;
import com.hrms.backend.service.game.GameService;
import com.hrms.backend.utilities.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/games")
@AllArgsConstructor
public class GameController {
    private final GameService gameService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<GameResponseDTO>>> getAllGames() {
        return gameService.getAllGames();
    }
}
