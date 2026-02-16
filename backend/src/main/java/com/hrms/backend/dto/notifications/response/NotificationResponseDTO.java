package com.hrms.backend.dto.notifications.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NotificationResponseDTO {
    private long id;
    private String title;
    private String description;
    private Boolean isRead;
    private Date createdAt;
}
