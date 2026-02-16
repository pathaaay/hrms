package com.hrms.backend.dto.travel.documents.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TravelDocumentRequestDTO {
    private Long addedForId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Document id is required")
    private Long documentId;
}
