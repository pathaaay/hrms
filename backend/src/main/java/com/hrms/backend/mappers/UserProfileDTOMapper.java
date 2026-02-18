package com.hrms.backend.mappers;

import com.hrms.backend.dto.user.response.UserProfileResponseDTO;
import com.hrms.backend.entities.user.UserProfile;

public class UserProfileDTOMapper {

    private UserProfileDTOMapper() {
    }

    public static UserProfileResponseDTO convertToDTO(UserProfile profile) {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();

        dto.setName(profile.getUser().getName());
        dto.setUserId(profile.getUser().getId());
        dto.setProfileId(profile.getUser().getId());
        dto.setEmail(profile.getUser().getEmail());
        dto.setRole(profile.getUser().getRole().getName());
        dto.setDepartment(profile.getDepartment().getName());
        dto.setTimezone(profile.getTimezone().getName());
        dto.setManager(profile.getManager());
        dto.setDateOfBirth(profile.getDateOfBirth());
        dto.setDateOfJoining(profile.getDateOfJoining());
        dto.setCity(profile.getCity().getName());
        dto.setState(profile.getCity().getState().getName());
        dto.setCountry(profile.getCity().getState().getCountry().getName());
        dto.setAvatarFilePath(profile.getUser().getAvatarFilePath());
        return dto;
    }
}
