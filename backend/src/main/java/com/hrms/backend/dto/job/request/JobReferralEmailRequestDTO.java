package com.hrms.backend.dto.job.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class JobReferralEmailRequestDTO {
    @NotEmpty(message = "At least 1 email is required")
    private Set<String> emails;
}
