package com.hrms.backend.dto.job.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hrms.backend.entities.jobs.referral.ReferralReviewStatus;
import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JobReferralStatusLogResponseDTO {
    private Long id;
    private ReferralReviewStatus oldStatus;
    private ReferralReviewStatus newStatus;
    private User changedBy;
    private Date createdAt;
}
