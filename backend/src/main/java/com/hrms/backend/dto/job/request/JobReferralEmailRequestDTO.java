package com.hrms.backend.dto.job.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class JobReferralEmailRequestDTO {
    @NotBlank(message = "At least 1 email is required")
    private Set<String> emails;
}
