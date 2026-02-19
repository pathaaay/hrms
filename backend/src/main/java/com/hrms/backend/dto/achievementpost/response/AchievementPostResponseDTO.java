package com.hrms.backend.dto.achievementpost.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hrms.backend.entities.achievementpost.AchievementPostTag;
import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AchievementPostResponseDTO {
    private Long id;
    private String title;
    private String description;
    private User author;
    private String createdAt;
    private Boolean isPublic;
    private User deletedBy;
    private String remarks;
    private Set<AchievementPostTag> achievementPostTags;
    private Long likesCount;
    private Long commentsCount;
    private Boolean isLikedByUser;
}
