package com.hrms.backend.dto.travel.documents.response;

import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TravelDocumentResponseDTO {
    private Long id;
    private String title;
    private User addedFor;
    private Document document;
    private Date createdAt;
}
