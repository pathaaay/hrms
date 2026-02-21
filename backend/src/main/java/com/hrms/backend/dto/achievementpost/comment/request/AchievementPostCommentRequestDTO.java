package com.hrms.backend.dto.achievementpost.comment.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AchievementPostCommentRequestDTO {
    @NotBlank(message = "Comment text is required")
    private String comment;
}
