package com.hrms.backend.service.user;

import com.hrms.backend.dto.response.UserProfileResponseDTO;
import com.hrms.backend.entities.UserProfile;
import com.hrms.backend.mappers.UserProfileDTOMapper;
import com.hrms.backend.repository.UserProfileRepo;
import com.hrms.backend.utilities.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@ToString
public class UserService {
    private final UserProfileRepo userProfileRepo;


    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> getUserProfile(Long userId) throws BadRequestException {
        Optional<UserProfile> profile = userProfileRepo.findByUserId(userId);
        if (profile.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(true, "User get successfully", UserProfileDTOMapper.convertToDto(profile.orElse(null))));
        } else
            throw new BadRequestException("User not exists");
    }
}
