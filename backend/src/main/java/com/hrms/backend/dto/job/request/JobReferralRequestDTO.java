package com.hrms.backend.dto.job.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobReferralRequestDTO {
    private String email;
    private String name;
    private String shortNote;

    @NotNull(message = "Cv file id is required")
    private Long cvFileId;
}
