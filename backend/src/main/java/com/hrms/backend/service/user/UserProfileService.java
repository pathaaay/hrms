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
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final GameService gameService;
    private final UserProfileRepo userProfileRepo;

    public List<UserProfileResponseDTO> convertToDTOList(List<UserProfile> users) {
        return users.stream().map(UserProfileDTOMapper::convertToDTO).toList();
    }

    public UserProfile findByUserId(Long id) throws BadRequestException {
        return userProfileRepo.findByUserId(id).orElseThrow(() -> new BadRequestException("User not found"));
    }

    public List<UserProfile> findAllDirectReportUsers(Long id) {
        return userProfileRepo.findAllDirectReportUsers(id);
    }

    public UserProfileResponseDTO getUserProfile(User user) throws BadRequestException {
        UserProfile profile = findByUserId(user.getId());
        UserProfileResponseDTO dto = UserProfileDTOMapper.convertToDTO(profile);
        dto.setInterestedGames(profile.getInterestedGames());
        return dto;
    }

    public List<UserProfileResponseDTO> searchUser(String searchText) {
        return convertToDTOList(userProfileRepo.searchUsers(searchText));
    }

    public List<UserProfileResponseDTO> getAllUsers() {
        return convertToDTOList(userProfileRepo.findAll());
    }

    public List<UserProfileResponseDTO> getAllUsersByGameId(Long gameId) {
        return convertToDTOList(userProfileRepo.findAllByGameId(gameId));
    }

    @Transactional
    public void updateUserInterestedGames(User user, UpdateGameRequestDTO dto) throws BadRequestException {
        UserProfile profile = findByUserId(user.getId());
        Set<Game> games = gameService.findAllbyId(dto.getGameIds());
        profile.setInterestedGames(games);
        userProfileRepo.save(profile);
    }

    public List<UserProfile> findAllByBirthdayToday() {
        return userProfileRepo.findAllByBirthdayToday();
    }

    public List<UserProfile> findAllByWorkAnniversaryToday() {
        return userProfileRepo.findAllByWorkAnniversaryToday();
    }
}
