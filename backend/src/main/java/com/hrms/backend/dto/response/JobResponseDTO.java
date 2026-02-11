package com.hrms.backend.dto.response;

import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
public class JobResponseDTO {
    private Long id;

    private String title;
    private String description;
    private User createdBy;
    private Set<User> jobReviewers;
    private String jdFilePath;
    private String defaultHrEmail;
    private Date createdAt;
}
