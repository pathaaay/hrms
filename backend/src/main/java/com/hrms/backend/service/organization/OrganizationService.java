package com.hrms.backend.service.organization;

import com.hrms.backend.dto.organization.response.OrganizationDataResponseDTO;
import com.hrms.backend.entities.user.UserProfile;
import com.hrms.backend.service.user.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationService {
    private final UserProfileService userProfileService;

    public OrganizationDataResponseDTO getUserOrganizationData(Long userId) throws BadRequestException {
        UserProfile profile = userProfileService.findByUserId(userId);
        List<UserProfile> allProfiles = new ArrayList<>();
        allProfiles.add(profile);

        while (profile.getManager() != null) {
            profile = userProfileService.findByUserId(profile.getManager().getId());
            allProfiles.add(profile);
        }

        List<UserProfile> directReportsProfiles = userProfileService.findAllDirectReportUsers(userId);

        OrganizationDataResponseDTO dto = new OrganizationDataResponseDTO();
        dto.setManagerialData(userProfileService.convertToDTOList(allProfiles));
        dto.setDirectReports(userProfileService.convertToDTOList(directReportsProfiles));
        return dto;
    }
}
