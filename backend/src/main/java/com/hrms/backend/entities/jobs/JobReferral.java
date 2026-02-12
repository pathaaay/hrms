package com.hrms.backend.entities.jobs;

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
    private String email;

    @Column(name = "short_note")
    private String shortNote;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private JobStatus status;

    @ManyToOne
    @JoinColumn(name = "shared_by")
    private User sharedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;

    @OneToOne
    @JoinColumn(name = "cv_document_id")
    private Document cvDocumentId;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "is_deleted", nullable = false, columnDefinition = "BIT DEFAULT 0")
    private Boolean isDeleted;
}
