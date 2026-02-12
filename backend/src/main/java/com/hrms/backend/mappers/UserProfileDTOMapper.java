package com.hrms.backend.mappers;

import com.hrms.backend.dto.user.response.UserProfileResponseDTO;
import com.hrms.backend.entities.user.UserProfile;
import org.springframework.stereotype.Component;

@Component
public class UserProfileDTOMapper {

    private UserProfileDTOMapper() {
    }

    public UserProfileResponseDTO convertToDTO(UserProfile profile) {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();

        dto.setName(profile.getUser().getName());
        dto.setUserId(profile.getUser().getId());
        dto.setProfileId(profile.getUser().getId());
        dto.setEmail(profile.getUser().getEmail());
        dto.setRole(profile.getUser().getRole().getName());
        dto.setDepartment(profile.getDepartment().getName());
        dto.setInterestedGames(profile.getInterestedGames());
        dto.setTimezone(profile.getTimezone().getName());
        dto.setManagerId(profile.getManager().getId());
        dto.setDateOfBirth(profile.getDateOfBirth());
        dto.setDateOfJoining(profile.getDateOfJoining());
        dto.setCity(profile.getCity().getName());
        dto.setState(profile.getCity().getState().getName());
        dto.setCountry(profile.getCity().getState().getCountry().getName());
        
        return dto;
    }
}
