package com.hrms.backend.dto.achievementpost.comment.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AchievementPostCommentResponseDTO {
    private Long id;
    private String comment;
    private User author;
    private User deletedBy;
    private String remarks;
    private Date createdAt;
}
