package com.hrms.backend.dto.job.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hrms.backend.entities.jobs.referral.ReferralReviewStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JobReferralResponseDTO {
    private Long id;
    private String email;
    private String name;
    private String jobTitle;
    private String jdFilePath;
    private String shortNote;
    private String cvFilePath;
    private ReferralReviewStatus status;
    private Date createdAt;
}
