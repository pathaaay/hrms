package com.hrms.backend.controller.organization;

import com.hrms.backend.dto.organization.response.OrganizationDataResponseDTO;
import com.hrms.backend.service.organization.OrganizationService;
import com.hrms.backend.utilities.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/organization")
@RequiredArgsConstructor
public class OrganizationController {
    private final OrganizationService organizationService;

    @GetMapping("/chart/{userId}")
    public ResponseEntity<ApiResponse<OrganizationDataResponseDTO>> getUserOrganizations(@PathVariable("userId") Long userId) throws BadRequestException {
        return ResponseEntity.ok(new ApiResponse<>(true, "Organizational data get successfully", organizationService.getUserOrganizationData(userId)));
    }
}
