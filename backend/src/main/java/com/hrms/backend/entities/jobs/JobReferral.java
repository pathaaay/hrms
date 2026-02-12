package com.hrms.backend.entities.jobs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "job_referrals")
public class JobReferral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(name = "short_note")
    private String shortNote;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private JobReviewStatus status;

    @ManyToOne
    @JoinColumn(name = "shared_by", nullable = false)
    private User sharedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @OneToOne
    @JoinColumn(name = "cv_document_id")
    private Document cvDocumentId;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

    @JsonIgnore
    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted;
}
