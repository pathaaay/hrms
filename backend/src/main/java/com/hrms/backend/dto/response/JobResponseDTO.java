package com.hrms.backend.dto.response;

import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@RequiredArgsConstructor
public class JobResponseDTO {
    private Long id;

    private String title;
    private String description;
    private User createdBy;
    private Document jdDocument;
    private String defaultHrEmail;
    private Date createdAt;
}
