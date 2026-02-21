package com.hrms.backend.controller.job;

import com.hrms.backend.dto.job.response.JobReferralResponseDTO;
import com.hrms.backend.dto.job.response.JobReferralStatusLogResponseDTO;
import com.hrms.backend.entities.job.referral.ReferralReviewStatus;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.job.referral.JobReferralService;
import com.hrms.backend.service.job.referral.JobReferralStatusLogService;
import com.hrms.backend.utilities.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/referrals")
@RequiredArgsConstructor
public class ReferralController {
    private final JobReferralService jobReferralService;
    private final JobReferralStatusLogService jobReferralStatusLogService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<JobReferralResponseDTO>>> getAllReferrals(@AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Referrals get successfully", jobReferralService.getMyReferrals(user)));
    }

    @GetMapping("/assigned-for-review")
    public ResponseEntity<ApiResponse<List<JobReferralResponseDTO>>> getAllAssignedReferrals(@AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Assigned Referrals get successfully", jobReferralService.getAssignedReferrals(user)));
    }

    @GetMapping("/{referralId}/status-logs")
    public ResponseEntity<ApiResponse<List<JobReferralStatusLogResponseDTO>>> getAllStatusLogsByReferralId(@PathVariable("referralId") Long referralId) {
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Assigned Referrals get successfully", jobReferralStatusLogService.getStatusLogsByReferralId(referralId)));
    }

    @PatchMapping("/{referralId}/change-status")
    public ResponseEntity<ApiResponse> changeReferralStatus(@AuthenticationPrincipal User user, @PathVariable("referralId") Long referralId, @RequestParam("status") ReferralReviewStatus status) throws BadRequestException {
        jobReferralService.changeStatus(referralId, user, status);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Status changed successfully", null));
    }
}
