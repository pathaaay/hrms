package com.hrms.backend.dto.achievementpost.like.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AchievementPostLikeResponseDTO {
    private Long id;
    private User likedBy;
    private Date createdAt;
}
