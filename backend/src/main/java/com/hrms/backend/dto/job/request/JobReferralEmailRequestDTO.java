package com.hrms.backend.dto.job.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class JobReferralEmailRequestDTO {
    private Set<String> emails;
}
