package com.hrms.backend.mappers;

import com.hrms.backend.dto.response.UserProfileResponseDTO;
import com.hrms.backend.entities.UserProfile;

public class UserProfileDTOMapper {

    private UserProfileDTOMapper() {
    }

    public static UserProfileResponseDTO convertToDto(UserProfile profile) {
        UserProfileResponseDTO profileDetails = new UserProfileResponseDTO();
        profileDetails.setProfileId(profile.getId());
        profileDetails.setUserId(profile.getUser().getId());
        profileDetails.setManager(profile.getManager());
        profileDetails.setName(profile.getUser().getName());
        profileDetails.setEmail(profile.getUser().getEmail());
        profileDetails.setDateOfBirth(profile.getDateOfBirth());
        profileDetails.setDateOfJoining(profile.getDateOfJoining());
        profileDetails.setRole(profile.getRole().getName());
        profileDetails.setDepartment(profile.getDepartment().getName());
        return profileDetails;
    }
}
