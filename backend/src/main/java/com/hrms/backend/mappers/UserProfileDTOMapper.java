package com.hrms.backend.mappers;

import com.hrms.backend.dto.response.UserProfileResponseDTO;
import com.hrms.backend.entities.user.UserProfile;

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

        if (profile.getUser().getRole() != null)
            profileDetails.setRole(profile.getUser().getRole().getName());

        if (profile.getDepartment() != null)
            profileDetails.setDepartment(profile.getDepartment().getName());

        if (profile.getTimezone() != null)
            profileDetails.setTimezone(profile.getTimezone().getName());

        if (profile.getInterestedGames() != null) {
            profileDetails.setInterestedGames(profile.getInterestedGames());
        }

        if (profile.getCity() != null) {
            profileDetails.setCity(profile.getCity().getName());
            profileDetails.setState(profile.getCity().getState().getName());
            profileDetails.setCountry(profile.getCity().getState().getCountry().getName());
        }
        return profileDetails;
    }
}
