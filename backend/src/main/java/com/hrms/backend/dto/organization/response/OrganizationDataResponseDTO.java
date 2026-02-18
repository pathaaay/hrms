package com.hrms.backend.dto.organization.response;

import com.hrms.backend.dto.user.response.UserProfileResponseDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrganizationDataResponseDTO {
    List<UserProfileResponseDTO> managerialData;
    List<UserProfileResponseDTO> directReports;
}
