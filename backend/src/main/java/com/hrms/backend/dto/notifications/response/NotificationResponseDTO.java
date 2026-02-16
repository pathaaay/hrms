package com.hrms.backend.dto.notifications.response;

import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationResponseDTO {
    private long id;
    private String title;
    private String description;
    private User addedFor;
    private Boolean isRead;
}
