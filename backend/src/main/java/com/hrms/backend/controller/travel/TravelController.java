package com.hrms.backend.controller.travel;

import com.hrms.backend.dto.travel.request.TravelRequestDTO;
import com.hrms.backend.dto.travel.response.TravelResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.travel.TravelService;
import com.hrms.backend.utilities.ApiResponse;
import com.hrms.backend.utilities.roles.Roles;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travels")
@RequiredArgsConstructor
public class TravelController {
    private final TravelService travelService;

    @PreAuthorize("hasAnyRole('ROLE_HR')")
    @GetMapping()
    public ResponseEntity<ApiResponse<List<TravelResponseDTO>>> getAllTravels(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Travel created successfully", travelService.getAllTravels()));
    }

    @PreAuthorize("hasAnyRole('ROLE_HR')")
    @PostMapping()
    public ResponseEntity<ApiResponse> createTravel(@AuthenticationPrincipal User user, @Valid @RequestBody TravelRequestDTO dto) throws BadRequestException {
        travelService.createTravel(dto, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Travel created successfully", null));
    }

    @PreAuthorize("hasAnyRole('ROLE_HR')")
    @PutMapping("/{travelId}")
    public ResponseEntity<ApiResponse> updateTravel(@AuthenticationPrincipal User user, @PathVariable("travelId") Long travelId, @Valid @RequestBody TravelRequestDTO dto) throws BadRequestException {
        travelService.updateTravel(dto, user, travelId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Travel updated successfully", null));
    }

    @PreAuthorize("hasAnyRole('ROLE_HR')")
    @DeleteMapping("/{travelId}")
    public ResponseEntity<ApiResponse> deleteTravel(@AuthenticationPrincipal User user, @PathVariable("travelId") Long travelId) {
        travelService.deleteTravel(travelId, user);
        return ResponseEntity.ok(new ApiResponse(true, "Travel updated successfully", null));
    }
}
