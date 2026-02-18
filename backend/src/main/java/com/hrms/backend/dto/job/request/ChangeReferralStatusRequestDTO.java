package com.hrms.backend.dto.job.request;

import com.hrms.backend.entities.job.referral.ReferralReviewStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeReferralStatusRequestDTO {
    @NotBlank(message = "Status is required")
    private ReferralReviewStatus status;
}
