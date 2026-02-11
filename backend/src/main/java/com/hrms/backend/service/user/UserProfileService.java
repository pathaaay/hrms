package com.hrms.backend.service.user;

import com.hrms.backend.dto.game.request.UpdateGameRequestDTO;
import com.hrms.backend.dto.user.response.UserProfileResponseDTO;
import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.entities.user.UserProfile;
import com.hrms.backend.mappers.UserProfileDTOMapper;
import com.hrms.backend.repository.user.UserProfileRepo;
import com.hrms.backend.service.game.GameService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final GameService gameService;
    private final ModelMapper modelMapper;
    private final UserProfileRepo userProfileRepo;
    private final UserProfileDTOMapper userProfileDTOMapper;


    public List<UserProfileResponseDTO> convertToDTOList(List<UserProfile> users) {
        return users.stream().map(userProfileDTOMapper::convertToDTO).toList();
    }

    public UserProfileResponseDTO getUserProfile(User user) throws BadRequestException {
        UserProfile profile = userProfileRepo.findByUserId(user.getId()).orElseThrow(() -> new BadRequestException("User not exists"));
        return userProfileDTOMapper.convertToDTO(profile);
    }

    public List<UserProfileResponseDTO> getAllUsers() {
        return convertToDTOList(userProfileRepo.findAll());
    }

    public List<UserProfileResponseDTO> getAllUsersByGameId(Long gameId) {
        return convertToDTOList(userProfileRepo.findAllByGameId(gameId));
    }

    @Transactional
    public void updateUserInterestedGames(User user, UpdateGameRequestDTO dto) throws BadRequestException {
        UserProfile profile = userProfileRepo.findByUserId(user.getId()).orElseThrow(() -> new BadRequestException("Profile not found"));
        Set<Game> games = gameService.findAllbyId(dto.getGameIds());
        profile.setInterestedGames(games);
        userProfileRepo.save(profile);
    }

}
