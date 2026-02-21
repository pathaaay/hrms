package com.hrms.backend.dto.achievementpost.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class AchievementPostRequestDTO {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "isPublic visibility is required")
    private Boolean isPublic;

    private Set<Long> tagIds;

    private Set<Long> visibilityUserIds;

    private Set<String> newTags;
}
