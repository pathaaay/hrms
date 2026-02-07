package com.hrms.backend.service.game;

import com.hrms.backend.dto.response.GameResponseDTO;
import com.hrms.backend.entities.game.Game;
import com.hrms.backend.repository.GameRepo;
import com.hrms.backend.utilities.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@ToString
public class GameService {
    private final GameRepo gameRepo;
    private final ModelMapper modelMapper;

    public GameResponseDTO convertToDTO(Game game) {
        return modelMapper.map(game, GameResponseDTO.class);
    }

    public List<GameResponseDTO> convertToDTOList(List<Game> games) {
        return games.stream().map(this::convertToDTO).toList();
    }

    public ResponseEntity<ApiResponse<List<GameResponseDTO>>> getAllGames() {
        List<Game> games = gameRepo.findAll();
        List<GameResponseDTO> response = convertToDTOList(games);
        return ResponseEntity.ok(new ApiResponse<>(true, "Game get successfully", response));
    }
}
