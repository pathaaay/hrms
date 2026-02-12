package com.hrms.backend.controller.job;

import com.hrms.backend.dto.job.request.JobReferralEmailRequestDTO;
import com.hrms.backend.dto.job.request.JobRequestDTO;
import com.hrms.backend.dto.job.response.JobResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.job.JobReferralService;
import com.hrms.backend.service.job.JobService;
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
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;
    private final JobReferralService jobReferralService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<JobResponseDTO>>> getAllJobs() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Jobs get successfully", jobService.getAllJobs()));
    }

    @PreAuthorize("hasAnyRole('ROLE_HR')") // Only HR can create a job
    @PostMapping()
    public ResponseEntity<ApiResponse> createJob(@AuthenticationPrincipal User user, @Valid @RequestBody JobRequestDTO dto) throws BadRequestException {
        jobService.createJob(user, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(true, "Job created successfully", null));
    }

    @PreAuthorize("hasAnyRole('ROLE_HR')") // Only HR can update a job
    @PutMapping("/{jobId}")
    public ResponseEntity<ApiResponse> updateJob(@AuthenticationPrincipal User user, @PathVariable("jobId") Long jobId, @Valid @RequestBody JobRequestDTO dto) throws BadRequestException {
        jobService.updateJob(user, jobId, dto);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Job updated successfully", null));
    }

    @PreAuthorize("hasAnyRole('ROLE_HR')") // Only HR can deactivate job
    @PatchMapping("/{jobId}/toggle")
    public ResponseEntity<ApiResponse> toggleJobActivation(@AuthenticationPrincipal User user, @PathVariable("jobId") Long jobId) throws BadRequestException {
        jobService.toggleJobActivation(jobId, user);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Job toggled successfully", null));
    }

    @PreAuthorize("hasAnyRole('ROLE_HR')") // Only HR can delete a job
    @DeleteMapping("/{jobId}")
    public ResponseEntity<ApiResponse> deleteJob(@AuthenticationPrincipal User user, @PathVariable("jobId") Long jobId) throws BadRequestException {
        jobService.deleteJob(jobId, user);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Job deleted successfully", null));
    }

    @PostMapping("/{jobId}/refer-by-emails")
    public ResponseEntity<ApiResponse> referByEmails(@AuthenticationPrincipal User user, @PathVariable("jobId") Long jobId, @Valid @RequestBody JobReferralEmailRequestDTO emails) throws BadRequestException, MessagingException {
        jobReferralService.referJobToEmails(jobId, user, emails);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Job referred to emails successfully", null));
    }
}
