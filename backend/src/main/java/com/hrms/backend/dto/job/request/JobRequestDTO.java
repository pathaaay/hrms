package com.hrms.backend.dto.job.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class JobRequestDTO {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Default HR email is required")
    private String defaultHrEmail;

    private Set<Long> reviewerIds;

    private Long jdFileId;

    private Boolean isActive;
}
