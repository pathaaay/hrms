package com.hrms.backend.controller.organization;

import com.hrms.backend.dto.user.response.UserProfileResponseDTO;
import com.hrms.backend.service.user.UserProfileService;
import com.hrms.backend.utilities.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/organization")
@RequiredArgsConstructor
public class OrganizationController {
    private final UserProfileService userProfileService;

    @GetMapping("/chart/{userId}")
    public ResponseEntity<ApiResponse<List<UserProfileResponseDTO>>> getUserOrganizations(@PathVariable("userId") Long userId) throws BadRequestException {
        return ResponseEntity.ok(new ApiResponse<>(true, "Organizational data get successfully", userProfileService.getUserOrganizationChart(userId)));
    }
}
