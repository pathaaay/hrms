package com.hrms.backend.service.user;

import com.hrms.backend.dto.request.UpdateGameRequestDTO;
import com.hrms.backend.dto.response.UserProfileResponseDTO;
import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.entities.user.UserProfile;
import com.hrms.backend.mappers.UserProfileDTOMapper;
import com.hrms.backend.repository.GameRepo;
import com.hrms.backend.repository.UserProfileRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserProfileRepo userProfileRepo;
    private final GameRepo gameRepo;
    public UserProfileResponseDTO getUserProfile(User user) throws BadRequestException {
        UserProfile profile = userProfileRepo.findByUserId(user.getId()).orElseThrow(() -> new BadRequestException("User not exists"));
        return UserProfileDTOMapper.convertToDto(profile);
    }

    public List<UserProfileResponseDTO> getAllUsers(Long gameId) {
        List<UserProfile> profiles;

        if (gameId != null) profiles = userProfileRepo.findAllByGameId(gameId);
        else profiles = userProfileRepo.findAll();

        return profiles.stream().map(user -> {
            UserProfileResponseDTO dto = new UserProfileResponseDTO();
            dto.setName(user.getUser().getName());
            dto.setUserId(user.getUser().getId());
            dto.setProfileId(user.getId());
            dto.setEmail(user.getUser().getEmail());
            dto.setRole(user.getUser().getRole().getName());
            dto.setDepartment(user.getDepartment().getName());
            return dto;
        }).toList();
    }

    @Transactional
    public void updateUserInterestedGames(User user, UpdateGameRequestDTO dto) throws BadRequestException {
        UserProfile profile = userProfileRepo.findByUserId(user.getId()).orElseThrow(() -> new BadRequestException("Profile not found"));
        Set<Game> games = new HashSet<>(gameRepo.findAllById(dto.getGameIds()));
        profile.setInterestedGames(games);
        userProfileRepo.save(profile);
    }
}
