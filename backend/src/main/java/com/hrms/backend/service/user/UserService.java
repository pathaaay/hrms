package com.hrms.backend.service.user;

import com.hrms.backend.dto.request.UpdateGameRequestDTO;
import com.hrms.backend.dto.response.UserProfileResponseDTO;
import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.entities.user.UserProfile;
import com.hrms.backend.mappers.UserProfileDTOMapper;
import com.hrms.backend.repository.GameRepo;
import com.hrms.backend.repository.UserProfileRepo;
import com.hrms.backend.utilities.ApiResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
@ToString
public class UserService {
    private final UserProfileRepo userProfileRepo;
    private final GameRepo gameRepo;


    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> getUserProfile(User user) throws BadRequestException {
        Optional<UserProfile> profile = userProfileRepo.findByUserId(user.getId());
        if (profile.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(true, "User get successfully", UserProfileDTOMapper.convertToDto(profile.orElse(null))));
        } else
            throw new BadRequestException("User not exists");
    }

    @Transactional
    public ResponseEntity<ApiResponse> updateUserInterestedGames(User user, UpdateGameRequestDTO dto) throws BadRequestException {
        UserProfile profile = userProfileRepo.findByUserId(user.getId()).orElseThrow(() -> new BadRequestException("Profile not found"));

        log.info("Received param dto {}", dto.getGameIds());
        Set<Game> games = new HashSet<>(gameRepo.findAllById(dto.getGameIds()));

        profile.setInterestedGames(games);

        userProfileRepo.save(profile);

        return ResponseEntity.ok(new ApiResponse<>(true, "Games updated successfully", null));
    }
}
