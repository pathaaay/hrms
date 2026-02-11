package com.hrms.backend.dto.request;

import com.hrms.backend.entities.document.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

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

    @NotEmpty(message = "At least 1 reviewer is required")
    private Set<Long> reviewerIds;

    private Long jdFileId;
}
