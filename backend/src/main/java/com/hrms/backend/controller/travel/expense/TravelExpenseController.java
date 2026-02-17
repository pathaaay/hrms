package com.hrms.backend.controller.travel.expense;

import com.hrms.backend.dto.travel.expense.request.TravelExpenseRequestDTO;
import com.hrms.backend.dto.travel.expense.request.TravelExpenseStatusDTO;
import com.hrms.backend.dto.travel.expense.response.TravelExpenseResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.travel.expense.TravelExpenseService;
import com.hrms.backend.utilities.ApiResponse;
import jakarta.mail.MessagingException;
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
@RequestMapping("/travels/expenses/{travelId}")
@RequiredArgsConstructor
public class TravelExpenseController {
    private final TravelExpenseService travelExpenseService;

    @PreAuthorize("hasAnyRole('ROLE_MANAGER','ROLE_HR')")
    @GetMapping()
    public ResponseEntity<ApiResponse<List<TravelExpenseResponseDTO>>> getAllTravelExpenses(@AuthenticationPrincipal User user, @PathVariable("travelId") Long travelId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Travel expenses get successfully", travelExpenseService.getAllTravelExpenses(travelId)));
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<List<TravelExpenseResponseDTO>>> getUserAllTravelExpenses(@AuthenticationPrincipal User user, @PathVariable("travelId") Long travelId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Travel expenses get successfully", travelExpenseService.getUserAllTravelExpenses(travelId, user)));
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> createTravelExpense(@AuthenticationPrincipal User user, @PathVariable("travelId") Long travelId, @Valid @RequestBody TravelExpenseRequestDTO dto) throws BadRequestException, MessagingException {
        travelExpenseService.createTravelExpense(dto, user, travelId);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Travel expense created successfully", null));
    }

    @PutMapping("/{travelExpenseId}")
    public ResponseEntity<ApiResponse> updateTravelExpense(@AuthenticationPrincipal User user, @PathVariable("travelId") Long travelId, @PathVariable("travelExpenseId") Long travelExpenseId, @Valid @RequestBody TravelExpenseRequestDTO dto) throws BadRequestException, MessagingException {
        travelExpenseService.updateTravelExpense(dto, user, travelId, travelExpenseId);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Travel expense updated successfully", null));
    }

    @DeleteMapping("/{travelExpenseId}")
    public ResponseEntity<ApiResponse> deleteTravelExpense(@PathVariable("travelExpenseId") Long travelExpenseId) {
        travelExpenseService.deleteTravelExpense(travelExpenseId);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Travel expense deleted successfully", null));
    }

    @PreAuthorize("hasAnyRole('ROLE_MANAGER','ROLE_HR')")
    @PatchMapping("/{travelExpenseId}/update-status")
    public ResponseEntity<ApiResponse> updateTravelExpenseStatus(@AuthenticationPrincipal User user, @Valid @RequestBody TravelExpenseStatusDTO dto, @PathVariable("travelExpenseId") Long travelExpenseId) throws BadRequestException {
        travelExpenseService.updateTravelExpenseStatus(user, travelExpenseId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Travel expense " + (Boolean.TRUE.equals(dto.getIsApproved()) ? "approved" : "rejected") + " successfully", null));
    }
}
