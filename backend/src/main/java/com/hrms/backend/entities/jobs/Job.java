package com.hrms.backend.entities.jobs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @ManyToOne()
    @JoinColumn(name = "created_by")
    private User createdBy;

    @OneToOne()
    @JoinColumn(name = "jd_document_id")
    private Document jdDocument;

    @Column(name = "default_hr_email")
    private String defaultHrEmail;

    @CreationTimestamp
    @Column(name = "created_at", columnDefinition = "DATE")
    private Date createdAt;

    @JsonIgnore
    @Column(name = "is_deleted",nullable = false)
    private Boolean isDeleted;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "job_reviewers",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> jobReviewers;

    @Column(name = "is_active")
    private Boolean isActive;
}
